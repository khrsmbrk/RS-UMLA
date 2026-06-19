import React, { useState, useMemo } from "react";
import { useNavigate } from '@tanstack/react-router';
import {
  Files,
  Archive,
  FolderSymlink,
  CheckCircle,
  Database,
  Search,
  Filter,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeRMAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Digital Records");
  const [searchTerm, setSearchTerm] = useState("");

  const patients = useSRMStore((state) => state.patients);
  const visits = useSRMStore((state) => state.visits);

  const totalPatients = patients.length;
  const recentUpdates = visits.length;

  const incompleteRecords = Math.floor(visits.length * 0.1) || 0; // Mock 10% incomplete

  const filteredRecords = useMemo(() => {
    return patients.filter((p) => {
      const matchSearch =
        p.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [patients, searchTerm]);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Files className="w-6 h-6 text-teal-600" /> Medical Records (RME)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage electronic medical records, assembling, and compliance
            tracking.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/srm/rekam-medis" })}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Database className="w-4 h-4 text-teal-100" /> SRM RME Module
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Files className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Records
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {totalPatients}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium whitespace-nowrap">
                Synchronized
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <FolderSymlink className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Recent Updates
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {recentUpdates}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium whitespace-nowrap">
                Visit records logged
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Incomplete (KLPCM)
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {incompleteRecords}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-rose-500 font-medium whitespace-nowrap">
                Requires review
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              "Digital Records",
              "Physical Tracker",
              "Assembling (KLPCM)",
              "Archived",
            ].map((tab) => (
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

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Patient MRN or Name..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            </div>
            <button className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 px-4 font-medium min-w-[200px]">
                  Patient details
                </th>
                <th className="pb-3 px-4 font-medium">MRN Number</th>
                <th className="pb-3 px-4 font-medium">Last Visit Info</th>
                <th className="pb-3 px-4 font-medium text-center">
                  RME Status
                </th>
                <th className="pb-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecords.map((p, i) => {
                const patientVisits = visits.filter(
                  (v) => v.patientId === p.id,
                );
                const lastVisit =
                  patientVisits.length > 0 ? patientVisits[0] : null;
                const isComplete = i % 5 !== 0; // Mock incomplete randomly

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-800">
                        {p.namaLengkap}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {p.jenisKelamin === "L" ? "Male" : "Female"}, NIK:{" "}
                        {p.nik || "-"}
                      </p>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {p.id}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {lastVisit ? (
                        <>
                          <div className="text-slate-800">
                            {new Date(
                              lastVisit.tanggalKunjungan,
                            ).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {lastVisit.diagnosis ? lastVisit.diagnosis.substring(0, 20) + "..." : "Pemeriksaan"}
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-400 italic">
                          No visits recorded
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {lastVisit ? (
                        <span
                          className={`px-2.5 py-1 rounded-md border text-[11px] font-bold uppercase tracking-wider ${
                            isComplete
                              ? "text-emerald-600 bg-emerald-50 border-emerald-200/50"
                              : "text-amber-600 bg-amber-50 border-amber-200/50"
                          }`}
                        >
                          {isComplete ? "Complete" : "Pending KLPCM"}
                        </span>
                      ) : (
                        <span className="text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                          Empty
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center flex justify-center">
                      <button
                        onClick={() => navigate({ to: "/srm" })}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                        title="View RME"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500 italic"
                  >
                    No medical records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
