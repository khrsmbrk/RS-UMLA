import React, { useState, useMemo } from "react";
import { useNavigate } from '@tanstack/react-router';
import {
  Layers,
  Search,
  Filter,
  Plus,
  FileImage,
  Upload,
  Activity,
  AlertTriangle,
  Eye,
  Clock,
  CheckCircle2,
  Database,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeRadiologyAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending Scans");
  const [searchTerm, setSearchTerm] = useState("");

  const patients = useSRMStore((state) => state.patients);

  const scans = useMemo(() => {
    return patients.slice(0, 10).map((p, i) => {
      let status = "Pending Scan";
      let priority = "Routine";
      let modality = "Chest X-Ray";

      if (i % 3 === 0) {
        status = "Completed";
        priority = "Routine";
        modality = "CT Abdomen";
      } else if (i % 2 === 0) {
        status = "Awaiting Result";
        priority = "Urgent";
        modality = "MRI Brain w/ Contrast";
      }

      return {
        name: p.namaLengkap,
        rm: p.id,
        modality,
        physician: "Dr. Radiology Dept",
        priority,
        status,
      };
    });
  }, [patients]);

  const filteredScans = useMemo(() => {
    return scans.filter((scan) => {
      const matchSearch =
        scan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scan.rm.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTab =
        (activeTab === "Pending Scans" && scan.status === "Pending Scan") ||
        (activeTab === "Awaiting Results" &&
          scan.status === "Awaiting Result") ||
        (activeTab === "Completed" && scan.status === "Completed");
      return matchSearch && matchTab;
    });
  }, [scans, activeTab, searchTerm]);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" /> Radiology & Imaging
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage scan queue, upload radiology images, and process results
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/srm/radiologi" })}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Database className="w-4 h-4 text-indigo-100" /> Open SRM Radiologi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Workspace Column */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm min-h-[500px] flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {["Pending Scans", "Awaiting Results", "Completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Patient RM..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm transition-shadow"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-[10px] font-bold">
                  <th className="pb-3">Patient / ID</th>
                  <th className="pb-3">Modality</th>
                  <th className="pb-3">Physician</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredScans.map((scan, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3">
                      <p className="font-bold text-slate-800">{scan.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{scan.rm}</p>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <FileImage className="w-4 h-4 text-indigo-400" />
                        <span className="font-medium text-slate-600 font-mono text-xs">
                          {scan.modality}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-500 font-medium text-xs">
                      {scan.physician}
                    </td>
                    <td className="py-3">
                      {scan.priority === "Urgent" ? (
                        <span className="text-rose-500 font-bold text-xs flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Urgent
                        </span>
                      ) : (
                        <span className="text-slate-500 font-bold text-xs">
                          Routine
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          scan.status === "Pending Scan"
                            ? "bg-amber-50 text-amber-600"
                            : scan.status === "Awaiting Result"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {scan.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <button className="w-7 h-7 rounded bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center text-indigo-600 mx-auto transition-colors">
                        {scan.status === "Completed" ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Empty State Fallback if list is empty based on filter */}
                {filteredScans.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-slate-400 text-sm"
                    >
                      Select a different tab to view items.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Status Column */}
        <div className="space-y-6 flex flex-col">
          {/* Quick Metrics */}
          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-300">
              <Activity className="w-5 h-5" /> Radiology Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="text-sm text-slate-400">
                  Total Requests Today
                </span>
                <span className="text-xl font-bold">45</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="text-sm text-slate-400">
                  In Progress / Scanning
                </span>
                <span className="text-xl font-bold text-amber-400">12</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="text-sm text-slate-400">
                  Waiting for Report
                </span>
                <span className="text-xl font-bold text-blue-400">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">
                  Reports Finalized
                </span>
                <span className="text-xl font-bold text-emerald-400">25</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex-1">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" /> Recent Uploads
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "X-Ray Pelvis - RM-8492",
                  time: "10 min ago",
                  size: "24 MB",
                },
                {
                  name: "MRI Brain - RM-7721",
                  time: "45 min ago",
                  size: "450 MB",
                },
                {
                  name: "USG Abdomen - RM-3312",
                  time: "1 hour ago",
                  size: "12 MB",
                },
              ].map((doc, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="bg-white p-2 rounded shadow-sm border border-slate-200">
                    <FileImage className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      {doc.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {doc.time} • {doc.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
