import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Pill,
  AlertTriangle,
  Package,
  Activity,
  ArrowUpRight,
  Database,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeMedicine() {
  const [activeTab, setActiveTab] = useState("Inventory");
  const [searchTerm, setSearchTerm] = useState("");

  const masterData = useSRMStore((state) => state.masterData);
  const obatList = masterData["obat"] || [];

  const filteredMeds = useMemo(() => {
    return obatList.filter((o) => {
      const nameMatch = (o["Nama Obat"] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const codeMatch = (o["Kode Obat"] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (!nameMatch && !codeMatch) return false;

      const stock = o["Stok"] || o["stok"] || 0;
      if (activeTab === "Low Stock" && stock > 20) return false;
      if (activeTab === "Critical" && stock > 5) return false;

      return true;
    });
  }, [obatList, searchTerm, activeTab]);

  const totalSKUs = obatList.length;
  const lowStockCount = obatList.filter(
    (o) =>
      (o["Stok"] || o["stok"] || 0) <= 20 && (o["Stok"] || o["stok"] || 0) > 5,
  ).length;
  const criticalCount = obatList.filter(
    (o) => (o["Stok"] || o["stok"] || 0) <= 5,
  ).length;

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Pharmacy & Medicine
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage medicine inventory, prescriptions, and stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200">
            <Database className="w-4 h-4 text-emerald-600" /> Open in SRM
          </button>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Medication
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">Total SKUs</h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">
              Real-time
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {totalSKUs}
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
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-medium text-slate-500 text-sm">Low Stock</h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {lowStockCount}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-amber-500 font-medium flex items-center">
                requires reorder
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Critical Stock
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {criticalCount}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-rose-500 font-medium flex items-center">
                immediate action
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
                Data Integrity
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">100%</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Linked to SRM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            {["Inventory", "Low Stock", "Critical"].map((tab) => (
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
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Medicine Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 px-4 font-medium">Medication Name</th>
                <th className="pb-3 px-4 font-medium">Code</th>
                <th className="pb-3 px-4 font-medium">Stock Level</th>
                <th className="pb-3 px-4 font-medium">Unit Price</th>
                <th className="pb-3 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMeds.map((med, i) => {
                const stock = parseInt(med["Stok"] || med["stok"] || "0", 10);
                const status =
                  stock <= 5
                    ? "Critical"
                    : stock <= 20
                      ? "Low Stock"
                      : "Optimal";
                const statusColor =
                  stock <= 5
                    ? "text-rose-600 bg-rose-50 border-rose-200"
                    : stock <= 20
                      ? "text-amber-600 bg-amber-50 border-amber-200"
                      : "text-emerald-600 bg-emerald-50 border-emerald-200";

                return (
                  <tr
                    key={med.id || i}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <Pill className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-800">
                          {med["Nama Obat"] || med["nama"]}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-500">
                      {med["Kode Obat"] || med["Kode"]}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">
                          {stock}
                        </span>
                        {status === "Low Stock" || status === "Critical" ? (
                          <AlertTriangle
                            className={`w-4 h-4 ${status === "Critical" ? "text-rose-500" : "text-amber-500"}`}
                          />
                        ) : null}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">
                      Rp{" "}
                      {parseInt(
                        (med["Harga"] || med["harga"] || "0").toString(),
                      ).toLocaleString("id-ID")}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-md border text-[11px] font-bold ${statusColor}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredMeds.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500 italic"
                  >
                    No medications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
          <p className="text-xs font-medium text-slate-500">
            Showing {filteredMeds.length} entries out of {totalSKUs}
          </p>
        </div>
      </div>
    </div>
  );
}
