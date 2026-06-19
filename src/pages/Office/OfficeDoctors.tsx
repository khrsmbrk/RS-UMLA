import React, { useState, useMemo } from "react";
import { useNavigate } from '@tanstack/react-router';
import {
  Search,
  Plus,
  User,
  Briefcase,
  Award,
  ArrowUpRight,
  Database,
  MoreHorizontal,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeDoctors() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = useSRMStore((state) => state.doctors);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((p) => {
      const matchesSearch =
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;
      if (
        activeTab !== "All" &&
        activeTab === "Specialists" &&
        p.spesialisasi === "Umum"
      )
        return false;
      if (
        activeTab !== "All" &&
        activeTab === "General" &&
        p.spesialisasi !== "Umum"
      )
        return false;
      return true;
    });
  }, [doctors, searchTerm, activeTab]);

  const totalDoctors = doctors.length;
  const specialistsCount = doctors.filter(
    (d) => d.spesialisasi !== "Umum",
  ).length;
  const generalCount = doctors.filter((d) => d.spesialisasi === "Umum").length;

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Doctors & Staff
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage medical professionals and hospital staff
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/srm/jadwal-dokter" })}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors"
          >
            <Database className="w-4 h-4 text-emerald-600" /> Open in SRM
          </button>
          <button
            onClick={() => navigate({ to: "/srm/jadwal-dokter" })}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Staff
              </h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">
              Real-time
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {totalDoctors}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> Synchronized
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Active Doctors
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {totalDoctors}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                General Practitioners
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {generalCount}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Specialists
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {specialistsCount}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            {["All", "Specialists", "General"].map((tab) => (
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
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 px-4 font-medium">Name & Role</th>
                <th className="pb-3 px-4 font-medium">Department</th>
                <th className="pb-3 px-4 font-medium">Contact</th>
                <th className="pb-3 px-4 font-medium text-center">Status</th>
                <th className="pb-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDoctors.map((staff, i) => (
                <tr
                  key={staff.id}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center shadow-sm shrink-0 border border-teal-200/50">
                        {staff.nama.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{staff.nama}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {staff.spesialisasi === "Umum"
                            ? "General Practitioner"
                            : "Specialist"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      {staff.spesialisasi}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-500">
                    {staff.id.toLowerCase()}@rsudxyz.com
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-600 bg-emerald-50">
                      On Duty
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mx-auto transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDoctors.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500 italic"
                  >
                    No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
          <p className="text-xs text-slate-500">
            Showing {filteredDoctors.length} entries out of {totalDoctors}
          </p>
        </div>
      </div>
    </div>
  );
}
