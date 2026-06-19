import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertOctagon,
  Search,
  Filter,
  Database,
  Users,
  Plus,
  Activity,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeEmergency() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Patients");
  const [searchTerm, setSearchTerm] = useState("");

  const patients = useSRMStore((state) => state.patients);

  const erPatients = useMemo(() => {
    return patients.slice(0, 8).map((p, i) => {
      let triage = "Green";
      let complaint = "Minor Laceration";
      let status = "Waiting";
      if (i % 5 === 0) {
        triage = "Red";
        complaint = "Cardiac Arrest";
        status = "Resuscitation";
      } else if (i % 2 === 0) {
        triage = "Yellow";
        complaint = "Severe Asthma";
        status = "Observation";
      }

      // Mock arrival time
      const date = new Date();
      date.setMinutes(date.getMinutes() - (i * 15 + 10));

      return {
        triage,
        id: p.id,
        name: p.namaLengkap,
        complaint,
        time: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status,
      };
    });
  }, [patients]);

  const filteredPatients = useMemo(() => {
    return erPatients.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());

      let tabMatch = true;
      if (activeTab.includes("Red")) tabMatch = p.triage === "Red";
      if (activeTab.includes("Yellow")) tabMatch = p.triage === "Yellow";
      if (activeTab.includes("Green")) tabMatch = p.triage === "Green";

      return matchSearch && tabMatch;
    });
  }, [erPatients, activeTab, searchTerm]);

  const countRed = erPatients.filter((p) => p.triage === "Red").length;
  const countYellow = erPatients.filter((p) => p.triage === "Yellow").length;
  const countGreen = erPatients.filter((p) => p.triage === "Green").length;

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Emergency Dept (IGD)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage emergency triage, active cases, and critical care.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/srm/igd")}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Database className="w-4 h-4 text-rose-100" /> Open in SRM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-rose-700 text-sm">
                Resuscitation (P1)
              </h3>
            </div>
            <span className="bg-rose-200 text-rose-700 px-2 py-0.5 rounded text-[10px] tracking-widest uppercase font-black">
              LIVE
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-rose-800 mt-2">
              {countRed}
            </div>
            <div className="text-xs font-semibold text-rose-600 mt-2">
              Immediate Attention
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-amber-700 text-sm">Urgent (P2)</h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-800 mt-2">
              {countYellow}
            </div>
            <div className="text-xs font-semibold text-amber-600 mt-2">
              Wait time {"<"} 30m
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-emerald-700 text-sm">
                Less Urgent (P3)
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-800 mt-2">
              {countGreen}
            </div>
            <div className="text-xs font-semibold text-emerald-600 mt-2">
              Wait time {"<"} 120m
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Today
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {erPatients.length}
            </div>
            <div className="text-xs font-medium text-slate-400 mt-2">
              Total active cases
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["All Patients", "Red Zone", "Yellow Zone", "Green Zone"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab
                      ? "bg-slate-800 text-white shadow-sm"
                      : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient RM or Name..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500/50 shadow-sm transition-shadow"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            </div>
            <button className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 px-4 font-medium w-24">Triage</th>
                <th className="pb-3 px-4 font-medium min-w-[200px]">
                  Patient Info
                </th>
                <th className="pb-3 px-4 font-medium">Chief Complaint</th>
                <th className="pb-3 px-4 font-medium">Arrival Time</th>
                <th className="pb-3 px-4 font-medium text-center">Status</th>
                <th className="pb-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPatients.map((p, i) => (
                <tr
                  key={p.id || i}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span
                      className={`w-3 h-3 rounded-full inline-block mr-2 shadow-sm ${
                        p.triage === "Red"
                          ? "bg-rose-500 shadow-rose-500/30"
                          : p.triage === "Yellow"
                            ? "bg-amber-500 shadow-amber-500/30"
                            : "bg-emerald-500 shadow-emerald-500/30"
                      }`}
                    ></span>
                    <span className="font-bold text-xs uppercase text-slate-600 tracking-wider mix-blend-multiply">
                      {p.triage}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">
                      {p.id}
                    </p>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-700">
                    {p.complaint}
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    {p.time}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                        p.status === "Resuscitation"
                          ? "text-rose-600 bg-rose-50 border-rose-200/50"
                          : p.status === "Observation"
                            ? "text-slate-600 bg-slate-100 border-slate-200/50"
                            : "text-blue-600 bg-blue-50 border-blue-200/50"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => navigate("/srm/igd")}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 border border-rose-200 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 mx-auto"
                    >
                      SRM <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
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
      </div>
    </div>
  );
}
