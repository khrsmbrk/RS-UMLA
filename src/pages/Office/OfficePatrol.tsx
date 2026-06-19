import React, { useState, useMemo } from "react";
import {
  AlertCircle,
  Search,
  Activity,
  Camera,
  Download,
  Filter,
  MapPin,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficePatrol() {
  const [activeTab, setActiveTab] = useState("Today");

  const storePatrols = useOfficeStore(state => state.patrols);
  const { addPatrol } = useOfficeStore();

  const handleScanQR = () => {
    addPatrol({
      id: `PTR-${Date.now()}`,
      area: "Central Pharmacy",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      officer: "Anda",
      status: "Aman",
      notes: ""
    });
  };

  const patrolTasks = useMemo(() => [
    ...storePatrols.map((p: any) => ({
      loc: p.area,
      status: p.status === "Aman" ? "Completed" : "Pending",
      time: p.time,
      by: p.officer,
    })),
    {
      loc: "Basement Parking",
      status: "Completed",
      time: "08:15",
      by: "Andi (Sec)",
    },
    {
      loc: "ER & Waiting Room",
      status: "Completed",
      time: "09:30",
      by: "Andi (Sec)",
    },
    { loc: "Central Pharmacy", status: "Pending", time: "-", by: "-" },
    { loc: "Power Generator Room", status: "Pending", time: "-", by: "-" },
  ], [storePatrols]);

  const safetyLogs = [
    {
      loc: "VIP Clinic Restroom",
      desc: "Hand rub empty, sink leaking",
      date: "Today 10:15",
      reporter: "PPI-01",
      risk: "Low",
      status: "Open",
    },
    {
      loc: "Surgery Corridor",
      desc: "Infectious waste bin cover damaged",
      date: "Yesterday 14:20",
      reporter: "K3-04",
      risk: "High",
      status: "Pending",
    },
    {
      loc: "ICU Entrance",
      desc: "Slippery floor without warning sign",
      date: "Yesterday 09:00",
      reporter: "Sec-02",
      risk: "Medium",
      status: "Resolved",
    },
  ];

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Security & Safety Patrol
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            QR scanning, facility inspection, and monitoring logs
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" /> Download Report
          </button>
          <button onClick={handleScanQR} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Camera className="w-4 h-4" /> Scan QR
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats & Patrol Duties */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-50 rounded-full opacity-50"></div>
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-6 relative z-10">
              <Activity className="w-5 h-5 text-teal-600" /> Daily Inspection
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-slate-800">24</div>
                <div className="text-xs font-bold text-slate-500 mt-1">
                  Patrol Points
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-amber-600">3</div>
                <div className="text-xs font-bold text-amber-700 mt-1">
                  Issues Found
                </div>
              </div>
            </div>

            <h4 className="font-bold text-slate-800 text-sm mb-4">
              Your Active Shift Duties
            </h4>
            <div className="space-y-3 flex-1 overflow-y-auto pr-1 no-scrollbar">
              {patrolTasks.map((t, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${t.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
                    >
                      {t.status === "Completed" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800 mb-0.5">
                        {t.loc}
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        {t.status === "Completed"
                          ? `Checked ${t.time} by ${t.by}`
                          : "Pending visit"}
                      </div>
                    </div>
                  </div>
                  {t.status === "Pending" && (
                    <button className="text-teal-600 border border-teal-200 bg-teal-50 hover:bg-teal-100 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors">
                      Start
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Logs */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex gap-2 flex-wrap">
                {["Today", "Critical Risk", "Resolved", "All Logs"].map(
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
                  placeholder="Search logs..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-shadow"
                />
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {safetyLogs.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all bg-white group"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          item.risk === "High"
                            ? "bg-rose-50 text-rose-600"
                            : item.risk === "Medium"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base leading-none">
                          {item.loc}
                        </h4>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {item.date} by {item.reporter}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md ${
                          item.risk === "High"
                            ? "bg-rose-50 text-rose-700 border border-rose-100"
                            : item.risk === "Medium"
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : "bg-slate-50 text-slate-600 border border-slate-200"
                        }`}
                      >
                        Risk: {item.risk}
                      </span>
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md ${
                          item.status === "Resolved"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : item.status === "Open"
                              ? "bg-blue-50 text-blue-600 border border-blue-100"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
                    {item.desc}
                  </p>
                  <div className="flex justify-end">
                    <button className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1.5">
                      View Attachments <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
