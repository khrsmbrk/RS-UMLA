import React from "react";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart as PieChartIcon,
  Activity,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { name: "Jan", bpjs: 4000, umum: 2400, asuransi: 2400 },
  { name: "Feb", bpjs: 3000, umum: 1398, asuransi: 2210 },
  { name: "Mar", bpjs: 2000, umum: 9800, asuransi: 2290 },
  { name: "Apr", bpjs: 2780, umum: 3908, asuransi: 2000 },
  { name: "Mei", bpjs: 1890, umum: 4800, asuransi: 2181 },
  { name: "Jun", bpjs: 2390, umum: 3800, asuransi: 2500 },
];

const expenseData = [
  { name: "Farmasi & BHP", value: 45 },
  { name: "SDM / Gaji", value: 35 },
  { name: "Operasional & Listrik", value: 12 },
  { name: "Pemeliharaan", value: 8 },
];

const revenuePieData = [
  { name: "BPJS Kesehatan", value: 55 },
  { name: "Umum / Tunai", value: 30 },
  { name: "Asuransi Swasta", value: 15 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

export default function OfficeFinance() {
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-600" /> Keuangan
            Korporat & Executive Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Sistem informasi manajemen performa finansial, arus kas, dan kontrol
            anggaran RS UMLA.
          </p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors shrink-0 w-full sm:w-auto justify-center">
          <Download className="w-4 h-4" /> Export Laporan Lengkap
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total Pendapatan (MTD)",
            val: "Rp 4.2 M",
            trend: "up",
            pct: "+12.5%",
            icon: Wallet,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Klaim BPJS Cair (MTD)",
            val: "Rp 2.8 M",
            trend: "up",
            pct: "+8.2%",
            icon: CheckCircle,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Biaya Operasional (MTD)",
            val: "Rp 1.9 M",
            trend: "down",
            pct: "-2.4%",
            icon: TrendingDown,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "EBITDA Margin",
            val: "22.4%",
            trend: "up",
            pct: "+1.1%",
            icon: Activity,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-slate-300 transition-colors"
          >
            <div
              className={`absolute right-0 bottom-0 w-24 h-24 ${card.bg} rounded-tl-[100px] z-0 opacity-50 group-hover:scale-110 transition-transform`}
            ></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  {card.label}
                </div>
                <div className="text-3xl font-black text-slate-800 tracking-tight">
                  {card.val}
                </div>
              </div>
              <div
                className={`p-2 rounded-lg shadow-sm border border-slate-100 bg-white`}
              >
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 relative z-10">
              <div
                className={`text-xs font-black flex items-center gap-1.5 uppercase tracking-wider ${card.trend === "up" ? "text-emerald-600" : "text-amber-600"}`}
              >
                {card.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {card.pct}{" "}
                <span className="text-slate-400 font-bold ml-1">
                  vs Bulan Lalu
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-sm">
                <Activity className="w-5 h-5 text-emerald-500" /> Tren
                Pendapatan by Penjamin
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-2">
                Analisis YTD perbandingan pemasukan BPJS, Umum, dan Asuransi
                Swasta (Dalam Juta Rupiah).
              </p>
            </div>
          </div>
          <div className="h-[320px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorBpjs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUmum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b", fontWeight: "bold" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b", fontWeight: "bold" }}
                />
                <CartesianGrid
                  vertical={false}
                  stroke="#f1f5f9"
                  strokeDasharray="3 3"
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px -2px rgba(0,0,0,0.1)",
                    fontWeight: "bold",
                  }}
                  itemStyle={{ color: "#1e293b" }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                    paddingTop: "20px",
                    fontWeight: "bold",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="umum"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUmum)"
                  name="Pasien Umum"
                />
                <Area
                  type="monotone"
                  dataKey="bpjs"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBpjs)"
                  name="BPJS Kesehatan"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
              <PieChartIcon className="w-5 h-5 text-indigo-500" /> Share
              Pendapatan (%)
            </h3>
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenuePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    stroke="none"
                    dataKey="value"
                  >
                    {revenuePieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 20px -2px rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                    itemStyle={{ color: "#1e293b" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-100">
              {revenuePieData.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-3.5 h-3.5 rounded-full shadow-sm"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {d.name}
                    </div>
                    <div className="font-black text-slate-800">{d.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-sm p-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-amber-100/50 rounded-bl-full z-0 pointer-events-none group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-xs text-amber-900 mb-2">
                  Peringatan Arus Kas Operasional
                </h4>
                <p className="text-sm font-medium text-amber-800/80 leading-relaxed mb-4">
                  Terdapat penundaan pembayaran tagihan obat PBF dari siklus
                  normal 30 hari berjalan menuju 45 hari. Direkomendasikan
                  segera alokasikan dana Rp 450 Juta minggu ini.
                </p>
                <button className="px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-lg hover:bg-amber-700 transition-transform active:scale-95 shadow-sm border border-amber-700/20 uppercase tracking-wider w-full sm:w-auto">
                  Instruksi Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-black text-slate-800 text-lg uppercase tracking-widest">
              Daftar Pengajuan Anggaran Khusus
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-2">
              Memerlukan persetujuan lapis ganda (Wadir Keuangan & Direktur
              Utama).
            </p>
          </div>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto text-center">
            Lihat Semua Riwayat
          </button>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Unit Pengaju
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Tujuan / Deskripsi Proposal
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">
                  Nominal Pengajuan
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">
                  Tracking Status
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">
                  Aksi Eksekutif
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  unit: "IPSRS",
                  desc: "Pengadaan Modul Modifikasi Kelistrikan IGD",
                  amount: "Rp 45.000.000",
                  status: "Review Dirkeu",
                },
                {
                  unit: "Keperawatan",
                  desc: "Sertifikasi ACLS Lanjutan Eksternal (20 Orang)",
                  amount: "Rp 60.000.000",
                  status: "Validasi Wadir",
                },
                {
                  unit: "IT",
                  desc: "Perpanjangan Lisensi CyberSecurity Endpoint Firewall",
                  amount: "Rp 55.500.000",
                  status: "Approval Direktur",
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800 text-base mb-1">
                      {row.unit}
                    </div>
                    <div className="text-[10px] font-black tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200 inline-block">
                      PR-2605-0{i + 1}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-medium leading-relaxed max-w-xs truncate">
                    {row.desc}
                  </td>
                  <td className="px-6 py-5 font-mono font-black text-right text-indigo-700 tracking-tight text-lg">
                    {row.amount}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 inline-flex items-center gap-1.5 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right space-x-2 whitespace-nowrap">
                    <button className="text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm">
                      Tinjau Detail
                    </button>
                    <button className="text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg shadow-sm border border-emerald-700/20 text-xs font-bold transition-transform active:scale-95">
                      Setujui Validasi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
