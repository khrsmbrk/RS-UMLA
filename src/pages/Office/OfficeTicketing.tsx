import React, { useState } from "react";
import {
  AlertCircle,
  Plus,
  Search,
  CheckCircle,
  Clock,
  UploadCloud,
  RefreshCcw,
  Filter,
  User,
  BarChart,
  Server,
  Wrench,
  QrCode,
  HardDrive,
  ArrowUpRight,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";
import toast from "react-hot-toast";

export default function OfficeTicketing() {
  const { userRole, tickets, addTicket } = useOfficeStore();
  const [activeTab, setActiveTab] = useState<"Incidents" | "Preventive">(
    "Incidents",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [kategori, setKategori] = useState("IT (Software/Hardware)");
  const [prioritas, setPrioritas] = useState("Normal");
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState("");

  const isHandler = [
    "adm_it",
    "pelaksana",
    "wadir_admin",
    "kasubag_aset",
  ].includes(userRole || "");

  const handleSimpanKeDrive = async () => {
    if (!deskripsi || !lokasi)
      return toast.error("Lengkapi deskripsi dan lokasi!");
    setIsUploading(true);
    setTimeout(() => {
      const newTicket = {
        id: `TKT-NEW-${Math.floor(Math.random() * 1000)}`,
        req: "You",
        cat: kategori.includes("IT") ? "IT" : "Facilities",
        desc: deskripsi,
        status: "Pending",
        prio: prioritas,
        date: "Just Now",
        color: "text-slate-600 bg-slate-100",
      };
      addTicket(newTicket);
      setIsModalOpen(false);
      setDeskripsi("");
      setLokasi("");
      setIsUploading(false);
      toast.success("Ticket created successfully!");
    }, 1000);
  };

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Facility & IT Tickets
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage helpdesk incidents and facility maintenance
          </p>
        </div>
        {!isHandler && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" /> Create Ticket
            </button>
          </div>
        )}
      </div>

      {isHandler && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-slate-400" />
                <h3 className="font-medium text-slate-400 text-sm">
                  Active WO
                </h3>
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mt-2">17</div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <span className="text-slate-500 font-medium">
                  pending resolution
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <h3 className="font-medium text-slate-500 text-sm">
                  Unassigned
                </h3>
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800 mt-2">5</div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <span className="text-rose-500 font-medium flex items-center">
                  requires dispatch
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                <h3 className="font-medium text-slate-500 text-sm">
                  In Progress
                </h3>
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800 mt-2">8</div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <span className="text-amber-500 font-medium flex items-center">
                  technicians working
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-medium text-slate-500 text-sm">Resolved</h3>
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-800 mt-2">142</div>
              <div className="flex items-center gap-1 text-xs mt-2">
                <span className="text-slate-500 font-medium flex items-center">
                  this month
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["Incidents", "Preventive", "My Tickets"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
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
              placeholder="Search ticket ID or description..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-shadow"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 font-medium min-w-[300px]">
                  Ticket Details
                </th>
                <th className="pb-3 font-medium">Category / Area</th>
                <th className="pb-3 font-medium">Reported By</th>
                <th className="pb-3 font-medium">Priority</th>
                <th className="pb-3 font-medium text-center">Status</th>
                <th className="pb-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tickets.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg shrink-0 mt-0.5 ${t.prio === "High" ? "bg-rose-50 border border-rose-100 text-rose-600" : "bg-slate-100 border border-slate-200 text-slate-500"}`}
                      >
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-base mb-1 leading-snug">
                          {t.desc}
                        </p>
                        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">
                          {t.id} &bull; {t.date}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md text-xs font-bold text-slate-600 border border-slate-200">
                      {t.cat === "IT" ? (
                        <Server className="w-3.5 h-3.5" />
                      ) : (
                        <Wrench className="w-3.5 h-3.5" />
                      )}{" "}
                      {t.cat}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="font-medium text-slate-700">{t.req}</span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                        t.prio === "High"
                          ? "text-rose-600 bg-rose-50 border-rose-200"
                          : "text-slate-600 bg-slate-50 border-slate-200"
                      }`}
                    >
                      {t.prio}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${t.color}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    {isHandler ? (
                      <button className="text-xs font-bold text-teal-600 hover:text-teal-700 border border-teal-200 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors">
                        Resolve
                      </button>
                    ) : (
                      <button className="text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                        Track
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
          <p className="text-xs text-slate-500">
            Showing 1 to {tickets.length} entries
          </p>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-400 hover:bg-slate-100 border border-slate-200">
              {"<"}
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-teal-600 text-white shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-400 hover:bg-slate-100 border border-slate-200">
              {">"}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                Create IT/Facility Ticket
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Category
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option>IT (Software/Hardware)</option>
                    <option>Facilities (Building/AC)</option>
                    <option>Medical Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Priority
                  </label>
                  <select
                    value={prioritas}
                    onChange={(e) => setPrioritas(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option>Normal</option>
                    <option>High (Urgent)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  placeholder="e.g. ICU Room 4"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Describe the issue..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none"
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSimpanKeDrive}
                disabled={isUploading}
                className="px-5 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isUploading ? (
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <UploadCloud className="w-4 h-4" />
                )}{" "}
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
