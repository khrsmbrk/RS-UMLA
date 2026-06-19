import React, { useState } from 'react';
import { Stethoscope, Search, FileText, CheckCircle, Activity, ClipboardList, Edit, XCircle } from 'lucide-react';
import { useSRMStore } from '../../store/srmStore';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';

export default function SRMPoliklinik() {
  const navigate = useNavigate();
  const { poliQueues: queues, updatePoliQueueStatus } = useSRMStore();
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedQueue, setSelectedQueue] = useState<string | null>(null);

  return (
    <div className="bg-slate-100 h-full flex flex-col md:flex-row gap-0 rounded-sm overflow-hidden border border-slate-300">
      {/* Kiri - Daftar Antrean Pasien Poli */}
      <div className="w-full md:w-[350px] bg-white flex flex-col border-r border-slate-300">
         <div className="bg-blue-600 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
             <Stethoscope className="w-5 h-5" />
             <h1 className="text-lg font-bold uppercase tracking-wide">Poli Umum</h1>
          </div>
          <p className="text-sm text-blue-100 mb-4">Dr. Andi Kurniawan, Sp.PD</p>
          
          <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-2.5 text-blue-300" />
             <input 
               type="text" 
               placeholder="Cari Pasien..." 
               className="w-full pl-9 pr-3 py-2 bg-blue-700/50 border border-blue-500 rounded text-sm text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
             />
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-slate-50">
          <div className="p-2 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 flex justify-between px-4">
             <span>Antrean Hari Ini (3)</span>
          </div>
          {queues.map(queue => (
            <div 
              key={queue.id}
              onClick={() => setSelectedQueue(queue.id)}
              className={`p-4 border-b border-slate-200 cursor-pointer transition-colors ${selectedQueue === queue.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'bg-white hover:bg-slate-50'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-black text-slate-800 text-lg leading-none">{queue.antrean}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    queue.status === 'Menunggu' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                    queue.status === 'Diperiksa' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    'bg-emerald-100 text-emerald-700 border-emerald-200'
                 }`}>
                    {queue.status}
                 </span>
              </div>
              <div className="text-sm font-bold text-slate-800 mt-2">{queue.pasien}</div>
              <div className="text-xs text-slate-500 mb-1">RM: {queue.noRM} | Masuk: {queue.time} WIB</div>
              <div className="text-[11px] font-medium text-slate-600 flex items-center gap-1 mt-2">
                 <div className={`w-2 h-2 rounded-full ${queue.tipe === 'BPJS Kesehatan' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                 {queue.tipe}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanan - Electronic Medical Record (CPPT) */}
      <div className="flex-1 flex flex-col bg-slate-50 relative">
        {selectedQueue ? (
          <div className="flex-1 flex flex-col overflow-hidden">
             {/* Patient Banner */}
             <div className="bg-white border-b border-slate-300 p-4 shrink-0 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl">
                      B
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-slate-800">Budi Santoso <span className="text-sm font-normal text-slate-500 ml-2">(Laki-laki, 45 Thn)</span></h2>
                      <div className="flex text-sm text-slate-600 font-medium gap-4 mt-1">
                         <span>RM: PSN0001</span>
                         <span>No. Kartu: 0001234567890</span>
                         <span>Alergi: <span className="text-red-500 font-bold">Amoxicillin</span></span>
                      </div>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm transition-colors" onClick={() => toast.success('Pemeriksaan Selesai!')}>
                      <CheckCircle className="w-4 h-4" /> Selesai Diperiksa
                   </button>
                </div>
             </div>

             {/* CPPT EMR Panels */}
             <div className="flex-1 overflow-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Asesmen Awal Keperawatan */}
                <div className="bg-white border border-slate-300 rounded shadow-sm">
                   <div className="bg-amber-50 p-3 border-b border-slate-300 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                         <Activity className="w-4 h-4 text-amber-600" /> TTV & Asesmen Perawat
                      </h3>
                   </div>
                   <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">Tensi (TD)</label>
                         <div className="p-2 bg-slate-50 border border-slate-200 rounded font-bold text-slate-700">120/80 mmHg</div>
                      </div>
                      <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">Suhu</label>
                         <div className="p-2 bg-slate-50 border border-slate-200 rounded font-bold text-slate-700">36.5 °C</div>
                      </div>
                      <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">Nadi</label>
                         <div className="p-2 bg-slate-50 border border-slate-200 rounded font-bold text-slate-700">80 x/mnt</div>
                      </div>
                      <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">Pernapasan (RR)</label>
                         <div className="p-2 bg-slate-50 border border-slate-200 rounded font-bold text-slate-700">20 x/mnt</div>
                      </div>
                      <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">Berat Badan</label>
                         <div className="p-2 bg-slate-50 border border-slate-200 rounded font-bold text-slate-700">70 Kg</div>
                      </div>
                      <div>
                         <label className="text-xs font-bold text-slate-500 block mb-1">Tinggi Badan</label>
                         <div className="p-2 bg-slate-50 border border-slate-200 rounded font-bold text-slate-700">170 cm</div>
                      </div>
                      <div className="col-span-2 mt-2">
                         <label className="text-xs font-bold text-slate-500 block mb-1">Keluhan Utama (Perawat)</label>
                         <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700">Demam sejak 3 hari yang lalu, disertai batuk berdahak.</div>
                      </div>
                   </div>
                </div>

                {/* CPPT Dokter (SOAP) */}
                <div className="bg-white border border-slate-300 rounded shadow-sm flex flex-col h-full lg:row-span-2">
                   <div className="bg-blue-50 p-3 border-b border-slate-300 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                         <ClipboardList className="w-4 h-4 text-blue-600" /> Pemeriksaan Dokter (S.O.A.P)
                      </h3>
                      <button className="text-blue-600 hover:bg-blue-100 p-1.5 rounded transition-colors" title="Buka Template">
                         <FileText className="w-4 h-4" />
                      </button>
                   </div>
                   <div className="p-4 flex-1 flex flex-col gap-4 text-sm overflow-auto">
                      <div>
                         <label className="text-xs items-center gap-1 font-bold text-slate-700 flex mb-1">S <span className="font-normal text-slate-500">(Subjective / Keluhan)</span></label>
                         <textarea className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[60px]" defaultValue="Pasien mengeluh demam tinggi malam hari, batuk berdahak kuning, badan terasa linu."></textarea>
                      </div>
                      <div>
                         <label className="text-xs items-center gap-1 font-bold text-slate-700 flex mb-1">O <span className="font-normal text-slate-500">(Objective / Pemeriksaan Fisik)</span></label>
                         <textarea className="w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[60px]" defaultValue="Faring hiperemis (+), tonsil T1-T1, ronchi (-), wheezing (-)."></textarea>
                      </div>
                      <div className="border border-slate-200 p-3 rounded bg-slate-50">
                         <label className="text-xs items-center gap-1 font-bold text-slate-700 flex mb-2">A <span className="font-normal text-slate-500">(Assessment / Diagnosis ICD-10)</span></label>
                         <div className="flex gap-2">
                            <div className="flex-1 bg-white border border-slate-300 rounded px-3 py-2 flex justify-between items-center">
                               <div>
                                  <span className="font-bold text-blue-700 mr-2">J06.9</span> 
                                  <span className="text-slate-700">Acute upper respiratory infection, unspecified</span>
                               </div>
                               <button className="text-slate-400 hover:text-red-500"><XCircle className="w-4 h-4" /></button>
                            </div>
                         </div>
                         <button className="mt-2 text-xs font-bold text-blue-600 flex items-center gap-1"><Search className="w-3 h-3" /> Tambah Diagnosis Primer/Sekunder</button>
                      </div>
                      <div className="border border-slate-200 p-3 rounded bg-slate-50">
                         <label className="text-xs items-center gap-1 font-bold text-slate-700 flex mb-2">P <span className="font-normal text-slate-500">(Plan / Tata Laksana)</span></label>
                         
                         <div className="space-y-3">
                            <div>
                               <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">E-Resep (Obat)</div>
                               <div className="bg-white border border-slate-300 rounded p-2">
                                  <div className="flex justify-between items-center text-sm mb-1">
                                     <span className="font-bold text-slate-700">Paracetamol 500mg (Tab)</span>
                                     <span className="text-slate-500 font-medium">No. X</span>
                                  </div>
                                  <div className="text-xs text-slate-500 italic flex justify-between">
                                     <span>Sig: 3 x 1 P.r.n (Demam)</span>
                                     <button className="text-red-500 hover:text-red-700">Hapus</button>
                                  </div>
                               </div>
                               <button className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1"><Search className="w-3 h-3" /> Tambah Obat</button>
                            </div>

                            <div className="border-t border-slate-200 pt-3">
                               <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">Tindakan Medis</div>
                               <button className="mt-1 text-xs font-bold text-purple-600 flex items-center gap-1"><Search className="w-3 h-3" /> Tambah Tindakan</button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Riwayat Kunjungan & Order Penunjang */}
                 <div className="bg-white border border-slate-300 rounded shadow-sm flex flex-col">
                   <div className="bg-slate-50 p-3 border-b border-slate-300 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                         <FileText className="w-4 h-4 text-slate-600" /> Riwayat Rekam Medis
                      </h3>
                   </div>
                   <div className="p-4 flex-1 overflow-auto bg-slate-50">
                      <div className="text-center py-4">
                         <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                         <p className="text-sm font-medium text-slate-500">Kunjungan Pertama Pasien</p>
                         <p className="text-xs text-slate-400">Belum ada riwayat medis sebelumnya.</p>
                      </div>
                   </div>
                   
                   <div className="p-3 border-t border-slate-300 bg-white grid grid-cols-2 gap-2">
                      <button className="border border-teal-500 text-teal-600 hover:bg-teal-50 py-2 rounded text-sm font-bold flex justify-center items-center gap-2">
                         <Activity className="w-4 h-4" /> Order Lab
                      </button>
                      <button className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 py-2 rounded text-sm font-bold flex justify-center items-center gap-2">
                         <Edit className="w-4 h-4" /> Order Radiologi
                      </button>
                   </div>
                </div>

             </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 h-full p-8 text-center bg-slate-50">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mb-6">
                <Stethoscope className="w-12 h-12 text-slate-300" />
             </div>
             <p className="font-bold text-slate-600 text-2xl mb-2">Electronic Medical Record</p>
             <p className="font-medium">Pilih pasien dari daftar antrean di sebelah kiri untuk<br/>memulai asesmen dan pengisian CPPT.</p>
          </div>
        )}

      {/* Floating Back Button */}
      <div className="absolute top-4 right-4 z-50">
         <button onClick={() => navigate({ to: '/srm' })} className="bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg hover:bg-slate-700 transition-transform hover:scale-105">
           <XCircle className="w-3.5 h-3.5" /> Tutup EMR Modul
         </button>
      </div>

      </div>
    </div>
  );
}
