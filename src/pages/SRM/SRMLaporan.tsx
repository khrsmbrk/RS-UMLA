import React, { useState, useMemo } from "react";
import {
  BarChart2,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Filter,
  PieChart as PieIcon,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const SRMLaporan = () => {
  const [activeTab, setActiveTab] = useState("kunjungan");
  const visits = useSRMStore((state) => state.visits);
  const doctors = useSRMStore((state) => state.doctors);

  const poliData = useMemo(() => {
    const counts: Record<string, number> = {};
    visits.forEach((v) => {
      const doctor = doctors.find((d) => d.id === v.dokterId);
      const sp = doctor ? doctor.spesialisasi : "Umum";
      counts[sp] = (counts[sp] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [visits, doctors]);

  const COLORS = [
    "#4f46e5",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#f43f5e",
    "#8b5cf6",
  ];

  const visitData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayVisits = visits.filter((v) =>
        v.tanggalKunjungan.startsWith(dateStr),
      );
      data.push({
        name: `${d.getDate()}/${d.getMonth() + 1}`,
        total: dayVisits.length,
      });
    }
    return data;
  }, [visits]);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-indigo-600" />
            Laporan & Analitik
          </h1>
          <p className="text-slate-500">
            Ringkasan data operasional dan statistik rumah sakit
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 bg-white">
            <Calendar className="w-4 h-4" /> Bulan Ini
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "kunjungan" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("kunjungan")}
        >
          Statistik Kunjungan
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "demografi" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("demografi")}
        >
          Demografi Pasien
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "penyakit" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("penyakit")}
        >
          10 Besar Penyakit
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "keuangan" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("keuangan")}
        >
          Ringkasan Keuangan
        </button>
      </div>

      {activeTab === "kunjungan" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">
                  Total Kunjungan
                </h3>
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">
                {visits.length > 0 ? visits.length : "4,285"}
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +12.5%
                </span>
                <span className="text-slate-500 ml-2">vs bulan lalu</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">
                  Pasien Baru
                </h3>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">842</div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +5.2%
                </span>
                <span className="text-slate-500 ml-2">vs bulan lalu</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">
                  Rata-rata per Hari
                </h3>
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <BarChart2 className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-800">142</div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-slate-500">Pasien per hari</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
              <h3 className="text-base font-semibold text-slate-800 mb-6">
                Kunjungan 7 Hari Terakhir
              </h3>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={visitData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: "#f1f5f9" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
              <h3 className="text-base font-semibold text-slate-800 mb-6">
                Distribusi per Poliklinik
              </h3>
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                {poliData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={poliData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {poliData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [
                          `${value} pasien`,
                          "Kunjungan",
                        ]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <PieIcon className="w-16 h-16 text-slate-200 mb-4" />
                    <p className="text-slate-500 text-sm">
                      Belum ada data kunjungan untuk ditampilkan
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "kunjungan" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-16 text-center">
          <BarChart2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
             Modul Analitik Lanjutan Terkunci
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Laporan untuk kategori {activeTab} memerlukan integrasi dengan modul Business Intelligence (BI) RS, yang dapat diakses oleh Manajemen Eksekutif.
          </p>
        </div>
      )}
    </div>
  );
};

export default SRMLaporan;
