import React, { useState } from "react";
import {
  Briefcase,
  UserPlus,
  CheckSquare,
  Users,
  FileText,
  ChevronRight,
  CheckCircle,
  Search,
  Filter,
  CalendarDays,
  MoreVertical,
  PenTool,
} from "lucide-react";

export default function OfficeRecruitment() {
  const openJobs = [
    {
      id: "VAC-01",
      title: "Perawat Pelaksana IGD",
      type: "Full-time",
      quota: 5,
      applied: 24,
      status: "Urgent",
    },
    {
      id: "VAC-02",
      title: "Apoteker Klinis",
      type: "Full-time",
      quota: 2,
      applied: 12,
      status: "Active",
    },
    {
      id: "VAC-03",
      title: "Dokter Umum (Jaga Malam)",
      type: "Part-time",
      quota: 3,
      applied: 8,
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-indigo-600" /> E-Recruitment &
            Onboarding
          </h1>
          <p className="text-slate-500 mt-1">
            Applicant Tracking System (ATS) dan manajemen orientasi karyawan
            baru RS.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
            <Briefcase className="w-4 h-4" /> Buka Loker Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-lg">Lowongan Aktif</h3>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 text-xs font-black rounded">
              {openJobs.length} Posisi
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari posisi kerja..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-3">
            {openJobs.map((j, i) => (
              <div
                key={i}
                className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors pr-2">
                    {j.title}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-black px-2 py-0.5 rounded border shrink-0 ${j.status === "Urgent" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-slate-50 text-slate-600 border-slate-200"}`}
                  >
                    {j.status}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-500 mb-4">
                  {j.type} &bull; Tipe: Medis &bull; {j.id}
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-500" /> Kebutuhan:{" "}
                    {j.quota}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-500" />{" "}
                    Pelamar: {j.applied}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" /> Workflow
              Onboarding Orientasi
            </h3>
            <button className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 overflow-x-auto bg-slate-50/30 flex-1">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  {
                    name: "1. Dokumen",
                    icon: FileText,
                    color: "text-blue-500",
                  },
                  {
                    name: "2. TTD Kontrak",
                    icon: PenTool,
                    color: "text-amber-500",
                  },
                  {
                    name: "3. Diklat Orientasi",
                    icon: Users,
                    color: "text-purple-500",
                  },
                  {
                    name: "4. Aktif Bertugas",
                    icon: CheckCircle,
                    color: "text-emerald-500",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-2 ${step.color}`}
                    >
                      {/* Cannot use dynamic icon here easily without mapping differently, substitute generic icon if needed, or stick to number. We'll use index+1 */}
                      <span className="font-black text-sm">{i + 1}</span>
                    </div>
                    <div className="font-bold text-xs text-slate-600 text-center uppercase tracking-wider">
                      {step.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 relative">
                {/* Pipeline Line */}
                <div className="absolute top-0 bottom-0 left-[12.5%] w-0.5 bg-slate-200/50 -z-10"></div>
                <div className="absolute top-0 bottom-0 left-[37.5%] w-0.5 bg-slate-200/50 -z-10"></div>
                <div className="absolute top-0 bottom-0 left-[62.5%] w-0.5 bg-slate-200/50 -z-10"></div>
                <div className="absolute top-0 bottom-0 left-[87.5%] w-0.5 bg-slate-200/50 -z-10"></div>

                {[
                  {
                    name: "Dr. Sarah (Umum)",
                    step: 3,
                    role: "Medis",
                    date: "Mulai 21 Mei",
                  },
                  {
                    name: "Ns. Ratna (IGD)",
                    step: 4,
                    role: "Keperawatan",
                    date: "Mulai 15 Mei",
                  },
                  {
                    name: "Apt. Andi (Farmasi)",
                    step: 2,
                    role: "Farmasi",
                    date: "Mulai 24 Mei",
                  },
                ].map((person, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 relative">
                    {/* Horizontal connection line for this row ONLY if they reached step 2+ */}
                    {person.step > 1 && (
                      <div
                        className="absolute top-1/2 left-[12.5%] h-0.5 bg-blue-500 -z-0 -translate-y-1/2 transition-all duration-1000"
                        style={{ width: `${(person.step - 1) * 25}%` }}
                      ></div>
                    )}

                    {[1, 2, 3, 4].map((col) => (
                      <div
                        key={col}
                        className="flex justify-center relative z-10 w-full px-2"
                      >
                        {col === person.step && (
                          <div className="bg-white border-2 border-indigo-500 p-3 rounded-lg shadow-md w-full max-w-[150px] relative">
                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-indigo-500 rounded-full"></div>
                            <div
                              className="font-bold text-slate-800 text-sm truncate"
                              title={person.name}
                            >
                              {person.name}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 mt-0.5">
                              {person.role}
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded w-max">
                              <CalendarDays className="w-3 h-3" /> {person.date}
                            </div>
                          </div>
                        )}
                        {col < person.step && (
                          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg shadow-sm w-full max-w-[150px] flex items-center gap-2 opacity-80">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            <div className="font-bold text-slate-600 text-xs truncate blur-[0.5px]">
                              {person.name}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/50 border-t border-indigo-100 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                1
              </div>
              <div>
                <div className="text-sm font-bold text-indigo-900">
                  Jadwal Orientasi Kelas Baru
                </div>
                <div className="text-xs text-indigo-600 font-medium">
                  Pending: 15 Peserta
                </div>
              </div>
            </div>
            <button className="text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
              Atur Jadwal Diklat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
