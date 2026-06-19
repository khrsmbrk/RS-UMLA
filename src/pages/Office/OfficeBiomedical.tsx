import React, { useState, useMemo } from "react";
import { Activity, Thermometer, AlertTriangle, Plus, Search } from "lucide-react";

export default function OfficeBiomedical() {
  const [searchTerm, setSearchTerm] = useState("");

  const equipment = useMemo(() => [
     {
        name: "Patient Monitor Philips",
        sn: "PM-PH-0220",
        loc: "ICU Bed 2",
        last: "12 Jun 2025",
        next: "12 Jun 2026",
        stat: "Due Soon",
      },
      {
        name: "USG Mindray 4D",
        sn: "USG-MD-0988",
        loc: "Poliklinik Kandungan",
        last: "20 Jul 2025",
        next: "20 Jul 2026",
        stat: "Active",
      },
      {
        name: "Defibrillator ZOLL",
        sn: "DF-ZL-112",
        loc: "IGD Resusitasi",
        last: "05 Jan 2026",
        next: "05 Jan 2027",
        stat: "Active",
      },
      {
        name: "Syringe Pump Terumo",
        sn: "SP-TR-441",
        loc: "NICU",
        last: "10 May 2025",
        next: "10 May 2026",
        stat: "Expired",
      }
  ], []);

  const filteredEquipment = useMemo(() => {
    return equipment.filter(e => 
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      e.sn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.loc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [equipment, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600" /> Medical Equipment (Biomedical)
          </h1>
          <p className="text-slate-500 mt-1">
            Manage preventative maintenance (PM) schedules and calibration of medical devices.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          <Plus className="w-5 h-5" /> Add Maintenance Schedule
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            Calibration Schedules
          </h3>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search equipment, SRN..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
          <thead className="bg-white text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Equipment & SRN
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Location
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Last Calibration
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Next Calibration
              </th>
              <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEquipment.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-4 align-middle">
                  <div className="font-bold text-slate-800 mb-1">
                    {item.name}
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    SN: {item.sn}
                  </div>
                </td>
                <td className="px-5 py-4 font-medium text-slate-700 align-middle">
                  {item.loc}
                </td>
                <td className="px-5 py-4 text-slate-600 align-middle">
                  {item.last}
                </td>
                <td className="px-5 py-4 font-bold text-slate-700 align-middle">
                  {item.next}
                </td>
                <td className="px-5 py-4 align-middle">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                      item.stat === "Due Soon"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : item.stat === "Expired" 
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {item.stat}
                  </span>
                </td>
              </tr>
            ))}
            {filteredEquipment.length === 0 && (
               <tr>
                 <td colSpan={5} className="px-5 py-12 text-center text-slate-500 italic">No equipment matches your search.</td>
               </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
