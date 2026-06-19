import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  DoorOpen,
  BedDouble,
  CheckCircle2,
  XCircle,
  Users,
  Activity,
  Bed,
  FileText,
  ArrowUpRight,
  Database,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeRoom() {
  const [activeTab, setActiveTab] = useState("All Rooms");
  const [searchTerm, setSearchTerm] = useState("");

  const masterData = useSRMStore((state) => state.masterData);
  const rooms = masterData.kamar || [];

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const nameMatch = (room["Nama Kamar"] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const typeMatch = (room["Kategori"] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (!nameMatch && !typeMatch) return false;

      if (activeTab !== "All Rooms" && room["Kategori"] !== activeTab) {
        // Simple mapping, if activeTab is VIP/VVIP etc
        if (activeTab === "VIP" && !room["Kategori"].includes("VIP"))
          return false;
        if (activeTab !== "VIP" && room["Kategori"] !== activeTab) return false; // This is a bit strict but okay for demo
      }

      return true;
    });
  }, [rooms, searchTerm, activeTab]);

  const totalBeds = rooms.length; // Assuming each entry is 1 bed for simplicity, or we can just say total rooms.
  const availableBeds = rooms.filter((r) => r.Status === "Tersedia").length;
  const occupiedBeds = totalBeds - availableBeds;
  const occupancyRate =
    totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            IPD & Bed Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage admissions, bed allocation, and ward occupancy
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Room
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">Total Beds</h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">
              Real-time
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {totalBeds}
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
              <Users className="w-5 h-5 text-rose-400" />
              <h3 className="font-medium text-slate-500 text-sm">Occupied</h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {occupiedBeds}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-400 font-medium flex items-center">
                beds in use
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-medium text-slate-500 text-sm">Available</h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {availableBeds}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                ready to use
              </span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Occupancy Rate
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {occupancyRate}%
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                current capacity
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["All Rooms", "VIP", "VVIP", "Kelas 1", "Kelas 2", "Kelas 3"].map(
              (tab) => (
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
              ),
            )}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by room name or ward..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1 pr-1">
          {filteredRooms.map((room, i) => (
            <div
              key={room.id || i}
              className="p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:shadow-md transition-shadow group bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <DoorOpen className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
                    {room["Nama Kamar"]}
                  </h3>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mt-1">
                    {room["Kategori"]}
                  </p>
                </div>
                {room.Status === "Tersedia" ? (
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-200/50 text-[10px] font-black uppercase tracking-widest">
                    Avail
                  </span>
                ) : (
                  <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-200/50 text-[10px] font-black uppercase tracking-widest">
                    Full
                  </span>
                )}
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <BedDouble className="w-4 h-4 text-slate-400" /> Beds
                  </span>
                  <span className="font-bold text-slate-700">
                    {room.Status === "Tersedia" ? "0 / 1" : "1 / 1"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${room.Status === "Tersedia" ? "bg-emerald-500" : "bg-rose-500"}`}
                    style={{
                      width: `${room.Status === "Tersedia" ? 0 : 100}%`,
                    }}
                  ></div>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-600">
                    Rp {parseInt(room["Harga/Malam"]).toLocaleString("id-ID")}
                    /day
                  </span>
                  <button className="text-teal-600 hover:text-teal-700 text-xs font-bold">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredRooms.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 flex flex-col items-center">
              <Bed className="w-12 h-12 text-slate-300 mb-3" />
              <p>No rooms found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
