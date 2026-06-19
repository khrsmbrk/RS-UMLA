import React, { useState, useMemo } from "react";
import {
  BedDouble,
  MoveRight,
  Users,
  CheckCircle,
  Search,
  LogOut,
  ArrowRightLeft,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeBedManagement() {
  const patients = useSRMStore((state) => state.patients);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeWard, setActiveWard] = useState("All Wards");

  // Generate bed data based on patients for demonstration
  const beds = useMemo(() => {
    const list = [];
    const wards = [
      "Melati (VIP)",
      "Mawar (Kelas 1)",
      "Anggrek (Kelas 2)",
      "Dahlia (Kelas 3)",
    ];

    // First fill with assigned beds
    patients.slice(0, 15).forEach((p, i) => {
      const ward = wards[i % wards.length];
      list.push({
        id: `B${ward.substring(0, 2).toUpperCase()}-${101 + i}`,
        ward,
        patient: p.namaLengkap,
        rm: p.id,
        status: "Occupied",
        admittedAt: "2026-06-10",
      });
    });

    // Add empty beds
    for (let i = 0; i < 15; i++) {
      const ward = wards[i % wards.length];
      list.push({
        id: `B${ward.substring(0, 2).toUpperCase()}-${201 + i}`,
        ward,
        patient: null,
        rm: null,
        status: "Available",
        admittedAt: null,
      });
    }

    // Add some in maintenance/cleaning
    list.push({
      id: `BMEL-301`,
      ward: "Melati (VIP)",
      patient: null,
      rm: null,
      status: "Cleaning",
      admittedAt: null,
    });
    list.push({
      id: `BDAH-302`,
      ward: "Dahlia (Kelas 3)",
      patient: null,
      rm: null,
      status: "Maintenance",
      admittedAt: null,
    });

    return list.sort((a, b) => a.id.localeCompare(b.id));
  }, [patients]);

  const filteredBeds = useMemo(() => {
    return beds.filter((bed) => {
      const matchSearch =
        bed.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bed.patient &&
          bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchWard = activeWard === "All Wards" || bed.ward === activeWard;
      return matchSearch && matchWard;
    });
  }, [beds, searchTerm, activeWard]);

  const stats = useMemo(() => {
    return {
      total: beds.length,
      available: beds.filter((b) => b.status === "Available").length,
      occupied: beds.filter((b) => b.status === "Occupied").length,
      cleaning: beds.filter(
        (b) => b.status === "Cleaning" || b.status === "Maintenance",
      ).length,
    };
  }, [beds]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <BedDouble className="w-6 h-6 text-blue-600" /> Bed Management
            Center
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Pusat kendali ketersediaan TT rawat inap, mutasi pasien, dan
            antiloket IGD.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Total TT
          </div>
          <div className="text-3xl font-black text-slate-800">
            {stats.total}
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">
            Available
          </div>
          <div className="text-3xl font-black text-emerald-700">
            {stats.available}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
            Occupied
          </div>
          <div className="text-3xl font-black text-blue-700">
            {stats.occupied}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">
            Cleaning/Maint.
          </div>
          <div className="text-3xl font-black text-amber-700">
            {stats.cleaning}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <div className="flex gap-2">
            {[
              "All Wards",
              "Melati (VIP)",
              "Mawar (Kelas 1)",
              "Anggrek (Kelas 2)",
              "Dahlia (Kelas 3)",
            ].map((w) => (
              <button
                key={w}
                onClick={() => setActiveWard(w)}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors border ${activeWard === w ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
              >
                {w}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari bed, pasien..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            />
          </div>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBeds.map((bed) => (
            <div
              key={bed.id}
              className={`p-4 rounded-xl border ${bed.status === "Occupied" ? "bg-blue-50/50 border-blue-100" : bed.status === "Available" ? "bg-emerald-50/50 border-emerald-100" : "bg-amber-50/50 border-amber-100"}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-800 text-sm">
                  {bed.id}
                </span>
                <span
                  className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded border ${bed.status === "Occupied" ? "bg-blue-100 text-blue-700 border-blue-200" : bed.status === "Available" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200"}`}
                >
                  {bed.status}
                </span>
              </div>
              <div className="text-xs text-slate-500 mb-3">{bed.ward}</div>

              {bed.status === "Occupied" ? (
                <div className="bg-white rounded border border-blue-50 p-2 shadow-sm text-sm">
                  <div className="font-bold text-slate-700 truncate">
                    {bed.patient}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{bed.rm}</div>
                  <div className="text-xs text-slate-400 mt-2 flex justify-between">
                    <span>In: {bed.admittedAt}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1">
                      <ArrowRightLeft className="w-3 h-3" /> Pindah
                    </button>
                    <button className="flex-1 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1">
                      <LogOut className="w-3 h-3" /> Pulang
                    </button>
                  </div>
                </div>
              ) : bed.status === "Available" ? (
                <div className="h-[96px] border border-dashed border-emerald-200 rounded flex items-center justify-center bg-white/50 text-emerald-500/50 hover:bg-white transition-colors cursor-pointer">
                  <span className="text-xs font-bold flex items-center gap-1">
                    <Users className="w-4 h-4" /> Admisi Pasien
                  </span>
                </div>
              ) : (
                <div className="h-[96px] border border-dashed border-amber-200 rounded flex items-center justify-center bg-white/50 text-amber-500/50">
                  <span className="text-xs font-bold text-center px-4">
                    Tidak Dapat Digunakan
                  </span>
                </div>
              )}
            </div>
          ))}
          {filteredBeds.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 italic">
              Tidak ada bed yang sesuai dengan pencarian atau filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
