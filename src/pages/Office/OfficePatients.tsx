import React, { useState, useMemo } from "react";
import { useNavigate } from '@tanstack/react-router';
import {
  Search,
  Filter,
  Plus,
  User,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  UserPlus,
  Activity,
  Bed,
  FileText,
  Database,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficePatients() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const patients = useSRMStore((state) => state.patients);
  const visits = useSRMStore((state) => state.visits);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;
      // In a real app we would have tags like "Inpatient" or "Emergency"
      return true;
    });
  }, [patients, searchTerm, activeTab]);

  const totalPatients = patients.length;
  const recentVisitsCount = visits.filter((v) => {
    const today = new Date().toISOString().split("T")[0];
    return v.tanggalKunjungan.startsWith(today);
  }).length;

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Patients Directory
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and view all patient records
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/srm/pasien" })}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors"
          >
            <Database className="w-4 h-4 text-emerald-600" /> Open in SRM
          </button>
          <button
            onClick={() => navigate({ to: "/srm/pasien" })}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <UserPlus className="w-4 h-4" /> New Patient
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
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
              {totalPatients}
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
              <Clock className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Visits Today
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {recentVisitsCount}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Recorded
              </span>
              <span className="text-slate-400">in system</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                New Registrations
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">2</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> Active
              </span>
              <span className="text-slate-400">trend</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Data Integrity
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">100%</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Secure records
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            {["All", "Outpatient", "Inpatient", "Emergency"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-200/50"
                    : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search patients by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Patients Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 px-4 font-medium">Patient Details</th>
                <th className="pb-3 px-4 font-medium">ID / MRN</th>
                <th className="pb-3 px-4 font-medium">Gender & Age</th>
                <th className="pb-3 px-4 font-medium">Contact</th>
                <th className="pb-3 px-4 font-medium">Status / Visits</th>
                <th className="pb-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPatients.map((patient, i) => {
                const patientVisits = visits.filter(
                  (v) => v.patientId === patient.id,
                ).length;
                const age = patient.tanggalLahir
                  ? `${new Date().getFullYear() - new Date(patient.tanggalLahir).getFullYear()} yrs`
                  : "Unknown";

                return (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center shadow-sm shrink-0 border border-teal-200/50">
                          {patient.namaLengkap.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">
                            {patient.namaLengkap}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {patient.pekerjaan || "No Occupation"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-800 font-mono">
                        {patient.id}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {patient.nik}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700">
                          {patient.jenisKelamin === "L" ? "Male" : "Female"},{" "}
                          {age}
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5">
                          {patient.statusPernikahan}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        {/* Placeholder contact since store doesn't have it natively, showing city instead */}
                        <p className="flex items-center gap-1.5 text-xs text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {patient.kotaLahir}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />{" "}
                          {patient.tanggalLahir}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col items-start gap-1">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${patientVisits > 0 ? "text-blue-700 bg-blue-50 border border-blue-200/50" : "text-slate-600 bg-slate-100 border border-slate-200"}`}
                        >
                          {patientVisits > 0 ? "Active" : "Registered"}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {patientVisits} Records
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => navigate({ to: "/srm/pasien" })}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 mx-auto transition-all shadow-sm"
                        title="View Profile"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-500 italic"
                  >
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
          <p className="text-xs font-medium text-slate-500">
            Showing {filteredPatients.length} entries out of {totalPatients}
          </p>
        </div>
      </div>
    </div>
  );
}
