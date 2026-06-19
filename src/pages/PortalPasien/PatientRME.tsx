import { secureLocalStorage } from "../../utils/crypto";
import React, { useMemo } from "react";
import { DUMMY_VISITS, VISIT_STATUS_BADGE } from "../../data/mockData";
import { Download } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useSRMStore } from "../../store/srmStore";
import { useSiteStore } from "../../store/siteStore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PatientRME() {
  const { patient } = useOutletContext<{ patient: any }>();
  const srmVisits = useSRMStore((state) => state.visits);
  const siteSettings = useSiteStore((state) => state.settings);
  const srmSettings = useSRMStore((state) => state.settings);

  const visits = useMemo(() => {
    const srmMapped = srmVisits
      .filter((v) => v.patientId === patient.mrn || v.patientId === patient.id)
      .map((v) => ({
        id: v.id,
        date: v.tanggalKunjungan,
        clinic: "Poli Reguler", // simplified
        doctor: "Dokter RS", // basic fallback
        icd10: "-",
        diagnosis: v.diagnosis || (v.status === "Selesai" ? "Belum ada diagnosis" : "Menunggu Antrean"),
        procedures: v.terapi ? [v.terapi] : [],
        drugPrescription: [],
        adminFee: 0,
        status: v.status,
        paymentMethod: "Umum",
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Check if we have online visits in localStorage
    let onlineVisits: any[] = [];
    try {
      const saved = secureLocalStorage.getItem("riwayatAntreanUMLA");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter those matching patient name approximately (since online may not have MRN)
        onlineVisits = parsed
          .filter(
            (o: any) => o.nama.toLowerCase() === patient.name.toLowerCase(),
          )
          .map((o: any) => ({
            id: o.kodeBooking,
            date: o.tanggal,
            clinic: o.poli || o.layanan || "Layanan Medis",
            doctor: o.dokter,
            icd10: "-",
            diagnosis: "Pendaftaran Online / App",
            procedures: [],
            drugPrescription: [],
            adminFee: 0,
            status: "Menunggu",
            paymentMethod: o.penjaminan || "Umum",
          }));
      }
    } catch (e) {}

    // Merge all sources eliminating duplicates by date + clinic
    const dummyToUse =
      patient.mrn === "RM-10293" || patient.id === "RM-10293"
        ? DUMMY_VISITS
        : [];
    const merged = [...onlineVisits, ...srmMapped, ...dummyToUse];
    const unique = merged.filter(
      (v, i, a) =>
        a.findIndex((t) => t.date === v.date && t.clinic === v.clinic) === i,
    );
    return unique.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [srmVisits, patient.mrn, patient.id, patient.name]);

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const drawContent = (logoImg?: HTMLImageElement) => {
      // Hospital Header (Kop Surat)
      if (logoImg) {
        doc.addImage(logoImg, "PNG", 14, 15, 20, 20); // x, y, width, height
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(srmSettings.header1 || "RUMAH SAKIT UMLA", pageWidth / 2, 20, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(
        srmSettings.header2 || "Jl. Raya Plalangan Plosowahyu KM 2, Lamongan",
        pageWidth / 2,
        26,
        { align: "center" },
      );
      doc.text(
        "Telp: (0322) 123456 | Email: info@rsumla.com | Web: www.rsumla.com",
        pageWidth / 2,
        31,
        { align: "center" },
      );

      // Header Line
      doc.setLineWidth(1);
      doc.line(14, 38, pageWidth - 14, 38);
      doc.setLineWidth(0.2);
      doc.line(14, 39, pageWidth - 14, 39);

      // Document Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("RINGKASAN REKAM MEDIS ELEKTRONIK (RME)", pageWidth / 2, 48, {
        align: "center",
      });

      // Patient Info
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`No. Rekam Medis : ${patient.mrn || patient.id}`, 14, 58);
      doc.text(`Nama Pasien     : ${patient.name}`, 14, 63);
      doc.text(`No. NIK         : ${patient.nik}`, 14, 68);
      doc.text(
        `Tanggal Cetak   : ${new Date().toLocaleDateString("id-ID")}`,
        14,
        73,
      );

      // Table Data
      const tableColumn = [
        "Tanggal",
        "Poliklinik/Layanan",
        "Dokter",
        "Diagnosis/Keterangan",
        "Status",
        "Cara Bayar",
      ];
      const tableRows: any[] = [];

      visits.forEach((visit) => {
        const visitData = [
          new Date(visit.date).toLocaleDateString("id-ID"),
          visit.clinic,
          visit.doctor,
          visit.diagnosis,
          visit.status,
          visit.paymentMethod,
        ];
        tableRows.push(visitData);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 78,
        theme: "grid",
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [16, 185, 129] }, // emerald-500
        alternateRowStyles: { fillColor: [248, 250, 252] }, // slate-50
      });

      // Disclaimer
      const finalY = (doc as any).lastAutoTable.finalY || 78;
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        "Dokumen ini dihasilkan secara otomatis oleh sistem portal pasien dan sah tanpa tanda tangan.",
        pageWidth / 2,
        finalY + 15,
        { align: "center" },
      );

      // Save PDF
      doc.save(
        `RME_${patient.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
      );
    };

    if (siteSettings.logoUrl) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => drawContent(img);
      img.onerror = () => drawContent(); // fallback without image
      img.src = siteSettings.logoUrl;
    } else {
      drawContent();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            Riwayat Kunjungan dan Rekam Medis
          </h3>
          <p className="text-sm text-slate-500">
            Menampilkan riwayat kunjungan, ICD-10, tindakan, dan biaya.
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-lg shadow-sm transition-colors text-sm flex items-center justify-center gap-2 border border-slate-200"
        >
          <Download className="w-4 h-4" /> Unduh RME
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="min-w-full border-collapse text-[11px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="border-b border-slate-200 px-2 py-2 text-left font-semibold text-slate-700">
                Tanggal
              </th>
              <th className="border-b border-slate-200 px-2 py-2 text-left font-semibold text-slate-700">
                Poli / Dokter
              </th>
              <th className="border-b border-slate-200 px-2 py-2 text-left font-semibold text-slate-700">
                ICD-10 / Diagnosis
              </th>
              <th className="border-b border-slate-200 px-2 py-2 text-left font-semibold text-slate-700">
                Tindakan & Tarif
              </th>
              <th className="border-b border-slate-200 px-2 py-2 text-left font-semibold text-slate-700">
                Obat
              </th>
              <th className="border-b border-slate-200 px-2 py-2 text-left font-semibold text-slate-700">
                Perkiraan Biaya
              </th>
              <th className="border-b border-slate-200 px-2 py-2 text-left font-semibold text-slate-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => {
              const procedureTotal = visit.procedures.reduce(
                (sum, p) => sum + p.tariff,
                0,
              );
              const drugTotal = visit.drugPrescription.reduce(
                (sum, d) => sum + d.cost,
                0,
              );
              const total = procedureTotal + drugTotal + visit.adminFee;

              return (
                <tr key={visit.id} className="hover:bg-slate-50/60">
                  <td className="border-b border-slate-200 px-2 py-2 align-top">
                    <div className="font-medium text-slate-800">
                      {visit.date}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Metode: {visit.paymentMethod}
                    </div>
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 align-top">
                    <div className="text-slate-800">{visit.clinic}</div>
                    <div className="text-[10px] text-slate-500">
                      {visit.doctor}
                    </div>
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 align-top">
                    <div className="font-medium text-slate-800">
                      {visit.icd10}
                    </div>
                    <div className="text-[10px] text-slate-600">
                      {visit.diagnosis}
                    </div>
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 align-top">
                    <ul className="space-y-1">
                      {visit.procedures.map((proc) => (
                        <li
                          key={proc.code}
                          className="flex justify-between gap-2"
                        >
                          <span className="text-slate-700">
                            {proc.code} · {proc.name}
                          </span>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">
                            Rp {proc.tariff.toLocaleString("id-ID")}
                          </span>
                        </li>
                      ))}
                      <li className="flex justify-between text-[10px] text-slate-600 border-t border-dashed border-slate-200 pt-1 mt-1">
                        <span>Subtotal Tindakan</span>
                        <span>Rp {procedureTotal.toLocaleString("id-ID")}</span>
                      </li>
                    </ul>
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 align-top">
                    <ul className="space-y-1">
                      {visit.drugPrescription.map((drug, index) => (
                        <li
                          key={`${drug.name}-${index}`}
                          className="flex justify-between gap-2"
                        >
                          <span className="text-slate-700">
                            {drug.name} ({drug.dosage} · {drug.days} hari)
                          </span>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">
                            Rp {drug.cost.toLocaleString("id-ID")}
                          </span>
                        </li>
                      ))}
                      <li className="flex justify-between text-[10px] text-slate-600 border-t border-dashed border-slate-200 pt-1 mt-1">
                        <span>Subtotal Obat</span>
                        <span>Rp {drugTotal.toLocaleString("id-ID")}</span>
                      </li>
                    </ul>
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 align-top">
                    <div className="text-[10px] text-slate-600 mb-1">
                      Administrasi: Rp {visit.adminFee.toLocaleString("id-ID")}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                      Rp {total.toLocaleString("id-ID")}
                    </div>
                  </td>
                  <td className="border-b border-slate-200 px-2 py-2 align-top">
                    <span
                      className={[
                        "inline-flex items-center rounded-full border px-2 py-[2px] text-[10px] font-medium whitespace-nowrap",
                        VISIT_STATUS_BADGE[visit.status] ||
                          "bg-slate-50 text-slate-700 border-slate-200",
                      ].join(" ")}
                    >
                      {visit.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-slate-500 mt-2">
        Kolom biaya di atas digunakan untuk simulasi analisis tarif dan biaya
        satuan kunjungan pasien dalam mata kuliah akuntansi dan biaya rumah
        sakit.
      </p>
    </div>
  );
}
