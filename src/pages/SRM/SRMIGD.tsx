import React, { useState } from 'react';
import { AlertCircle, Search, Activity, Stethoscope, CheckCircle, Ambulance, FileWarning, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSRMStore } from '../../store/srmStore';

export default function SRMIGD() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const patients = useSRMStore(state => state.igdQueues);

  return (
    <div className="bg-slate-50 h-full flex flex-col relative rounded-sm border border-slate-300 overflow-hidden">
      
      {/* Header */}
      <div className="bg-red-700 text-white p-4 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-3">
            <Ambulance className="w-8 h-8" />
            <div>
               <h1 className="text-xl font-bold tracking-wide">Instalasi Gawat Darurat (IGD)</h1>
               <p className="text-sm text-red-200 font-medium">Sistem Triage & Penanganan Cepat</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="bg-red-800/50 px-4 py-2 rounded border border-red-600/50 flex items-center gap-4">
               <div className="text-center">
                  <div className="text-xs text-red-200">Total Pasien</div>
                  <div className="font-bold text-lg leading-none">12</div>
               </div>
               <div className="w-px h-8 bg-red-600/30"></div>
               <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-500 border border-white flex items-center justify-center text-xs font-bold shadow-sm">3</div>
                  <div className="w-6 h-6 rounded-full bg-yellow-400 text-slate-800 border border-white flex items-center justify-center text-xs font-bold shadow-sm">5</div>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-xs font-bold shadow-sm">4</div>
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-white flex items-center justify-center text-xs font-bold shadow-sm">0</div>
               </div>
            </div>
         </div>
      </div>

      <div className="flex flex-1 p-4 gap-4 overflow-hidden">
         {/* Triage & Patient List Column */}
         <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="bg-white border border-slate-300 rounded shadow-sm flex flex-col flex-1 overflow-hidden">
               <div className="p-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                  <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                     <AlertCircle className="w-4 h-4 text-red-600" /> Pasien Aktif
                  </h2>
                  <button className="text-xs font-bold text-red-600 hover:text-red-800 px-2 py-1 bg-red-50 hover:bg-red-100 rounded border border-red-200">
                     + Pasien Baru
                  </button>
               </div>
               <div className="p-3 bg-white border-b border-slate-100">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
                    <input type="text" placeholder="Cari nama / RM..." className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-red-500" />
                  </div>
               </div>
               <div className="flex-1 overflow-auto bg-slate-50 p-3 space-y-3">
                  {patients.map(p => (
                     <div key={p.id} className="bg-white border border-slate-200 p-3 rounded shadow-sm hover:border-red-300 cursor-pointer relative overflow-hidden transition-all hover:shadow-md">
                        {p.triage === 'Merah' && <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>}
                        {p.triage === 'Kuning' && <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-400"></div>}
                        {p.triage === 'Hijau' && <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>}
                        
                        <div className="pl-3">
                           <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-slate-800 text-sm">{p.name} <span className="font-normal text-xs text-slate-500">({p.age} thn)</span></span>
                              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {p.time}</span>
                           </div>
                           <div className="text-xs text-slate-600 font-medium mb-2">{p.diagnosis}</div>
                           <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{p.id}</span>
                              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{p.status}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Active Patient Details */}
         <div className="flex-1 bg-white border border-slate-300 rounded shadow-sm flex flex-col overflow-hidden">
             {/* Action Banner */}
             <div className="bg-red-50 border-b border-red-100 p-4 shrink-0 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-3">
                      <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded inline-block uppercase tracking-wider">Triage Merah (P1)</div>
                      <h2 className="text-xl font-bold text-slate-800">Tn. Abdul Ghani</h2>
                   </div>
                   <div className="flex text-sm text-slate-600 mt-1 gap-4 font-medium">
                      <span>RM: PSN88991</span>
                      <span>DOB: 12-05-1981 (45 thn)</span>
                      <span>Masuk: 10:05 WIB</span>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button className="bg-white border border-red-300 text-red-700 hover:bg-red-50 px-4 py-2 rounded text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                      <FileWarning className="w-4 h-4" /> Gelang Pasien
                   </button>
                   <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Mulai EMR IGD
                   </button>
                </div>
             </div>

             <div className="flex-1 overflow-auto p-6 bg-slate-50 flex items-center justify-center">
                 <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                       <Stethoscope className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Pemeriksaan Dokter IGD</h3>
                    <p className="text-sm text-slate-500 mb-6">Modul EMR Gawat Darurat dirancang untuk pengisian cepat SOAP, instruksi medis, dan observasi perawat secara real-time.</p>
                    <button className="w-full bg-blue-600 text-white font-bold py-2.5 rounded shadow-sm hover:bg-blue-700 flex items-center justify-center gap-2">
                       <CheckCircle className="w-4 h-4" /> Buka Lembar Observasi
                    </button>
                 </div>
             </div>
         </div>
      </div>

    </div>
  );
}
