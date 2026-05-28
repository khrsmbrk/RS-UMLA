import React from "react";
import { DUMMY_VISITS, VISIT_STATUS_BADGE } from "../../data/mockData";
import { Download } from "lucide-react";

export default function PatientRME() {
  const visits = DUMMY_VISITS;

  const handleDownload = () => {
    alert("Simulasi: Mengunduh ringkasan Rekam Medis Elektronik (PDF)...");
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
