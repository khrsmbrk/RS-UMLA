import React from "react";
import { Wind, Gauge, AlertTriangle, BatteryMedium, ShieldAlert } from "lucide-react";

export default function OfficeGasMedis() {
  const supplies = [
    { type: "O2 Sentral (Liquid)", gauge: "4.5 bar", status: "Optimal", level: 85, color: "sky" },
    { type: "N2O Sentral", gauge: "3.8 bar", status: "Optimal", level: 75, color: "blue" },
    { type: "Vacuum (Suction)", gauge: "0.8 bar", status: "Optimal", level: 90, color: "slate" },
    { type: "Medical Air (Udara Tekan)", gauge: "4.0 bar", status: "Warning", level: 45, color: "amber" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Wind className="w-6 h-6 text-sky-500" /> Instalasi Gas Medis
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Stok persediaan tabung O2, O2 Sentral (Liquid), N2O, Vacuum, &
            Kompresor udara medis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supplies.map((item, i) => (
          <div key={i} className={`bg-${item.color}-50 border border-${item.color}-200 rounded-xl p-5 shadow-sm relative overflow-hidden`}>
             <div className="flex justify-between items-start mb-4">
               <div className={`bg-${item.color}-100 p-2.5 rounded-lg text-${item.color}-600`}>
                 <Gauge className="w-6 h-6" />
               </div>
               {item.status === 'Warning' ? <ShieldAlert className="w-5 h-5 text-amber-500" /> : <BatteryMedium className={`w-5 h-5 text-${item.color}-500 opacity-50`} />}
             </div>
             <div>
                <div className={`text-[10px] font-black uppercase tracking-widest text-${item.color}-600 mb-1`}>
                  {item.type}
                </div>
                <div className={`text-3xl font-black text-${item.color}-800`}>
                  {item.gauge}
                </div>
             </div>
             <div className={`w-full bg-${item.color}-200/50 rounded-full h-1.5 mt-4 overflow-hidden`}>
                <div className={`bg-${item.color}-500 h-1.5 rounded-full`} style={{ width: `${item.level}%` }}></div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
             <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                 <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Log Pendistribusian Tabung Gas</h3>
             </div>
             <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
                   <thead className="bg-white text-slate-500 border-b border-slate-200">
                     <tr>
                       <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Aktivitas</th>
                       <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Lokasi</th>
                       <th className="px-5 py-4 font-bold uppercase tracking-wider text-xs">Waktu</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {[
                         { act: "Drop-off 5 Tabung O2 (Besar)", loc: "Gudang IGD", time: "10:30 WIB" },
                         { act: "Pick-up 3 Tabung Kosong", loc: "Ruang Rawat Inap Melati", time: "11:15 WIB" },
                         { act: "Maintenance Valve Cylinder", loc: "Sentral Gas Medis", time: "13:00 WIB" },
                     ].map((l, i) => (
                         <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                             <td className="px-5 py-4 font-medium text-slate-800">{l.act}</td>
                             <td className="px-5 py-4 text-slate-600 font-bold">{l.loc}</td>
                             <td className="px-5 py-4 text-slate-500">{l.time}</td>
                         </tr>
                     ))}
                   </tbody>
                 </table>
             </div>
          </div>
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 shadow-sm self-start">
             <div className="flex items-center gap-3 mb-4">
                 <div className="bg-amber-100 p-2 rounded-lg"><AlertTriangle className="w-5 h-5 text-amber-600" /></div>
                 <h3 className="font-black text-amber-800 uppercase tracking-widest text-sm">Peringatan Sistem</h3>
             </div>
             <div className="space-y-3">
                 <div className="bg-white/60 rounded-lg p-3 border border-amber-100">
                     <div className="text-xs font-bold text-amber-800 mb-1">Medical Air Tekanan Turun</div>
                     <div className="text-[10px] text-amber-700">Tekanan mesin kompresor B berada di bawah threshold normal (4.0 bar). Sedang dalam pemeriksaan teknisi.</div>
                 </div>
                  <div className="bg-white/60 rounded-lg p-3 border border-amber-100">
                     <div className="text-xs font-bold text-amber-800 mb-1">Jadwal Kalibrasi O2 Sentral</div>
                     <div className="text-[10px] text-amber-700">Jadwal inspeksi rutin tangki liquid O2 akan dilakukan besok (28 Mei 2026).</div>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
}
