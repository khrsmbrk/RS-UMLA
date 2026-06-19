import React, { useState, useMemo } from "react";
import {
  DoorOpen,
  Calendar,
  Clock,
  Users,
  Coffee,
  Plus,
  CheckCircle,
  Search,
  Filter,
  Monitor,
  ArrowUpRight,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeRoomBooking() {
  const [activeTab, setActiveTab] = useState("All Rooms");

  const storeBookings = useOfficeStore(state => state.roomBookings);
  const { addRoomBooking } = useOfficeStore();

  const rooms = [
    {
      name: "Aula Serbaguna Lt. 4",
      capacity: 100,
      features: ["Proyektor", "Sound System", "AC Sentral"],
      status: "Available",
    },
    {
      name: "Ruang Rapat Direksi Lt. 2",
      capacity: 15,
      features: ['Smart TV 65"', "Videoconf Eq.", "Kopi/Teh"],
      status: "Booked",
    },
    {
      name: "Ruang Rapat Komite Lt. 3",
      capacity: 25,
      features: ["Proyektor", "Whiteboard"],
      status: "Available",
    },
    {
      name: "Ruang Training Lt. 1",
      capacity: 40,
      features: ["Computers", "Smart Board"],
      status: "Maintenance",
    },
  ];

  const bookings = useMemo(() => [
    ...storeBookings.map((b: any) => ({
      room: b.room,
      title: b.purpose,
      time: b.time,
      host: "Internal",
      status: b.status,
    })),
    {
      room: "Ruang Rapat Direksi Lt. 2",
      title: "Rapat Evaluasi Keuangan Bulanan",
      time: "09:00 - 11:00",
      host: "Bagian Keuangan",
      status: "Approved",
    },
    {
      room: "Aula Serbaguna Lt. 4",
      title: "Orientasi Karyawan Baru Batch 2",
      time: "13:00 - 16:00",
      host: "Diklat / SDM",
      status: "Approved",
    },
  ], [storeBookings]);

  const handleBookRoom = () => {
    addRoomBooking({
      id: `RB-${Date.now()}`,
      room: "Ruang Rapat Direksi Lt. 2",
      date: new Date().toISOString().split('T')[0],
      time: "14:00 - 15:00",
      purpose: "Rapat Ekstra",
      status: "Approved"
    });
  };

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Room Booking
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage meeting rooms, auditoriums, and facilities
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button onClick={handleBookRoom} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Book Room
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <DoorOpen className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Rooms
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">12</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 2 New
              </span>
              <span className="text-slate-400">added this year</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Today's Bookings
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">8</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                4 Active
              </span>
              <span className="text-slate-400">currently ongoing</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Capacity Utilized
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">64%</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                average daily
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Equipment Requests
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">15</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-amber-500 font-medium flex items-center">
                2 Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-lg">Facilities</h3>
            </div>
            <div className="space-y-3 flex-1 overflow-y-auto pr-2 no-scrollbar">
              {rooms.map((r, i) => (
                <div
                  key={i}
                  className="p-4 border border-slate-100 rounded-xl hover:shadow-sm transition-shadow bg-slate-50/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 text-sm w-3/4 leading-snug">
                      {r.name}
                    </h4>
                    {r.status === "Available" ? (
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold">
                        Avail
                      </span>
                    ) : r.status === "Booked" ? (
                      <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold">
                        Booked
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold">
                        Maint.
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" />{" "}
                    {r.capacity} pax
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {r.features.map((f, j) => (
                      <span
                        key={j}
                        className="bg-white text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 shadow-sm"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex gap-2 flex-wrap">
                {["Today", "Tomorrow", "This Week", "My Bookings"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        activeTab === tab
                          ? "bg-teal-50 text-teal-700 shadow-sm"
                          : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
                />
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {bookings.length > 0 ? (
                bookings.map((b, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="bg-slate-50 p-3 rounded-xl flex-shrink-0 text-center min-w-[100px] border border-slate-100">
                      <div className="flex justify-center mb-1">
                        <Clock className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="font-bold text-sm text-slate-800">
                        {b.time}
                      </div>
                    </div>
                    <div className="flex-1 w-full text-center sm:text-left">
                      <h4 className="font-bold text-slate-800 text-base mb-1">
                        {b.title}
                      </h4>
                      <div className="text-sm font-medium text-slate-500 mb-3">
                        {b.room}
                      </div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> {b.host}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md">
                          {b.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Coffee className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="font-medium text-slate-500">
                    No bookings found for this period.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
