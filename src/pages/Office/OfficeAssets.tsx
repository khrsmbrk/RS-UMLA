import React, { useState, useMemo } from "react";
import {
  Settings,
  PenTool,
  Calendar,
  AlertCircle,
  Search,
  QrCode,
  ClipboardCheck,
  ArrowRight,
  ShieldCheck,
  Database,
  Filter,
  Plus,
  Monitor,
  ArrowUpRight,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useOfficeStore } from "./store/officeStore";

export default function OfficeAssets() {
  const [activeTab, setActiveTab] = useState("All Assets");
  const [searchTerm, setSearchTerm] = useState("");

  const storeAssets = useOfficeStore(state => state.assets);

  const assets = useMemo(() => [
    ...storeAssets.map(a => ({
      id: a.id,
      name: a.name,
      loc: a.loc,
      category: a.category,
      lastPM: a.lastPM,
      nextPM: "Pending Schedule",
      status: a.status === "Active" ? "Optimal" : a.status
    })),
    {
      id: "MED-CT-02",
      name: "CT Scan GE 128 Slice",
      loc: "Instalasi Radiologi",
      category: "Medical",
      lastPM: "05 Jan 2026",
      nextPM: "05 Jun 2026",
      status: "Perlu Kalibrasi",
    },
    {
      id: "MED-VR-10",
      name: "Ventilator Hamilton-C1",
      loc: "ICU Bed 4",
      category: "Medical",
      lastPM: "15 Mar 2026",
      nextPM: "15 Sep 2026",
      status: "Optimal",
    }
  ], [storeAssets]);

  const filteredAssets = useMemo(() => {
     let filtered = assets;
     if (activeTab !== "All Assets") {
         filtered = filtered.filter(a => a.category === activeTab);
     }
     if (searchTerm) {
         filtered = filtered.filter(a => 
             a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             a.id.toLowerCase().includes(searchTerm.toLowerCase())
         )
     }
     return filtered;
  }, [assets, activeTab, searchTerm]);


  const data = [
    { name: "Optimal", value: 85 },
    { name: "Perlu Maintenance", value: 10 },
    { name: "Rusak / Perbaikan", value: 5 },
  ];
  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Assets & Maintenance
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage hospital inventory, calibrations, and lifecycles
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <QrCode className="w-4 h-4" /> Scan Asset
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Assets
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">1,542</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 2%
              </span>
              <span className="text-slate-400">new this year</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Active & Healthy
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">85%</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                Target: 90%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Maintenance Due
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">15</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-amber-500 font-medium flex items-center">
                Requires attention
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-rose-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Under Repair
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">3</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Awaiting vendor
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              {["All Assets", "Medical", "IT", "Facilities"].map((tab) => (
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
              ))}
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search asset ID..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-shadow"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                  <th className="px-6 py-4 font-medium">Asset Details</th>
                  <th className="px-6 py-4 font-medium">Last PM</th>
                  <th className="px-6 py-4 font-medium">Next Due</th>
                  <th className="px-6 py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAssets.map((a, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 text-base mb-1">
                        {a.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">
                          {a.id}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest bg-slate-100 px-2 rounded-md">
                          {a.loc}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {a.lastPM}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />{" "}
                        {a.nextPM}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border ${
                          a.status === "Optimal"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
                 {filteredAssets.length === 0 && (
                     <tr>
                         <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No assets found.</td>
                     </tr>
                 )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 border border-slate-200/60 rounded-2xl shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 text-center">
              Equipment Readiness
            </h3>
            <div className="h-52 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    stroke="none"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      fontSize: "12px",
                      border: "none",
                      boxShadow: "0 4px 20px -2px rgba(0,0,0,0.1)",
                      fontWeight: "bold",
                    }}
                    itemStyle={{ color: "#1e293b" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                <span className="text-3xl font-black text-slate-800">85%</span>
                <span className="text-xs font-semibold text-slate-400 mt-1">
                  Uptime
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600 mt-6">
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-sm"></div>{" "}
                Optimal
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-sm"></div>{" "}
                Calibration
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-sm"></div>{" "}
                Broken
              </span>
            </div>
          </div>

          <div className="bg-amber-50/50 p-6 border border-amber-200/60 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-100 rounded-full z-0 opacity-50"></div>
            <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-4 text-sm relative z-10">
              <AlertCircle className="w-5 h-5 text-amber-500" /> Maintenance
              Alert
            </h3>
            <div className="bg-white p-5 border border-amber-100 rounded-xl relative z-10 shadow-sm">
              <div className="font-bold text-slate-800 mb-1.5">
                CT Scan Needs Service
              </div>
              <div className="text-sm text-slate-600 leading-relaxed mb-4">
                Schedule a Work Order for GE Healthcare maintenance. Must handle
                before operational license expires next week.
              </div>
              <button className="text-sm font-bold text-white bg-amber-500 px-4 py-2.5 rounded-xl shadow-sm hover:bg-amber-600 transition-colors w-full sm:w-auto">
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
