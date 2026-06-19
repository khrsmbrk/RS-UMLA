import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  Database,
  Stethoscope,
  Clock,
  Calendar,
  ArrowUpRight,
  Activity,
  User,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeOutpatient() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Hari Ini");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [diagText, setDiagText] = useState("");
  const [terapiText, setTerapiText] = useState("");

  const visits = useSRMStore((state) => state.visits);
  const updateVisit = useSRMStore((state) => state.updateVisit);
  const patients = useSRMStore((state) => state.patients);
  const doctors = useSRMStore((state) => state.doctors);
  const masterData = useSRMStore((state) => state.masterData);

  const activeClinics = masterData?.poliklinik?.length || 0;

  const handleSaveRME = () => {
    if (!selectedVisit) return;
    updateVisit(selectedVisit.id, {
      diagnosis: diagText,
      terapi: terapiText,
      status: "Selesai"
    });
    setSelectedVisit(null);
    setDiagText("");
    setTerapiText("");
  };

  // Simulate "today" visits based on some arbitrary active logic
  // For the sake of UI, we will just show non-finished visits or current date visits
  const filteredVisits = useMemo(() => {
    return visits
      .map((v) => {
        const px = patients.find((p) => p.id === v.patientId);
        const doc = doctors.find((d) => d.id === v.dokterId);
        return {
          ...v,
          patientName: px?.namaLengkap || "Unknown Patient",
          mrn: px?.id || "N/A",
          doctorName: doc?.nama || "Unknown Doctor",
          clinicName: doc?.spesialisasi
            ? `Poli ${doc.spesialisasi}`
            : "Poliklinik",
        };
      })
      .filter((v) => {
        const matchSearch =
          v.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.mrn.toLowerCase().includes(searchTerm.toLowerCase());

        let tabMatch = true;
        if (activeTab === "Hari Ini") {
          tabMatch = v.status !== "Selesai";
        } else if (activeTab === "Selesai") {
          tabMatch = v.status === "Selesai";
        } else {
          tabMatch = true; // Semua
        }

        return matchSearch && tabMatch;
      })
      .sort(
        (a, b) =>
          new Date(b.tanggalKunjungan).getTime() -
          new Date(a.tanggalKunjungan).getTime(),
      );
  }, [visits, patients, doctors, searchTerm, activeTab]);

  const activeCount = visits.filter((v) => v.status !== "Selesai").length;
  const bookedTomorrow = 45; // Static mock for tomorrow bookings

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Outpatient Clinics (Rawat Jalan)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage polyclinics, daily bookings, and outpatient flow.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/srm/rawat-jalan")}
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
                Active Visits
              </h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-widest">
              SRM
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {activeCount}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-400">waiting or in-consultation</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Active Clinics
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {activeClinics}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                poliklinik
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Avg. Wait Time
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">24m</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                -4m
              </span>
              <span className="text-slate-400">vs target (30m)</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-400 text-sm">
                Online Bookings
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white mt-2">
              {bookedTomorrow}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-teal-400 font-medium flex items-center">
                Tomorrow's schedule
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["Hari Ini", "Selesai", "Semua Data"].map((tab) => (
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
                placeholder="Search patient RM or Name..."
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
                <th className="pb-3 px-4 font-medium">Clinic</th>
                <th className="pb-3 px-4 font-medium">Doctor</th>
                <th className="pb-3 px-4 font-medium">Schedule</th>
                <th className="pb-3 px-4 font-medium text-center">Status</th>
                <th className="pb-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredVisits.map((v, i) => (
                <tr
                  key={v.id || i}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">{v.patientName}</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">
                      {v.mrn}
                    </p>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">
                    {v.clinicName}
                  </td>
                  <td className="py-4 px-4 text-slate-600">{v.doctorName}</td>
                  <td className="py-4 px-4 font-bold text-slate-700">
                    {new Date(v.tanggalKunjungan).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md border text-[11px] font-bold uppercase tracking-wider ${
                        v.status === "Menunggu"
                          ? "text-rose-600 bg-rose-50 border-rose-200/50"
                          : v.status === "Diperiksa"
                            ? "text-amber-600 bg-amber-50 border-amber-200/50"
                            : "text-emerald-600 bg-emerald-50 border-emerald-200/50"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedVisit(v);
                        setDiagText(v.diagnosis || "");
                        setTerapiText(v.terapi || "");
                      }}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {v.status === "Selesai" ? "Edit RME" : "Isi RME"}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredVisits.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <User className="w-10 h-10 text-slate-300 mb-3" />
                      <p>No visits found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-black text-slate-800">
                Isi Rekam Medis - {selectedVisit.patientName}
              </h2>
              <p className="text-sm text-slate-500">Poli: {selectedVisit.clinicName}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Diagnosis</label>
                <textarea
                  value={diagText}
                  onChange={(e) => setDiagText(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  rows={3}
                  placeholder="Masukkan diagnosis kerja..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Terapi / Tindakan</label>
                <textarea
                  value={terapiText}
                  onChange={(e) => setTerapiText(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  rows={3}
                  placeholder="Masukkan rencana terapi..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
              <button
                onClick={() => setSelectedVisit(null)}
                className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveRME}
                className="px-4 py-2 font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors"
              >
                Simpan & Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
