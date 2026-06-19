import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  Package,
  Building,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

import { useOfficeStore } from "./store/officeStore";

export default function OfficeProcurement() {
  const [activeTab, setActiveTab] = useState("All POs");
  const [searchTerm, setSearchTerm] = useState("");

  const storePOs = useOfficeStore(state => state.pos);

  const poList = useMemo(() => {
    return [
      ...storePOs,
      {
        id: "PO-2605-03",
        vendor: "CV. Maju Jaya IT",
        items: "Tinta & Kertas HVS",
        total: "Rp 3.200.000",
        status: "Draft",
        date: "25 May 2026",
        color: "text-slate-600 bg-slate-100",
      },
      {
        id: "PO-2605-04",
        vendor: "PT. Sarana Medika",
        items: "Alat Reagen Lab",
        total: "Rp 28.400.000",
        status: "Approved",
        date: "26 May 2026",
        color: "text-emerald-600 bg-emerald-50",
      },
    ];
  }, [storePOs]);

  const filteredPOs = useMemo(() => {
    return poList.filter((po) => {
      const searchMatch =
        po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const tabMatch = activeTab === "All POs" || po.status === activeTab;
      return searchMatch && tabMatch;
    });
  }, [poList, searchTerm, activeTab]);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Procurement
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage purchase orders and vendor relationships
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> New PO
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
              <h3 className="font-medium text-slate-500 text-sm">Total POs</h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">
              This Month
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">124</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 8%
              </span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Procurement Value
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              Rp 1.2M
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Approved budget
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Pending Approval
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">5</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-amber-500 font-medium flex items-center">
                Requires attention
              </span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Completed POs
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">98</div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                Delivered & verified
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
            {["All POs", "Pending", "Approved", "Draft"].map((tab) => (
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
              placeholder="Search PO number or vendor..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* PO Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 font-medium min-w-[150px]">PO Details</th>
                <th className="pb-3 font-medium min-w-[200px]">Vendor</th>
                <th className="pb-3 font-medium min-w-[200px]">Description</th>
                <th className="pb-3 font-medium min-w-[120px] text-right">
                  Total Value
                </th>
                <th className="pb-3 font-medium text-center">Status</th>
                <th className="pb-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPOs.map((po, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4">
                    <p className="font-bold text-slate-800">{po.id}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{po.date}</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Building className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="font-medium text-slate-700">
                        {po.vendor}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-600">{po.items}</td>
                  <td className="py-4 font-bold text-slate-800 text-right">
                    {po.total}
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border border-transparent ${po.color}`}
                    >
                      {po.status}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mx-auto transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPOs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-500 italic"
                  >
                    No purchase orders found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
          <p className="text-xs text-slate-500">
            Showing 1 to 4 of 124 entries
          </p>
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
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-100 border border-slate-200">
              3
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
