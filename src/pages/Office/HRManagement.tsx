import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Briefcase,
  Award,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";
import { useOfficeStore } from "./store/officeStore";

export default function HRManagement() {
  const [activeTab, setActiveTab] = useState<
    "employees" | "attendance" | "leave"
  >("employees");
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = useSRMStore((state) => state.doctors);
  const operators = useSRMStore((state) => state.operators);

  const employees = useMemo(() => {
    const list = [];
    doctors.forEach((d) => {
      list.push({
        id: `DOC-${d.id.substring(0, 6).toUpperCase()}`,
        name: d.nama,
        role: "Dokter",
        department: d.spesialisasi,
        status: "Active",
        email: `${d.nama.toLowerCase().replace(/[^a-z]/g, "")}@hospital.com`,
        phone: "+62 812-XXXX-XXXX",
        joinDate: "2020-03-15",
      });
    });
    operators.forEach((o) => {
      list.push({
        id: `OP-${o.kode.toUpperCase()}`,
        name: o.nama,
        role: "Operator",
        department: "Administrasi",
        status: "Active",
        email: `${o.kode.toLowerCase()}@hospital.com`,
        phone: "+62 813-XXXX-XXXX",
        joinDate: "2022-01-10",
      });
    });
    return list.filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [doctors, operators, searchTerm]);

  const attendance = useMemo(() => {
    // Generate mock attendance based on employees
    return employees.slice(0, 10).map((emp, i) => {
      const isLate = i % 4 === 0;
      const isAbsent = i % 7 === 0;
      return {
        id: emp.id,
        name: emp.name,
        date: new Date().toLocaleDateString(),
        checkIn: isAbsent ? "--:--" : isLate ? "08:15 AM" : "07:45 AM",
        checkOut: "--:--",
        status: isAbsent ? "Absent" : "Present",
        type: isAbsent ? "Unexcused" : isLate ? "Late" : "On-Time",
      };
    });
  }, [employees]);

  const totalEmp = doctors.length + operators.length;
  const presentEmp = Math.max(0, totalEmp - 3);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manajemen SDM & Pegawai
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola data pegawai, absensi, dan pengajuan cuti secara terpusat.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
          <Plus className="w-4 h-4" /> Tambah Pegawai
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Pegawai
            </p>
            <p className="text-2xl font-bold text-slate-800">{totalEmp}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Hadir Hari Ini
            </p>
            <p className="text-2xl font-bold text-slate-800">{presentEmp}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Sedang Cuti
            </p>
            <p className="text-2xl font-bold text-slate-800">{useOfficeStore(state => state.leaveRequests).filter(r => r.status === 'Disetujui').length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Tanpa Keterangan
            </p>
            <p className="text-2xl font-bold text-slate-800">1</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 px-4 pt-4 gap-6">
          <button
            onClick={() => setActiveTab("employees")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "employees" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            Direktori Pegawai
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "attendance" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            Absensi Harian
          </button>
          <button
            onClick={() => setActiveTab("leave")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "leave" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
          >
            Pengajuan Cuti
          </button>
        </div>

        {/* Tools Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama, ID, atau departemen..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors flex">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto bg-white">
          {activeTab === "employees" && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Informasi Pegawai
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Departemen & Peran
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Kontak
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center flex-shrink-0">
                          {emp.name.charAt(0)}
                          {emp.name.split(" ")[1]?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">
                            {emp.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 font-mono">
                            {emp.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-slate-700 font-medium whitespace-nowrap">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {emp.department}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-500 text-xs whitespace-nowrap">
                          <Award className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {emp.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {emp.email}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {emp.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold leading-none ${emp.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" : "bg-amber-50 text-amber-700 border border-amber-200/50"}`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "attendance" && (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Pegawai
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Check In
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Check Out
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">
                    Durasi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {attendance.map((att, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{att.name}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {att.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <Clock className="w-4 h-4 text-teal-600" />{" "}
                        {att.checkIn}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400 font-medium">
                        <Clock className="w-4 h-4" /> {att.checkOut}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${att.status === "Present" ? "bg-emerald-500" : "bg-rose-500"}`}
                        ></span>
                        <span className="font-medium text-slate-700">
                          {att.status}
                        </span>
                        {att.type && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${att.type === "On-Time" ? "bg-slate-100 text-slate-600" : att.type === "Late" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}
                          >
                            {att.type}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 font-medium">
                      --
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "leave" && (
            <LeaveRequestsTab />
          )}
        </div>
      </div>
    </div>
  );
}

function LeaveRequestsTab() {
  const leaveRequests = useOfficeStore(state => state.leaveRequests);
  const updateLeaveRequestStatus = useOfficeStore(state => state.updateLeaveRequestStatus);

  if (!leaveRequests || leaveRequests.length === 0) {
    return (
      <div className="p-16 flex flex-col items-center justify-center text-center">
        <CalendarDays className="w-16 h-16 text-slate-200 mb-4" />
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          Tidak Ada Pengajuan Cuti
        </h3>
        <p className="text-slate-500 text-sm max-w-sm">
          Belum ada pegawai yang mengajukan cuti hari ini.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100">
        <tr>
          <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Pegawai</th>
          <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Jenis Cuti</th>
          <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Durasi</th>
          <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Status</th>
          <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {leaveRequests.map((req) => (
          <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="font-bold text-slate-800">{req.userName}</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{req.userId}</div>
              <div className="text-xs text-slate-500 mt-1">{req.reason}</div>
            </td>
            <td className="px-6 py-4 font-medium text-slate-700">{req.type}</td>
            <td className="px-6 py-4">
              <div className="font-medium text-slate-800">{req.duration}</div>
              <div className="text-xs text-slate-500">{req.days} hari (Diajukan: {req.submittedDate})</div>
            </td>
            <td className="px-6 py-4">
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                  req.status === "Menunggu"
                    ? "bg-amber-100 text-amber-700"
                    : req.status === "Disetujui"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                }`}
              >
                {req.status}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              {req.status === "Menunggu" && (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => updateLeaveRequestStatus(req.id, "Disetujui")}
                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Setujui"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => updateLeaveRequestStatus(req.id, "Ditolak")}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Tolak"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
