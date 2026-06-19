import React, { useMemo } from "react";
import { useNavigate } from '@tanstack/react-router';
import { useOfficeStore } from "./store/officeStore";
import { useSRMStore } from "../../store/srmStore";
import {
  ArrowUpRight,
  ChevronDown,
  Users,
  Bed,
  FileText,
  Activity,
  Filter,
  ArrowRight,
  Monitor,
  Database,
} from "lucide-react";
import {
  BarChart,
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

export default function OfficeDashboard() {
  const { userRole } = useOfficeStore();
  const navigate = useNavigate();

  // Connect to SRM Database
  const patients = useSRMStore((state) => state.patients);
  const visits = useSRMStore((state) => state.visits);
  const queueToday = useSRMStore((state) => state.queueToday);
  const doctors = useSRMStore((state) => state.doctors);
  const masterData = useSRMStore((state) => state.masterData);

  // Derived metrics
  const today = new Date().toISOString().split("T")[0];
  const visitsToday = visits.filter((v) =>
    v.tanggalKunjungan.startsWith(today),
  );

  const rooms = masterData?.kamar || [];
  const totalBeds = rooms.length;
  const occupiedBeds = rooms.filter((r) => r.Status !== "Tersedia").length;
  const bedOccupancyRate =
    totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  const getDayLabel = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'short' });
  };

  const trendData = useMemo(() => {
    const data: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const dt = new Date();
      dt.setDate(dt.getDate() - i);
      data[dt.toLocaleDateString('id-ID', { weekday: 'short' })] = 0;
    }
    visits.forEach(v => {
      const d = getDayLabel(v.tanggalKunjungan);
      if (data[d] !== undefined) data[d]++;
    });
    return Object.keys(data).map(k => ({ day: k, Kunjungan: data[k] }));
  }, [visits]);

  const bedData = [
    { name: "Terisi", value: occupiedBeds, color: "#f43f5e" },
    { name: "Kosong", value: totalBeds - occupiedBeds, color: "#10b981" },
  ];

  const recentVisitsData = useMemo(() => {
    return visits
      .slice(-5)
      .reverse()
      .map((v) => {
        const p = patients.find((pat) => pat.id === v.patientId);
        const d = doctors.find((doc) => doc.id === v.dokterId);
        return {
          name: p?.namaLengkap || "Unknown Patient",
          id: v.patientId,
          dept: d?.spesialisasi || "General",
          date: new Date(v.tanggalKunjungan).toLocaleDateString(),
          status: v.totalBiaya ? "Completed" : "In Progress",
          color: v.totalBiaya
            ? "text-emerald-600 bg-emerald-50"
            : "text-blue-600 bg-blue-50",
        };
      });
  }, [visits, patients, doctors]);

  const queueData = useMemo(() => {
    return queueToday.list
      .map((q) => {
        const p = patients.find((pat) => pat.id === q.patientId);
        return {
          time: new Date(q.waktuDaftar).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          name: q.nama,
          type: p ? "Existing Patient" : "New Patient",
          dept: "Poliklinik",
          doctor: "On Duty",
          status: q.status,
        };
      })
      .slice(0, 5);
  }, [queueToday, patients]);

  const wardsData = useMemo(() => {
    // Group rooms by Category
    const grouped = rooms.reduce(
      (acc, room) => {
        const cat = room["Kategori"] || "General Ward";
        if (!acc[cat]) {
          acc[cat] = { total: 0, occupied: 0 };
        }
        acc[cat].total++;
        if (room.Status !== "Tersedia") acc[cat].occupied++;
        return acc;
      },
      {} as Record<string, { total: number; occupied: number }>,
    );

    return Object.entries(grouped)
      .map(([name, data]) => {
        const rate =
          data.total > 0 ? Math.round((data.occupied / data.total) * 100) : 0;
        let colorClass = "bg-emerald-500";
        if (rate > 80) colorClass = "bg-rose-500";
        else if (rate > 50) colorClass = "bg-amber-500";
        return { name, ...data, rate, colorClass };
      })
      .slice(0, 4); // Show top 4 categories
  }, [rooms]);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage essential hospital metrics, patients, and operational data.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/pendaftaran-online" })}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors"
          >
            <Monitor className="w-4 h-4 text-emerald-600" /> Pendaftaran Online
          </button>
          <button
            onClick={() => navigate({ to: "/srm" })}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Database className="w-4 h-4 text-teal-100" /> SIMRS / SRM System
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Patients
              </h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">
              Real-time
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {patients.length}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> Synchronized
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Bed Occupancy
              </h3>
            </div>
            <span className="text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
              SRM Rate
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {bedOccupancyRate}%
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Based on {totalBeds} total beds
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Appointments
              </h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">
              Today
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {queueToday.list.length}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> Live Queue
              </span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Visits Today
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {visitsToday.length}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left wider col */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Tren Kunjungan (7 Hari)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} dx={-10} />
                  <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="Kunjungan" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                Recent Patient Visits (SRM)
              </h2>
              <button
                onClick={() => navigate({ to: "/srm/kunjungan" })}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 px-3 py-1.5 border border-slate-200 rounded-lg"
              >
                <Filter className="w-4 h-4" /> View All in SRM
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="pb-3 font-medium text-xs uppercase tracking-wider">
                      Patient Name
                    </th>
                    <th className="pb-3 font-medium text-xs uppercase tracking-wider">
                      Department
                    </th>
                    <th className="pb-3 font-medium text-xs uppercase tracking-wider">
                      Date
                    </th>
                    <th className="pb-3 font-medium text-xs uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentVisitsData.length > 0 ? (
                    recentVisitsData.map((visit, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-3">
                          <div className="font-bold text-slate-800">
                            {visit.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {visit.id}
                          </div>
                        </td>
                        <td className="py-3 text-slate-600">{visit.dept}</td>
                        <td className="py-3 text-slate-600">{visit.date}</td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${visit.color}`}
                          >
                            {visit.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-slate-400 italic"
                      >
                        No recent visits found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                Bed Occupancy Overview
              </h2>
              <div className="text-sm text-slate-500 font-medium">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={bedData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                      {bedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-slate-800">{bedOccupancyRate}%</span>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Terisi</span>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-4">
                {wardsData.map((ward, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-bold text-slate-700">
                        {ward.name}
                      </span>
                      <span className="text-sm font-bold text-slate-500">
                        {ward.rate}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                      <div
                        className={`${ward.colorClass} h-2 rounded-full`}
                        style={{ width: `${ward.rate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>
                        {ward.occupied} / {ward.total} beds
                      </span>
                      <span>{ward.total - ward.occupied} available</span>
                    </div>
                  </div>
                ))}
                {wardsData.length === 0 && (
                  <div className="py-4 text-center text-slate-400 italic">
                    No ward data configured.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right narrower col */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Quick Systems Access
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate({ to: "/srm/antrian" })}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">
                      Live Queue / Antrian TV
                    </p>
                    <p className="text-xs text-slate-500">
                      Manage Patient Waitings
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => navigate({ to: "/srm/dashboard" })}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 flex items-center justify-center rounded-lg">
                    <Database className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">
                      SIMRS / SRM
                    </p>
                    <p className="text-xs text-slate-500">
                      Manage Core Medical Records
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => navigate({ to: "/pendaftaran-online" })}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-lg">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">
                      Pendaftaran Online
                    </p>
                    <p className="text-xs text-slate-500">
                      Patient Registration Portal
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                Today's Queue Schedule
              </h2>
              <button
                onClick={() => navigate({ to: "/srm/antrian" })}
                className="text-teal-600 text-sm font-bold hover:underline"
              >
                View Live
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto no-scrollbar flex-1 max-h-[400px]">
              {queueData.length > 0 ? (
                queueData.map((apt, i) => (
                  <div
                    key={i}
                    className="p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow bg-slate-50/30"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shadow-sm">
                          <Users className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">
                            {apt.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {apt.type}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-xs">
                      <div className="text-slate-400">Department</div>
                      <div className="text-slate-800 font-medium">
                        : {apt.dept}
                      </div>
                      <div className="text-slate-400">Doctor</div>
                      <div className="text-slate-800 font-medium">
                        : {apt.doctor}
                      </div>
                      <div className="text-slate-400">Registered at</div>
                      <div className="text-slate-800 font-medium">
                        : {apt.time}
                      </div>
                      <div className="text-slate-400">Status</div>
                      <div className="text-slate-800 font-medium">
                        : {apt.status}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 italic">
                  No queue data available for today.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
