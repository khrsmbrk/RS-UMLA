import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  Activity,
  HeartPulse,
  UserCheck,
  Calendar,
  Filter,
  Clock,
  GraduationCap,
  Award,
  MapPin,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const retentionData = [
  { name: "2021", perawat: 85, dokter: 90 },
  { name: "2022", perawat: 86, dokter: 92 },
  { name: "2023", perawat: 82, dokter: 88 },
  { name: "2024", perawat: 88, dokter: 94 },
  { name: "2025", perawat: 89, dokter: 93 },
  { name: "2026", perawat: 91, dokter: 95 },
];

const genderData = [
  { name: "Perempuan", value: 310 },
  { name: "Laki-laki", value: 140 },
];
const GENDER_COLORS = ["#ec4899", "#3b82f6"];

const workloadData = [
  { time: "08:00", load: 80 },
  { time: "12:00", load: 95 },
  { time: "16:00", load: 60 },
  { time: "20:00", load: 45 },
  { time: "00:00", load: 20 },
  { time: "04:00", load: 15 },
];

export default function OfficeHRAnalytics() {
  const [timeframe, setTimeframe] = useState("Tahun Ini");

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" /> HR Analytics &
            Executive Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Sistem informasi komprehensif kinerja tenaga medis, beban kerja, dan
            mutu SDM RS.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          {["Bulan Ini", "Kuartal Ini", "Tahun Ini"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${timeframe === tf ? "bg-white text-indigo-700 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-700"}`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total SDM Aktif",
            val: "450",
            subval: "+12 Pegawai Baru",
            icon: Users,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            border: "border-indigo-100",
            trend: "up",
          },
          {
            label: "Rasio Perawat : Pasien",
            val: "1 : 4.5",
            subval: "Ideal (SLA 1:5)",
            icon: HeartPulse,
            color: "text-rose-600",
            bg: "bg-rose-50",
            border: "border-rose-100",
            trend: "neutral",
          },
          {
            label: "Kepatuhan Visit Dokter",
            val: "92.4%",
            subval: "Meningkat 3.2%",
            icon: Activity,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            trend: "up",
          },
          {
            label: "Rata-rata Keterlambatan",
            val: "8.5",
            subval: "Menit/Bulan",
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100",
            trend: "down",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl border ${card.border} ${card.bg} shadow-sm relative overflow-hidden group`}
          >
            <card.icon
              className={`w-20 h-20 absolute -right-4 -bottom-4 ${card.color} opacity-10 group-hover:scale-110 transition-transform`}
            />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {card.label}
              </div>
              <div
                className={`p-2 bg-white rounded-lg shadow-sm ${card.color}`}
              >
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-3xl font-black text-slate-800">
                {card.val}
              </div>
              <div className="text-xs font-bold mt-1 text-slate-600 flex items-center gap-1">
                {card.trend === "up" && (
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                )}
                {card.trend === "down" && (
                  <TrendingUp className="w-3 h-3 text-red-500 transform rotate-180" />
                )}
                {card.subval}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                Tingkat Retensi Staf Medis (6 Tahun Terakhir)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Persentase tenaga medis yang bertahan tanpa mutasi/resign.
              </p>
            </div>
          </div>
          <div className="h-[300px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart
                data={retentionData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
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
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  domain={[60, 100]}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                    paddingTop: "20px",
                    fontWeight: "bold",
                  }}
                />
                <Bar
                  dataKey="perawat"
                  fill="#4f46e5"
                  name="Perawat / Nakes"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />
                <Bar
                  dataKey="dokter"
                  fill="#06b6d4"
                  name="Dokter (Spesialis & Umum)"
                  radius={[4, 4, 0, 0]}
                  barSize={25}
                />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" /> Demografi SDM
          </h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                <span>Dokter Spesialis</span>
                <span>45</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-indigo-500 h-1.5 rounded-full"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                <span>Dokter Umum & Gigi</span>
                <span>35</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-cyan-500 h-1.5 rounded-full"
                  style={{ width: "15%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                <span>Perawat & Bidan</span>
                <span>220</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-rose-500 h-1.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                <span>Nakes Lain & Non-Medis</span>
                <span>150</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-amber-500 h-1.5 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-500" /> Beban Kerja Harian
            (Kepadatan Shift)
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={workloadData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="load"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorLoad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Award className="w-5 h-5 text-amber-500" /> Kinerja Ruangan &
            Kepemimpinan (Top 3)
          </h3>
          <div className="space-y-4">
            {[
              {
                dept: "Instalasi Gawat Darurat (IGD)",
                score: 98,
                kepatuhan: 99,
                head: "Ns. Siti Aminah",
              },
              {
                dept: "Ruang ICU & NICU",
                score: 95,
                kepatuhan: 96,
                head: "Dr. Ahmad Rizal",
              },
              {
                dept: "Instalasi Farmasi",
                score: 92,
                kepatuhan: 90,
                head: "Apt. Budi Santoso",
              },
            ].map((d, i) => (
              <div
                key={i}
                className="p-4 border border-slate-100 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">
                      {d.dept}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <UserCheck className="w-3 h-3" /> Kepala: {d.head}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded text-xs font-bold border border-indigo-200">
                      Indeks Mutu: {d.score}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-600 font-bold">
                      Kepatuhan Rekam Medis & SOP
                    </span>
                    <span className="font-black text-emerald-600">
                      {d.kepatuhan}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${d.kepatuhan}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
