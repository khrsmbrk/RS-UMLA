import React, { useState, useMemo } from "react";
import { useNavigate } from '@tanstack/react-router';
import {
  Search,
  Filter,
  Plus,
  PackageOpen,
  LayoutGrid,
  Box,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  BoxSelect,
  Database,
} from "lucide-react";

export default function OfficeInventory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All Items");

  const inventoryItems = useMemo(() => {
    return [
      {
        id: "ITM-9201",
        name: "A4 Printer Paper (Box)",
        category: "Office Supplies",
        stock: 45,
        unit: "Boxes",
        status: "Optimal",
      },
      {
        id: "ITM-9202",
        name: "Disinfectant Wipes",
        category: "Cleaning",
        stock: 12,
        unit: "Packs",
        status: "Low Stock",
      },
      {
        id: "ITM-9203",
        name: "Wireless Mouse",
        category: "IT Equipment",
        stock: 8,
        unit: "Units",
        status: "Low Stock",
      },
      {
        id: "ITM-9204",
        name: "Hand Sanitizer Refill",
        category: "Cleaning",
        stock: 2,
        unit: "Gallons",
        status: "Critical",
      },
      {
        id: "ITM-9205",
        name: "Notepads",
        category: "Office Supplies",
        stock: 120,
        unit: "Packs",
        status: "Optimal",
      },
      {
        id: "ITM-9206",
        name: "HDMI Cable 2m",
        category: "IT Equipment",
        stock: 4,
        unit: "Units",
        status: "Low Stock",
      },
      {
        id: "ITM-9207",
        name: "Floor Cleaner",
        category: "Cleaning",
        stock: 1,
        unit: "Gallons",
        status: "Critical",
      },
      {
        id: "ITM-9208",
        name: "Desk Lamps",
        category: "Office Supplies",
        stock: 15,
        unit: "Units",
        status: "Optimal",
      },
    ];
  }, []);

  const filteredItems = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());

      let matchTab = true;
      if (activeTab === "Low Stock")
        matchTab = item.status === "Low Stock" || item.status === "Critical";
      else if (activeTab !== "All Items")
        matchTab = item.category === activeTab;

      return matchSearch && matchTab;
    });
  }, [inventoryItems, activeTab, searchTerm]);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            General Inventory
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage non-medical supplies, equipment, and assets
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/srm/logistik" })}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors"
          >
            <Database className="w-4 h-4 text-emerald-600" /> Open in SRM
          </button>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              "All Items",
              "Office Supplies",
              "Maintenance",
              "Cleaning",
              "IT Equipment",
              "Low Stock",
            ].map((tab) => (
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

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search SKU or Item Name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {filteredItems.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="bg-slate-50 p-2 rounded-lg text-slate-500">
                  {item.category === "IT Equipment" ? (
                    <LayoutGrid className="w-5 h-5" />
                  ) : item.category === "Office Supplies" ? (
                    <BoxSelect className="w-5 h-5" />
                  ) : (
                    <PackageOpen className="w-5 h-5" />
                  )}
                </div>
                {item.status === "Optimal" ? (
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-200/50 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" /> Optimal
                  </span>
                ) : item.status === "Low Stock" ? (
                  <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-200/50 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-3 h-3" /> Low
                  </span>
                ) : (
                  <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded border border-rose-200/50 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                    <RotateCcw className="w-3 h-3" /> Critical
                  </span>
                )}
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {item.id} • {item.category}
                </p>
              </div>

              <div className="flex items-end justify-between pt-3 border-t border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                    Quantity
                  </p>
                  <p className="text-xl font-black text-slate-800">
                    {item.stock}{" "}
                    <span className="text-sm font-medium text-slate-500">
                      {item.unit}
                    </span>
                  </p>
                </div>
                <button className="text-teal-600 hover:text-teal-700 text-xs font-bold transition-colors">
                  Update
                </button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 italic">
              No items found matching the criteria.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-4">
          <p className="text-xs text-slate-500">Showing 1 to 8 of 245 items</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-400 hover:bg-slate-100 border border-slate-200">
              {"<"}
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-teal-600 text-white shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-100 border border-slate-200">
              2
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-400 hover:bg-slate-100 border border-slate-200">
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
