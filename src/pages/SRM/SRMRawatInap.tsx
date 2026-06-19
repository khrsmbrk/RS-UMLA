import React, { useState } from 'react';
import { BedDouble, Search, Thermometer, UserCheck, Activity, Pill, XCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function SRMRawatInap() {
  const navigate = useNavigate();
  const { inpatientBeds: beds } = useSRMStore();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-slate-50 h-full flex flex-col relative rounded-sm border border-slate-300 overflow-hidden">
      
      {/* Header */}
      <div className="bg-indigo-700 text-white p-4 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-3">
            <BedDouble className="w-8 h-8" />
            <div>
               <h1 className="text-xl font-bold tracking-wide">Bangsal & Rawat Inap</h1>
               <p className="text-sm text-indigo-200 font-medium">Manajemen Tempat Tidur & Observasi Medis</p>
            </div>
         </div>
         <div className="flex bg-indigo-800 rounded overflow-hidden border border-indigo-600">
            <div className="px-4 py-2 border-r border-indigo-600 text-center">
               <div className="text-xs text-indigo-300">Total Bed</div>
               <div className="font-bold text-lg leading-none">120</div>
            </div>
            <div className="px-4 py-2 border-r border-indigo-600 text-center">
               <div className="text-xs text-indigo-300">Terisi</div>
               <div className="font-bold text-lg leading-none text-emerald-400">85</div>
            </div>
            <div className="px-4 py-2 text-center bg-indigo-900/50">
               <div className="text-xs text-indigo-300">Kosong</div>
               <div className="font-bold text-lg leading-none">35</div>
            </div>
         </div>
      </div>

      <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center z-10 shadow-sm relative">
         <div className="flex gap-2">
            <div className="relative w-64">
               <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
               <input type="text" placeholder="Cari bangsal, pasien, no RM..." className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-indigo-500" />
            </div>
            <select className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-700 font-medium">
               <option>Semua Ruangan</option>
               <option>Mawar (Kelas I)</option>
               <option>Melati (VIP)</option>
               <option>ICU / NICU</option>
            </select>
         </div>
         <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Terisi</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span> Kosong</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Rencana Pulang</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Kritis / Perhatian Khusus</div>
         </div>
      </div>

      {/* Bed Grid */}
      <div className="flex-1 overflow-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 bg-slate-100">
         {beds.map((bed, idx) => (
            <div key={idx} className={`bg-white border rounded shadow-sm overflow-hidden flex flex-col relative transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer ${bed.status === 'Kosong' ? 'border-slate-200' : bed.status === 'Rencana Pulang' ? 'border-amber-300 ring-1 ring-amber-300' : bed.status === 'Kritis' ? 'border-red-300 ring-1 ring-red-300' : 'border-emerald-300 ring-1 ring-emerald-300'}`}>
               
               <div className={`p-3 border-b flex justify-between items-center text-white ${bed.status === 'Kosong' ? 'bg-slate-500 border-slate-600' : bed.status === 'Rencana Pulang' ? 'bg-amber-500 border-amber-600' : bed.status === 'Kritis' ? 'bg-red-600 border-red-700' : 'bg-emerald-600 border-emerald-700'}`}>
                  <div className="font-bold text-lg flex items-center gap-2">
                     <BedDouble className="w-5 h-5 opacity-80" /> {bed.id}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded">{bed.room}</div>
               </div>

               {bed.status === 'Kosong' ? (
                  <div className="p-6 flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                     <BedDouble className="w-12 h-12 mb-2 text-slate-200" />
                     <p className="font-medium text-slate-500">Tempat Tidur Tersedia</p>
                     <button className="mt-4 border border-slate-300 text-slate-600 hover:bg-slate-50 px-4 py-1.5 rounded text-xs font-bold transition-colors">Daftarkan Pasien Inap</button>
                  </div>
               ) : (
                  <div className="p-4 flex-1 flex flex-col">
                     <div className="mb-3">
                        <div className="font-bold text-slate-800 text-base">{bed.patient}</div>
                        <div className="text-xs font-bold text-slate-500 flex items-center gap-2 mt-1">
                           RM: {bed.rm}
                           {bed.bpjs && <span className="text-[9px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded border border-green-200 uppercase">BPJS</span>}
                        </div>
                     </div>
                     <div className="text-sm text-slate-600 mb-4 bg-slate-50 p-2 rounded border border-slate-100">
                        <div className="mb-1"><span className="text-slate-400 font-medium w-16 inline-block">DPJP:</span> <span className="font-bold">{bed.doctor}</span></div>
                        <div><span className="text-slate-400 font-medium w-16 inline-block">Masuk:</span> <span>{bed.admissionDate}</span></div>
                     </div>
                     
                     <div className="mt-auto pt-3 border-t border-slate-100 grid grid-cols-4 gap-2">
                        <button className="flex flex-col items-center justify-center p-1.5 text-blue-600 hover:bg-blue-50 rounded group">
                           <Activity className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                           <span className="text-[9px] font-bold">CPPT</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-1.5 text-rose-500 hover:bg-rose-50 rounded group">
                           <Thermometer className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                           <span className="text-[9px] font-bold">Grafik</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-1.5 text-emerald-600 hover:bg-emerald-50 rounded group">
                           <Pill className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                           <span className="text-[9px] font-bold">Obat Inap</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-1.5 text-amber-600 hover:bg-amber-50 rounded group">
                           <UserCheck className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                           <span className="text-[9px] font-bold">Beri Izin PK</span>
                        </button>
                     </div>
                  </div>
               )}
            </div>
         ))}
      </div>

    </div>
  );
}
