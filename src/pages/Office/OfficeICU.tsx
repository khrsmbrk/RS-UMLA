import React, { useState } from "react";
import { ActivitySquare, Bed, Activity, Search } from "lucide-react";

export default function OfficeICU() {
  const [searchTerm, setSearchTerm] = useState("");

  const icuBeds = [
      { id: "ICU-01", patient: "Tn. Rahmat Hariadi", condition: "Kritis", bp: "90/60", hr: 110, spo2: 92, vent: "Terventilasi", status: "Terisi" },
      { id: "ICU-02", patient: "Ny. Sariwati", condition: "Stabil", bp: "110/70", hr: 85, spo2: 98, vent: "Spontan", status: "Terisi" },
      { id: "ICU-03", patient: "-", condition: "-", bp: "-", hr: "-", spo2: "-", vent: "-", status: "Tersedia" },
      { id: "ICU-04", patient: "An. Bintang", condition: "Observasi", bp: "100/65", hr: 95, spo2: 99, vent: "Spontan", status: "Terisi" },
  ];

  const filteredBeds = icuBeds.filter(b => b.patient.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ActivitySquare className="w-6 h-6 text-purple-600" /> Intensive
            Care Unit (ICU)
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Pemantauan kapasitas bed ICU, ventilator, dan status pasien kritis.
          </p>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-purple-50 rounded-xl border border-purple-200 shadow-sm p-4">
              <span className="text-purple-600 font-bold uppercase tracking-widest text-xs mb-1 block">Total Bed ICU</span>
              <span className="text-3xl font-black text-purple-800">12 <span className="text-sm opacity-50">Kapasitas</span></span>
          </div>
          <div className="bg-rose-50 rounded-xl border border-rose-200 shadow-sm p-4">
              <span className="text-rose-600 font-bold uppercase tracking-widest text-xs mb-1 block">Pasien Terventilasi</span>
              <span className="text-3xl font-black text-rose-800">4 <span className="text-sm opacity-50">Pasien</span></span>
          </div>
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm p-4">
              <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs mb-1 block">Bed Tersedia</span>
              <span className="text-3xl font-black text-emerald-800">2 <span className="text-sm opacity-50">Kosong</span></span>
          </div>
           <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-4">
              <span className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-1 block">Bed Occupancy Rate</span>
              <span className="text-3xl font-black text-blue-800">83.3 <span className="text-sm opacity-50">%</span></span>
          </div>
       </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
             <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                 Monitoring Central (Live)
             </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari Bed / Pasien..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-black text-slate-300 border-b border-slate-800">
                    <tr>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs border-r border-slate-800">Bed ID</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs border-r border-slate-800">Identitas Pasien</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs border-r border-slate-800"><span className="text-emerald-400">HR</span> (bpm)</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs border-r border-slate-800"><span className="text-sky-400">SpO2</span> (%)</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs border-r border-slate-800"><span className="text-rose-400">NIBP</span> (mmHg)</th>
                         <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Ventilator</th>
                    </tr>
                </thead>
                <tbody className="bg-black text-white divide-y divide-slate-800">
                    {filteredBeds.map((b, i) => (
                        <tr key={i} className="hover:bg-slate-900 transition-colors">
                            <td className="px-5 py-4 font-mono font-bold text-amber-400 align-middle border-r border-slate-800">
                                {b.id}
                            </td>
                            <td className="px-5 py-4 align-middle border-r border-slate-800">
                                {b.status === 'Tersedia' ? (
                                    <span className="text-slate-500 italic block">Kosong / Tersedia</span>
                                ) : (
                                    <>
                                       <div className="font-bold text-white mb-1 tracking-wide">{b.patient}</div>
                                       <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-bold ${b.condition === 'Kritis' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'}`}>{b.condition}</span>
                                    </>
                                )}
                            </td>
                            <td className="px-5 py-4 align-middle border-r border-slate-800 text-center font-black font-mono text-xl">
                                {b.status === 'Tersedia' ? <span className="text-slate-600">-</span> : <span className={typeof b.hr === 'number' && b.hr > 100 ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}>{b.hr}</span>}
                            </td>
                            <td className="px-5 py-4 align-middle border-r border-slate-800 text-center font-black font-mono text-xl text-sky-400">
                                 {b.status === 'Tersedia' ? <span className="text-slate-600">-</span> : b.spo2}
                            </td>
                             <td className="px-5 py-4 align-middle border-r border-slate-800 text-center font-black font-mono text-lg text-rose-400">
                                 {b.status === 'Tersedia' ? <span className="text-slate-600">-</span> : b.bp}
                            </td>
                            <td className="px-5 py-4 align-middle font-medium text-slate-300">
                                {b.status === 'Tersedia' ? <span className="text-slate-600">-</span> : (
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest ${b.vent === 'Terventilasi' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'bg-slate-700 text-slate-300'}`}>
                                       <Activity className="w-3 h-3" /> {b.vent}
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                    {filteredBeds.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-5 py-12 text-center text-slate-600 italic">Data monitoring bed tidak ditemukan.</td>
                        </tr>
                    )}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
}
