import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BedDouble,
  Search,
  Filter,
  Database,
  Activity,
  Clock,
  Calendar,
  ArrowUpRight,
  Users,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeInpatient() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Wards");
  const [searchTerm, setSearchTerm] = useState("");

  const masterData = useSRMStore((state) => state.masterData);
  const patients = useSRMStore((state) => state.patients);
  const doctors = useSRMStore((state) => state.doctors);
  const rooms = masterData?.kamar || [];

  const totalBeds = rooms.length;
  const occupiedBeds = rooms.filter((r) => r.Status !== "Tersedia").length;
  const bedOccupancyRate =
    totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Generate dynamic inpatient mock list based on patients and unavailable rooms
  const activeInpatients = useMemo(() => {
    // We mock assigning random patients from DB to occupied rooms
    const active = [];
    const occupiedRooms = rooms.filter((r) => r.Status !== "Tersedia");

    occupiedRooms.forEach((r, i) => {
      const patient = patients[i % patients.length];
      const doc = doctors[i % doctors.length];
      if (patient) {
        // Mock admission Date
        const admitDate = new Date();
        admitDate.setDate(admitDate.getDate() - (i % 5));

        let status = "Observation";
        if (i % 4 === 0) status = "Critical";
        if (i % 3 === 0) status = "Discharge Pending";

        active.push({
          id: patient.id,
          name: patient.namaLengkap,
          ward: `${r["Kategori"] || "Ward"} - ${r["Nama Kamar"]}`,
          doctor: doc ? doc.nama : "Dr. On Call",
          admitted: admitDate.toLocaleDateString(),
          status: status,
        });
      }
    });

    return active;
  }, [rooms, patients, doctors]);

  const filteredPatients = useMemo(() => {
    return activeInpatients.filter((p) => {
      const searchMatch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ward.toLowerCase().includes(searchTerm.toLowerCase());

      let tabMatch = true;
      if (activeTab === "ICU/NICU")
        tabMatch = p.ward.includes("ICU") || p.ward.includes("NICU");
      else if (activeTab === "Maternity")
        tabMatch = p.ward.includes("Maternity");
      else if (activeTab === "Surgery") tabMatch = p.ward.includes("Surgery");

      return searchMatch && tabMatch;
    });
  }, [activeInpatients, searchTerm, activeTab]);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inpatient Care (Rawat Inap)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage ward admissions, bed occupancies, and inpatient flow.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/srm/rawat-inap")}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Database className="w-4 h-4 text-teal-100" /> Open in SRM
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Inpatients
              </h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] tracking-widest uppercase font-black">
              Simulated
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {activeInpatients.length}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> From SRM Beds
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Bed Occupancy
              </h3>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase ${bedOccupancyRate > 80 ? "text-rose-500 bg-rose-50 border border-rose-200" : "text-emerald-500 bg-emerald-50 border border-emerald-200"}`}
            >
              SRM
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {bedOccupancyRate}%
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                {totalBeds - occupiedBeds} beds available
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Critical Care
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {activeInpatients.filter((p) => p.status === "Critical").length}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Patients in critical state
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-400 text-sm">Discharges</h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {
                activeInpatients.filter((p) => p.status === "Discharge Pending")
                  .length
              }
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-teal-500 font-medium flex items-center">
                Pending finalization
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["All Wards", "ICU/NICU", "Maternity", "Surgery"].map((tab) => (
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
                placeholder="Search patient RM, Name or Ward..."
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
                  Patient Info
                </th>
                <th className="pb-3 px-4 font-medium">Ward / Bed</th>
                <th className="pb-3 px-4 font-medium">Attending Dr</th>
                <th className="pb-3 px-4 font-medium">Admitted Date</th>
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
                    <p className="font-bold text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">
                      {p.id}
                    </p>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">
                    {p.ward}
                  </td>
                  <td className="py-4 px-4 text-slate-600">{p.doctor}</td>
                  <td className="py-4 px-4 font-bold text-slate-700">
                    {p.admitted}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md border text-[11px] font-bold uppercase tracking-wider ${
                        p.status === "Observation"
                          ? "text-slate-600 bg-slate-100 border-slate-200/50"
                          : p.status === "Critical"
                            ? "text-rose-600 bg-rose-50 border-rose-200/50"
                            : p.status === "Discharge Pending"
                              ? "text-blue-600 bg-blue-50 border-blue-200/50"
                              : "text-emerald-600 bg-emerald-50 border-emerald-200/50"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => navigate("/srm/rawat-inap")}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Process in SRM
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
                    No inpatients found.
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
