import React, { useState } from 'react';
import { Bone, Search, FileImage, Upload, CheckCircle, Activity, Printer, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';

export default function SRMRadiologi() {
  const navigate = useNavigate();
  const { radiologyOrders, updateRadiologyOrderStatus } = useSRMStore();
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 h-full flex flex-col relative rounded-sm border border-slate-300 overflow-hidden">
      
      {/* Header */}
      <div className="bg-slate-800 text-white p-4 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-3">
            <Bone className="w-8 h-8 text-cyan-400" />
            <div>
               <h1 className="text-xl font-bold tracking-wide text-white">Radiologi & Pencitraan</h1>
               <p className="text-sm text-slate-300 font-medium">Manajemen Hasil X-Ray, USG, dan CT-Scan</p>
            </div>
         </div>
         <div className="flex bg-slate-900 rounded overflow-hidden border border-slate-700">
            <div className="px-4 py-2 border-r border-slate-700 text-center">
               <div className="text-xs text-slate-400">Total Order Hari Ini</div>
               <div className="font-bold text-lg leading-none text-cyan-400">14</div>
            </div>
            <div className="px-4 py-2 text-center bg-slate-800">
               <div className="text-xs text-slate-400">Dalam Proses</div>
               <div className="font-bold text-lg leading-none">2</div>
            </div>
         </div>
      </div>

      <div className="flex flex-1 p-4 gap-4 overflow-hidden">
         {/* Order List */}
         <div className="w-full md:w-[350px] flex flex-col gap-4">
            <div className="bg-white border border-slate-300 rounded shadow-sm flex flex-col flex-1 overflow-hidden">
               <div className="p-3 border-b border-slate-200 bg-slate-50">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input type="text" placeholder="Cari no order / pasien..." className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-cyan-500" />
                  </div>
               </div>
               <div className="flex-1 overflow-auto bg-slate-50 p-2 space-y-2">
                  {radiologyOrders.map(order => (
                     <div 
                        key={order.id} 
                        onClick={() => setSelectedOrder(order.id)}
                        className={`bg-white border p-3 rounded shadow-sm hover:border-cyan-300 cursor-pointer overflow-hidden transition-all ${selectedOrder === order.id ? 'border-cyan-500 ring-1 ring-cyan-500' : 'border-slate-200'}`}
                     >
                        <div className="flex justify-between items-start mb-1">
                           <span className="font-bold text-slate-800 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{order.patient}</span>
                           <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${order.status === 'Menunggu' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-cyan-50 text-cyan-700 border-cyan-200'}`}>
                              {order.status}
                           </span>
                        </div>
                        <div className="text-xs text-slate-600 mb-2">{order.rm} • {order.poly}</div>
                        <div className="text-xs font-bold text-slate-700 bg-slate-100 p-1.5 rounded">{order.type}</div>
                        <div className="flex justify-end mt-2">
                           <span className="text-[10px] text-slate-400 font-medium">Req: {order.reqTime}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Radiology Detail */}
         <div className="flex-1 bg-white border border-slate-300 rounded shadow-sm flex flex-col overflow-hidden">
             {selectedOrder ? (
                 <>
                     <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-start">
                        <div>
                           <div className="text-xs font-bold text-cyan-600 uppercase mb-1">Detail Order #{selectedOrder}</div>
                           <h2 className="text-lg font-bold text-slate-800">{selectedOrder === 'RAD-20260611-002' ? 'Samsul Arif' : 'Leni Marlina'}</h2>
                           <p className="text-sm text-slate-500 font-medium">{selectedOrder === 'RAD-20260611-002' ? 'Rontgen Genu Kanan' : 'Rontgen Thorax AP/PA'}</p>
                        </div>
                        <div className="flex gap-2">
                           <button className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                              <Printer className="w-4 h-4" /> Cetak Form
                           </button>
                           <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded text-sm font-bold shadow-sm transition-colors flex items-center gap-2" onClick={() => toast.success('Hasil berhasil divalidasi!')}>
                              <CheckCircle className="w-4 h-4" /> Validasi Hasil
                           </button>
                        </div>
                     </div>

                     <div className="flex-1 p-6 overflow-auto bg-slate-100/50 flex flex-col gap-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Upload Hasil Gambar */}
                           <div className="bg-white p-4 border border-slate-300 rounded shadow-sm">
                              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
                                 <FileImage className="w-4 h-4 text-cyan-600" /> Hasil Pencitraan (Upload DICOM / JPEG)
                              </h3>
                              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                                 <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6" />
                                 </div>
                                 <p className="font-bold text-slate-700 text-sm mb-1">Klik atau Drag gambar ke sini</p>
                                 <p className="text-xs text-slate-500">Mendukung format JPG, PNG, atau link DICOM PACS</p>
                              </div>
                           </div>

                           {/* Input Expertise / Bacaan */}
                           <div className="bg-white p-4 border border-slate-300 rounded shadow-sm flex flex-col">
                              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
                                 <Activity className="w-4 h-4 text-cyan-600" /> Expertise / Bacaan Radiolog
                              </h3>
                              <textarea 
                                 className="w-full flex-1 border border-slate-300 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 custom-scrollbar min-h-[150px]"
                                 placeholder="Ketik hasil bacaan radiologi (expertise) di sini..."
                              ></textarea>
                              <div className="mt-3 flex justify-between items-center">
                                 <div className="text-xs text-slate-500">Dokter Radiologi: <span className="font-bold text-slate-700">Dr. Budiarso, Sp.Rad</span></div>
                              </div>
                           </div>
                        </div>

                     </div>
                 </>
             ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                    <Bone className="w-16 h-16 mb-4 text-slate-300" />
                    <p className="font-bold text-lg text-slate-500">Pilih Order Radiologi</p>
                    <p className="text-sm">Input hasil bacaan dan upload gambar akan tampil di sini</p>
                 </div>
             )}
         </div>
      </div>
      
      {/* Floating Back Button */}
      <div className="absolute bottom-4 left-4 flex gap-2">
         <button onClick={() => navigate({ to: '/srm' })} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-slate-50">
           <XCircle className="w-4 h-4 text-red-600" /> KELUAR MODUL
         </button>
      </div>

    </div>
  );
}
