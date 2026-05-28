import React from "react";
import { Link } from "react-router-dom";
import { useOfficeStore } from "./store/officeStore";
import {
  Building2,
  Users,
  FileText,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Clock,
  Calendar,
  MapPin,
  Camera,
  QrCode,
  ClipboardCheck,
  Truck,
  ShieldAlert,
  BarChart,
  Wallet,
  BookOpen,
  UserCheck,
  Inbox,
  PenTool,
  Megaphone,
} from "lucide-react";

export default function OfficeDashboard() {
  const { userRole } = useOfficeStore();

  const isBph = ["bph"].includes(userRole);
  const isDireksi = [
    "direktur",
    "wadir_medis",
    "wadir_keuangan",
    "wadir_admin",
  ].includes(userRole);
  const isManajemen = [
    "kabid_jalan",
    "kabid_keperawatan",
    "kepala_igd",
    "kepala_inap",
    "kepala_bedah",
    "kepala_farmasi",
    "kepala_gizi",
    "kepala_lab",
    "kepala_rad",
    "kepala_paviliun",
    "kasubag_data",
    "kasubag_akuntansi",
    "kasubag_pasar",
    "bendahara",
    "kasubag_aset",
    "kasubag_kebersihan",
  ].includes(userRole);
  const isNakes = [
    "dokter_umum",
    "dokter_gigi",
    "dokter_spesialis",
    "perawat",
    "paramedis",
    "apoteker",
    "ahli_gizi",
    "analis_lab",
    "radiografer",
  ].includes(userRole);
  const isKeuangan = [
    "wadir_keuangan",
    "kasubag_akuntansi",
    "bendahara",
  ].includes(userRole);
  const isAset = ["wadir_admin", "kasubag_aset", "kasubag_kebersihan"].includes(
    userRole,
  );
  const isAdminIT = ["tenaga_adm", "kasubag_data", "developer_web"].includes(userRole);

  const ExecutiveInsightsPanel = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <BarChart className="w-6 h-6 text-indigo-600" /> Executive Insights
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Pusat kendali data strategis, operasional medis, & keuangan Rumah
            Sakit.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Bed Occupancy Rate",
            value: "78.5%",
            trend: "+2.1%",
            icon: BarChart,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Avg Length of Stay",
            value: "4.2 Hari",
            trend: "-0.3 Hari",
            icon: Clock,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Total Pasien / Bulan",
            value: "8.432",
            trend: "+15%",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Serapan Anggaran",
            value: "42.1%",
            trend: "On Track",
            icon: Wallet,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-slate-300 transition-colors"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${kpi.bg} rounded-bl-[100px] -z-0 opacity-50`}
            ></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {kpi.label}
              </span>
              <div className={`p-2 rounded-lg ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-3xl font-black text-slate-800 tracking-tight">
                {kpi.value}
              </div>
              <div className="text-emerald-500 text-xs font-bold flex items-center gap-1 mt-1">
                {kpi.trend} vs Bulan Lalu
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CorrespondencePanel = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative">
          <div className="absolute top-4 right-4 bg-rose-100 text-rose-700 px-3 py-1 text-xs font-bold rounded-full animate-pulse flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-rose-600 rounded-full"></div>2
            Mendesak
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-indigo-600" /> Disposisi Surat &
            Tugas
          </h3>
          <div className="space-y-4">
            {[
              {
                id: "S-192",
                from: "Kemenkes RI",
                subject: "Undangan Rapat Koordinasi BLUD",
                urgency: "Tinggi",
              },
              {
                id: "NM-44",
                from: "Manajemen Internal",
                subject: "Pengajuan Penambahan Dokter Spesialis",
                urgency: "Normal",
              },
            ].map((s) => (
              <div
                key={s.id}
                className="p-4 border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl flex flex-col gap-3"
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>
                        {s.id} — {s.from}
                      </span>
                    </div>
                    {s.urgency === "Tinggi" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase tracking-wider">
                        High Priority
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-slate-800">{s.subject}</div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors shadow-sm">
                    Beri Disposisi
                  </button>
                  <button className="flex-1 py-2 bg-white text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 border border-slate-200 shadow-sm">
                    Lacak Alur
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-emerald-600" /> Dokumen Menunggu
            E-Sign
          </h3>
          <div className="space-y-4">
            {[
              {
                id: "SK-DIR-22",
                type: "Surat Keputusan",
                name: "SK Pengangkatan Komite Medik",
              },
              {
                id: "BDG-9",
                type: "Budget Approval",
                name: "Pengadaan Alat Medis (Rp 4.5M)",
              },
            ].map((s) => (
              <div
                key={s.id}
                className="p-4 border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {s.id} — {s.type}
                  </div>
                  <div className="font-bold text-slate-800 mt-1">{s.name}</div>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 shadow-sm flex items-center gap-1.5 transition-colors">
                  <PenTool className="w-4 h-4" /> Tanda Tangani
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CredentialingPanel = () => (
    <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-6 mt-6">
      <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-amber-600" /> Credentialing Alert
        Nakes
      </h3>
      <p className="text-sm text-amber-800 mb-6">
        Deteksi STR/SIP yang akan habis masa berlakunya dalam periode 90 hari
        kedepan.
      </p>
      <div className="overflow-hidden rounded-lg border border-amber-200 bg-white shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-amber-100 text-amber-900 border-b border-amber-200">
            <tr>
              <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs">
                Nakes / Staf Medis
              </th>
              <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs">
                Jenis Izin
              </th>
              <th className="px-5 py-3 font-bold uppercase tracking-wider text-xs">
                Tanggal Berakhir
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100">
            <tr className="hover:bg-amber-50/50">
              <td className="px-5 py-4 font-bold text-slate-800">
                dr. Siti Aminah, Sp.A
              </td>
              <td className="px-5 py-4">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded">
                  SIP Praktik
                </span>
              </td>
              <td className="px-5 py-4 font-bold text-red-600">
                Terakhir 15 Juni 2026
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const TaskManagementPanel = () => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-indigo-600" /> Akreditasi &
          Indikator Mutu
        </h3>
        <span className="px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black rounded-lg">
          Progres Tahunan: 68%
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 min-h-[150px]">
          <h4 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div> To Do
            (Tugas)
          </h4>
          <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm text-sm mb-3 hover:border-slate-400 transition-colors cursor-pointer group">
            <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
              Review SPO Pendaftaran Pasien Rawat Jalan
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Deadline: 23 Mei
            </div>
          </div>
        </div>
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200 min-h-[150px]">
          <h4 className="font-bold text-blue-800 text-sm mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>{" "}
            In Progress
          </h4>
          <div className="bg-white p-3 border border-blue-200 rounded-lg shadow-sm text-sm mb-3">
            <div className="font-bold text-slate-800">
              Pengumpulan Bukti Telusur Akreditasi Pokja HPK
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 min-h-[150px]">
          <h4 className="font-bold text-emerald-800 text-sm mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Selesai
            / Disetujui
          </h4>
        </div>
      </div>
    </div>
  );

  const EmployeeSelfServicePanel = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
        <MapPin className="hidden sm:block w-32 h-32 absolute right-6 opacity-10" />
        <div className="relative z-10 flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black flex items-center gap-2">
              <Camera className="w-6 h-6" /> Absensi Geofencing
            </h3>
          </div>
          <p className="text-blue-100 text-sm mb-6 max-w-sm leading-relaxed">
            Lokasi Anda saat ini berhasil terverifikasi dalam radius{" "}
            <strong>50m</strong> dari RS UMLA.
          </p>
          <button className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2 focus:ring-4 focus:ring-emerald-500/30">
            <CheckCircle className="w-5 h-5" /> Validasi Kehadiran Shift Pagi
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
          <Wallet className="w-5 h-5 text-indigo-600" /> Akses Cepat Karyawan
        </h3>
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          <button className="w-full text-left py-2.5 px-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-lg text-sm text-slate-700 font-bold transition-colors flex justify-between items-center">
            Slip Gaji & Remunerasi <span>&rarr;</span>
          </button>
          <button className="w-full text-left py-2.5 px-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-lg text-sm text-slate-700 font-bold transition-colors flex justify-between items-center">
            Pengajuan Cuti Tahunan <span>&rarr;</span>
          </button>
          <button className="w-full text-left py-2.5 px-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-lg text-sm text-slate-700 font-bold transition-colors flex justify-between items-center">
            Tukar Jadwal Jaga (Shift) <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );

  const SupportITPanel = () => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" /> IT Helpdesk &
          Support Center
        </h3>
        <Link 
          to="/office/developer-web" 
          className="bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
        >
          Developer Web Seting
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            id: "TKT-991",
            user: "Ns. Ani (IGD)",
            issue: "Modul RME Gagal Simpan Resep (Timeout)",
            priority: "High",
            status: "Open",
          },
          {
            id: "TKT-990",
            user: "Farmasi",
            issue: "Printer Label Obat Mati Total",
            priority: "Medium",
            status: "In Progress",
          },
        ].map((t, i) => (
          <div
            key={i}
            className="p-4 border border-slate-100 bg-slate-50 rounded-xl flex flex-col justify-between hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {t.id}
                </span>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-black rounded uppercase tracking-wider border ${t.priority === "High" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}
                >
                  {t.priority} Priority
                </span>
              </div>
              <div className="font-bold text-slate-800 text-sm mb-1">
                {t.issue}
              </div>
              <div className="text-xs font-semibold text-slate-500 mb-4 flex items-center gap-1">
                <Users className="w-3 h-3" /> Pelapor: {t.user}
              </div>
            </div>
            <button className="w-full py-2 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 text-xs font-bold rounded-lg transition-colors">
              Ambil & Tangani Tiket
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const FacilityPanel = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-slate-300 transition-colors">
        <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-100 transition-colors rounded-full flex items-center justify-center text-blue-600 shrink-0">
          <Camera className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">
            Kerusakan Aset & Bangunan
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-1 mb-3">
            Lapor AC/Lampu/Pintu rusak.
          </p>
          <button className="px-5 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-900 shadow-sm transition-colors">
            Buat Laporan
          </button>
        </div>
      </div>
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-slate-300 transition-colors">
        <div className="w-16 h-16 bg-emerald-50 group-hover:bg-emerald-100 transition-colors rounded-full flex items-center justify-center text-emerald-600 shrink-0">
          <QrCode className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">
            Scan QR Patroli Area
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-1 mb-3">
            Security log dan audit kebersihan.
          </p>
          <button className="px-5 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 shadow-sm transition-colors">
            Scan Titik Patroli
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-10 max-w-7xl mx-auto">
      {(isBph || isDireksi || isKeuangan) && <ExecutiveInsightsPanel />}

      <div className="grid grid-cols-1 gap-6">
        {(isDireksi || isManajemen) && <CorrespondencePanel />}
      </div>

      {(userRole === "wadir_medis" ||
        userRole === "kabid_jalan" ||
        userRole === "kabid_keperawatan") && <CredentialingPanel />}
      {isManajemen && <TaskManagementPanel />}
      {isAdminIT && <SupportITPanel />}
      {isAset && <FacilityPanel />}

      <div className="pt-8 mt-8 border-t border-slate-200">
        <h2 className="text-xl font-black text-slate-800 mb-4 capitalize">
          Portal Personal & Layanan Mandiri
        </h2>
        <EmployeeSelfServicePanel />
      </div>
    </div>
  );
}
