import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlaskConical,
  Droplet,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Database,
  FileText,
  ArrowRight,
  Activity,
  Cpu,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeLabAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Orders");
  const [searchTerm, setSearchTerm] = useState("");

  const patients = useSRMStore((state) => state.patients);

  const labOrders = useMemo(() => {
    return patients.slice(0, 10).map((p, i) => {
      let test = "Darah Lengkap (Hematologi)";
      let priority = "Normal";
      let status = "In Progress";

      if (i % 3 === 0) {
        test = "HbA1c";
        status = "Completed";
      } else if (i % 2 === 0) {
        test = "Panel Metabolik";
        priority = "Urgent";
        status = "Pending Sample";
      }

      return {
        id: `LAB-2606-${String(820 + i)}`,
        patient: p.namaLengkap,
        rm: p.id,
        test,
        priority,
        status,
      };
    });
  }, [patients]);

  const filteredOrders = useMemo(() => {
    return labOrders.filter((order) => {
      const matchSearch =
        order.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.rm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTab =
        activeTab === "Orders" ||
        (activeTab === "Pending Samples" &&
          order.status === "Pending Sample") ||
        (activeTab === "Verification" && order.status === "In Progress") ||
        activeTab === "Reagents";

      return matchSearch && matchTab;
    });
  }, [labOrders, searchTerm, activeTab]);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Laboratory Admin
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage lab orders, LIS integrations, and reagent inventory.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/srm/laboratorium")}
            className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Database className="w-4 h-4 text-fuchsia-100" /> Open SRM
            Laboratorium
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-fuchsia-500" />
              <h3 className="font-medium text-slate-500 text-sm">
                Today's Tests
              </h3>
            </div>
            <span className="text-fuchsia-500 bg-fuchsia-50 px-2 py-0.5 rounded text-xs font-semibold">
              Active
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">84</div>
            <div className="text-xs font-medium text-slate-400 mt-2">
              Samples received
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-medium text-slate-500 text-sm">
                Urgent Needs
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-600 mt-2">5</div>
            <div className="text-xs font-medium text-slate-400 mt-2">
              Await processing
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="font-medium text-slate-500 text-sm">Completed</h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">42</div>
            <div className="text-xs font-medium text-slate-400 mt-2">
              Results finalized
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-fuchsia-400" />
              <h3 className="font-medium text-slate-400 text-sm">LIS Status</h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400 mt-2">
              Online
            </div>
            <div className="text-xs font-medium text-slate-500 mt-2">
              Sysmex XN-1000 connected
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["Orders", "Pending Samples", "Verification", "Reagents"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab
                      ? "bg-fuchsia-50 text-fuchsia-700 shadow-sm"
                      : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Patient or Order ID..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 shadow-sm transition-shadow"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 px-4 font-medium min-w-[200px]">
                  Patient & Order Info
                </th>
                <th className="pb-3 px-4 font-medium">Test Type</th>
                <th className="pb-3 px-4 font-medium">Priority</th>
                <th className="pb-3 px-4 font-medium text-center">Status</th>
                <th className="pb-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">{order.patient}</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">
                      {order.id} • {order.rm}
                    </p>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">
                    {order.test}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                        order.priority === "Urgent"
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {order.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        order.status === "Pending Sample"
                          ? "text-amber-600 bg-amber-50"
                          : order.status === "In Progress"
                            ? "text-blue-600 bg-blue-50"
                            : "text-emerald-600 bg-emerald-50"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => navigate("/srm/laboratorium")}
                      className="text-xs font-bold text-fuchsia-600 hover:text-fuchsia-700 border border-fuchsia-200 bg-fuchsia-50 hover:bg-fuchsia-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Process
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500 italic"
                  >
                    No lab orders found.
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
