import React, { useState } from "react";
import { Search, Users as UsersIcon } from "lucide-react";
import { EMPLOYEES } from "../../data/employees";
import { getFilteredEmployees } from "../../utils/filters";
import QrAttendanceModule from "../../components/QrAttendanceModule";
import EmployeeQrGenerator from "../../components/EmployeeQrGenerator";
import EmployeeTable from "../../components/EmployeeTable";
import StatsCards from "../../components/StatsCards";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeHRD() {
  const [activeModule, setActiveModule] = useState("karyawan");
  const [divisiFilter, setDivisiFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const { userRole } = useOfficeStore();

  // Create a mock session object for components that need it
  const session = {
    role: ["wadir_admin", "direktur", "bph", "kasubag_data"].includes(
      userRole || "",
    )
      ? "management"
      : "staff",
    name: "Admin HRD / SDM",
  };

  const filteredEmployees = getFilteredEmployees(
    EMPLOYEES,
    divisiFilter,
    searchQuery,
    session,
  );

  return (
    <div className="font-sans text-slate-800 space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Human Resources (HRD)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage personnel data, QR attendance, and staff directory.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveModule("karyawan")}
          className={`px-5 py-2 text-sm rounded-xl font-bold transition-all ${
            activeModule === "karyawan"
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-white text-slate-500 border border-slate-200/60 hover:bg-slate-50 hover:text-slate-700 shadow-sm"
          }`}
        >
          Employee Data
        </button>
        <button
          onClick={() => setActiveModule("absensi")}
          className={`px-5 py-2 text-sm rounded-xl font-bold transition-all ${
            activeModule === "absensi"
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-white text-slate-500 border border-slate-200/60 hover:bg-slate-50 hover:text-slate-700 shadow-sm"
          }`}
        >
          QR Attendance
        </button>
        <button
          onClick={() => setActiveModule("qr_generator")}
          className={`px-5 py-2 text-sm rounded-xl font-bold transition-all ${
            activeModule === "qr_generator"
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-white text-slate-500 border border-slate-200/60 hover:bg-slate-50 hover:text-slate-700 shadow-sm"
          }`}
        >
          ID Cards & QR
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm min-h-[500px]">
        {activeModule === "karyawan" && (
          <div className="space-y-6">
            <StatsCards employees={filteredEmployees} user={session} />

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <div className="flex items-center w-full md:w-1/2 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-teal-500/50 focus:outline-none transition-all shadow-sm"
                />
              </div>
              <div className="w-full md:w-auto">
                <select
                  value={divisiFilter}
                  onChange={(e) => setDivisiFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 font-medium text-slate-700 text-sm rounded-xl focus:ring-teal-500 focus:border-teal-500 py-2.5 px-4 outline-none transition-all shadow-sm"
                >
                  <option value="semua">All Divisions</option>
                  <option value="puncak">Executive</option>
                  <option value="medis">Medical</option>
                  <option value="keperawatan">Nursing</option>
                  <option value="operasional">Operations</option>
                </select>
              </div>
            </div>

            <EmployeeTable employees={filteredEmployees} />
          </div>
        )}

        {activeModule === "absensi" && (
          <div className="py-4">
            <QrAttendanceModule user={session} />
          </div>
        )}

        {activeModule === "qr_generator" && (
          <div className="py-4">
            <EmployeeQrGenerator />
          </div>
        )}
      </div>
    </div>
  );
}
