import React, { useState } from "react";
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  Activity,
  Microscope,
  Pill,
  Stethoscope,
  BedDouble,
  AlertOctagon,
  HeartPulse,
  CreditCard,
  Box,
  Eye,
  Clock,
  Search,
  Filter,
  Plus,
  FileText,
  Save,
  X,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";
import toast from "react-hot-toast";

const moduleConfig: Record<
  string,
  { title: string; icon: any; cols: string[] }
> = {
  "rawat-jalan": {
    title: "Modul Rawat Jalan (Poliklinik)",
    icon: Stethoscope,
    cols: [
      "No. RM",
      "Nama Pasien",
      "Poliklinik",
      "Dokter",
      "Waktu",
      "Status",
      "Aksi",
    ],
  },
  "rawat-inap": {
    title: "Modul Rawat Inap (Bangsal)",
    icon: BedDouble,
    cols: [
      "No. RM",
      "Nama Pasien",
      "Bangsal",
      "Bed",
      "Tanggal Masuk",
      "Status",
      "Aksi",
    ],
  },
  igd: {
    title: "Modul IGD (Gawat Darurat)",
    icon: AlertOctagon,
    cols: [
      "No. RM",
      "Nama Pasien",
      "Triage",
      "Keluhan",
      "Waktu Masuk",
      "Status",
      "Aksi",
    ],
  },
  kasir: {
    title: "Modul Kasir & Billing",
    icon: CreditCard,
    cols: [
      "No. Tagihan",
      "No. RM",
      "Nama Pasien",
      "Layanan",
      "Total Tagihan",
      "Pembayaran",
      "Status",
    ],
  },
  logistik: {
    title: "Modul Logistik & Inventori",
    icon: Box,
    cols: [
      "Kode Barang",
      "Nama Barang",
      "Kategori",
      "Satuan",
      "Stok",
      "Status",
      "Aksi",
    ],
  },
  apotek: {
    title: "Modul Apotek & Farmasi",
    icon: Pill,
    cols: [
      "No. Resep",
      "No. RM",
      "Nama Pasien",
      "Dokter Poli",
      "Waktu",
      "Status",
      "Aksi",
    ],
  },
  laboratorium: {
    title: "Modul Laboratorium",
    icon: Microscope,
    cols: [
      "No. Lab",
      "No. RM",
      "Nama Pasien",
      "Jenis Pemeriksaan",
      "Prioritas",
      "Status",
      "Hasil",
    ],
  },
  radiologi: {
    title: "Modul Radiologi",
    icon: Activity,
    cols: [
      "No. Rad",
      "No. RM",
      "Nama Pasien",
      "Pemeriksaan",
      "Area",
      "Status",
      "Hasil",
    ],
  },
};

export default function SRMModul() {
  const { moduleName } = useParams<{ moduleName: string }>();
  const navigate = useNavigate();
  const { patients } = useSRMStore();
  const [searchTerm, setSearchTerm] = useState("");

  const currentModule =
    moduleName && moduleConfig[moduleName] ? moduleConfig[moduleName] : null;

  if (!currentModule) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-slate-500">Modul tidak ditemukan: {moduleName}</p>
      </div>
    );
  }

  // Generate some plausible mock data based on the module
  const mockDataMap: Record<string, any[]> = {
    "rawat-jalan": patients
      .slice(0, 5)
      .map((p, i) => [
        p.id,
        p.namaLengkap,
        ["Poli Umum", "Poli Gigi", "Poli Mata"][i % 3],
        ["Dr. Andi", "Dr. Budi", "Dr. Citra"][i % 3],
        "08:30 WIB",
        ["Menunggu", "Diperiksa", "Selesai"][i % 3],
      ]),
    "rawat-inap": patients
      .slice(0, 3)
      .map((p, i) => [
        p.id,
        p.namaLengkap,
        ["Melati", "Mawar", "Anggrek"][i % 3],
        `Bed ${i + 1}`,
        "10-06-2026",
        "Dirawat",
      ]),
    igd: patients
      .slice(2, 4)
      .map((p, i) => [
        p.id,
        p.namaLengkap,
        ["Merah", "Kuning", "Hijau"][i],
        ["Trauma Kepala", "Demam Tinggi"][i],
        "10:15 WIB",
        "Observasi",
      ]),
    kasir: patients
      .slice(0, 4)
      .map((p, i) => [
        `INV-2026-${1000 + i}`,
        p.id,
        p.namaLengkap,
        ["Pemeriksaan Poli", "Rawat Inap 3 Hari", "Lab Darah", "Tebusan Obat"][
          i % 4
        ],
        `Rp ${(150000 * (i + 1)).toLocaleString("id-ID")}`,
        ["Tunai", "BPJS Kesehatan", "Debit", "Asuransi Swasta"][i % 4],
        ["Lunas", "Menunggu Pembayaran"][i % 2],
      ]),
    logistik: [
      ["BRG-01", "Paracetamol 500mg", "Obat", "Strip", "150", "Aman"],
      ["BRG-02", "Spuit 3cc", "Alkes", "Box", "12", "Kritis"],
      ["BRG-03", "Masker N95", "BHP", "Box", "45", "Aman"],
      ["BRG-04", "Cairan Infus RL", "Obat", "Botol", "8", "Kritis"],
    ],
    apotek: patients
      .slice(1, 5)
      .map((p, i) => [
        `RSP-${8000 + i}`,
        p.id,
        p.namaLengkap,
        ["Dr. Andi (Umum)", "Dr. Citra (Gigi)"][i % 2],
        "09:45 WIB",
        ["Menunggu", "Diramu", "Selesai"][i % 3],
      ]),
    laboratorium: patients
      .slice(0, 3)
      .map((p, i) => [
        `LAB-${5000 + i}`,
        p.id,
        p.namaLengkap,
        ["Darah Lengkap", "Urine Rutin", "Gula Darah Puasa"][i % 3],
        ["Cito", "Normal", "Normal"][i % 3],
        ["Proses", "Selesai", "Selesai"][i % 3],
        ["Lihat", "Lihat Hasil", "Lihat Hasil"][i % 3],
      ]),
    radiologi: patients
      .slice(2, 4)
      .map((p, i) => [
        `RAD-${3000 + i}`,
        p.id,
        p.namaLengkap,
        ["Rontgen Thorax", "USG Abdomen"][i % 2],
        ["Dada", "Perut"][i % 2],
        ["Proses", "Selesai"][i % 2],
        ["Lihat Gambar", "Lihat Hasil"][i % 2],
      ]),
  };

  const moduleData = mockDataMap[moduleName!] || [];
  const filteredData = moduleData.filter((row) =>
    row.some((val: string) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const Icon = currentModule.icon;

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
        <h1 className="text-xl font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Icon className="w-6 h-6 text-slate-700" /> {currentModule.title}
        </h1>
        <div className="flex gap-2">
          <button className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
            onClick={() =>
              toast("Fitur Tambah Data memerlukan otorisasi petugas departemen", { icon: "🔒" })
            }
          >
            <Plus className="w-4 h-4" /> Tambah Data
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 bg-slate-50 p-3 border border-slate-300 rounded-sm">
        <div className="flex items-center gap-2 flex-1">
          <label className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Cari Data :
          </label>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Pencarian..."
              className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-slate-300 rounded-sm bg-slate-50">
        <table className="w-full text-xs text-left whitespace-nowrap">
          <thead className="bg-slate-200 text-slate-700 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-3 py-2.5 font-bold border-b border-r border-slate-300 text-center w-10">
                NO
              </th>
              {currentModule.cols.map((col, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2.5 font-bold border-b border-r border-slate-300"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="bg-white border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-3 py-2 border-r border-slate-300 text-center font-medium">
                    {rIdx + 1}
                  </td>
                  {row.map((cell: any, cIdx: number) => {
                    const isStatus =
                      typeof cell === "string" &&
                      [
                        "Aman",
                        "Kritis",
                        "Lunas",
                        "Menunggu",
                        "Diperiksa",
                        "Selesai",
                        "Dirawat",
                        "Observasi",
                        "Menunggu Pembayaran",
                        "Proses",
                        "Diramu",
                      ].includes(cell);
                    return (
                      <td
                        key={cIdx}
                        className="px-3 py-2 border-r border-slate-300"
                      >
                        {isStatus ? (
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest border ${
                              cell === "Aman" ||
                              cell === "Selesai" ||
                              cell === "Lunas"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : cell === "Kritis" || cell === "Observasi"
                                  ? "bg-rose-50 text-rose-600 border-rose-200"
                                  : "bg-amber-50 text-amber-600 border-amber-200"
                            }`}
                          >
                            {cell}
                          </span>
                        ) : (
                          <span className="font-medium text-slate-800">
                            {cell}
                          </span>
                        )}
                      </td>
                    );
                  })}
                  {currentModule.cols.length > row.length && (
                    <td className="px-3 py-2 text-center">
                      <button
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-xs font-medium border border-blue-200 hover:bg-blue-100"
                        onClick={() =>
                          toast("Tindakan ini memerlukan otentikasi lapis kedua", { icon: "🛡️" })
                        }
                      >
                        Aksi
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b border-slate-200">
                <td
                  colSpan={currentModule.cols.length + 1}
                  className="px-3 py-8 text-center text-slate-400 italic"
                >
                  {searchTerm
                    ? "Tidak ada data yang cocok dengan pencarian"
                    : "Silahkan lakukan pencarian atau tambah data baru..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
        <p>Total Data: {filteredData.length} records</p>
        <button
          onClick={() => navigate({ to: "/srm" })}
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 p-2 rounded text-slate-600 flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
