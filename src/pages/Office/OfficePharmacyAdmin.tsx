import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pill,
  Search,
  Filter,
  Database,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Package,
  Box,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficePharmacyAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Inventory");
  const [searchTerm, setSearchTerm] = useState("");

  const masterData = useSRMStore((state) => state.masterData);
  const obatList = masterData["obat"] || [];

  const inventory = useMemo(() => {
    return obatList.map((o) => {
      const stock = o["Stok"] || o["stok"] || 0;
      let status = "Optimal";
      if (stock <= 5) status = "Critical";
      else if (stock <= 20) status = "Low Stock";

      return {
        sku: o["Kode Obat"] || "N/A",
        name: o["Nama Obat"] || "Unknown",
        type: o["Kategori"] || "General",
        stock,
        status,
      };
    });
  }, [obatList]);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase());

      let matchTab = true;
      if (activeTab === "Low Stock") matchTab = item.status === "Low Stock";
      if (activeTab === "Critical") matchTab = item.status === "Critical";

      return matchSearch && matchTab;
    });
  }, [inventory, activeTab, searchTerm]);

  const totalItems = obatList.length;
  const countLowStock = inventory.filter(
    (i) => i.status === "Low Stock",
  ).length;
  const countCritical = inventory.filter((i) => i.status === "Critical").length;

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Pharmacy Procurement (PBF)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage medicine inventory, suppliers, and restock orders.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/srm/apotek")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Database className="w-4 h-4 text-indigo-100" /> Open SRM Apotek
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Items
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-200">
              SRM
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {totalItems}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> Live Data
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-medium text-slate-500 text-sm">Low Stock</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-200">
              Filtered
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-600 mt-2">
              {countLowStock}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Requires reorder
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <h3 className="font-medium text-slate-500 text-sm">
                Critical Level
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-rose-600 mt-2">
              {countCritical}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-rose-500 font-medium flex items-center">
                Stock {"<="} 5
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-indigo-400" />
              <h3 className="font-medium text-slate-400 text-sm">
                Active Orders
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white mt-2">2</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-indigo-400 font-medium flex items-center">
                Pending delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["Inventory", "Purchase Orders", "Suppliers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
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
                placeholder="Search medication..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm transition-shadow"
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
                  Medication
                </th>
                <th className="pb-3 px-4 font-medium">Type</th>
                <th className="pb-3 px-4 font-medium text-right">Stock</th>
                <th className="pb-3 px-4 font-medium text-center">Status</th>
                <th className="pb-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInventory.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">
                      {item.sku}
                    </p>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    {item.type}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 text-right">
                    {item.stock.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                        item.status === "Optimal"
                          ? "text-emerald-600 bg-emerald-50 border-emerald-200/50"
                          : item.status === "Low Stock"
                            ? "text-amber-600 bg-amber-50 border-amber-200/50"
                            : "text-rose-600 bg-rose-50 border-rose-200/50"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => navigate("/srm/apotek")}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      View in SRM
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500 italic"
                  >
                    No inventory matched criteria.
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
