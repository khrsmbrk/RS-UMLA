import React, { useState } from 'react';
import { Microscope, Search, CheckCircle, FileText, XCircle, Beaker } from 'lucide-react';
import { useSRMStore } from '../../store/srmStore';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';

export default function SRMLaboratorium() {
  const navigate = useNavigate();
  const { labOrders, updateLabOrderStatus } = useSRMStore();
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col md:flex-row gap-4 relative">
      {/* Kiri - Daftar Permintaan Lab */}
      <div className="w-full md:w-1/3 flex flex-col gap-4 border-r border-slate-200 pr-4">
         <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-2 bg-slate-50 p-2 rounded">
          <Microscope className="w-5 h-5 text-teal-600" />
          <h1 className="text-xl font-bold text-slate-800 uppercase">Laboratorium</h1>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari Permintaan/Pasien..." 
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-teal-500 shadow-sm"
          />
        </div>

        <div className="flex-1 overflow-auto bg-slate-50 border border-slate-300 rounded">
          {labOrders.map(order => (
            <div 
              key={order.id}
              onClick={() => setSelectedOrder(order.id)}
              className={`p-3 border-b border-slate-200 cursor-pointer hover:bg-teal-50 ${selectedOrder === order.id ? 'bg-teal-100 border-l-4 border-l-teal-600' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1">
                   {order.urgen && <span className="bg-red-500 text-white text-[10px] px-1 rounded uppercase tracking-wider">Cito</span>}
                   {order.id}
                </span>
                <span className="text-xs text-slate-500 font-medium">{order.time} WIB</span>
              </div>
              <div className="text-sm font-medium text-slate-700">{order.pasien} <span className="text-slate-500 font-normal">({order.noRM})</span></div>
              <div className="text-xs text-slate-500 mt-1">{order.dokter} - {order.poli}</div>
              <div className="mt-2">
                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    order.status === 'Menunggu' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    order.status === 'Proses' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    'bg-emerald-100 text-emerald-700 border-emerald-200'
                 }`}>
                    {order.status}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanan - Input Hasil Lab */}
      <div className="flex-1 flex flex-col gap-4">
        {selectedOrder ? (
          <>
            <div className="bg-slate-50 border border-slate-300 rounded p-4 flex justify-between items-start shadow-sm">
                <div>
                   <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">Order: {selectedOrder}</h2>
                   <p className="text-sm text-slate-500 mt-1">Pasien: <span className="font-bold text-slate-700">Agus Setiawan (PSN0003)</span></p>
                   <p className="text-sm text-slate-500">Pengirim: <span className="font-bold text-slate-700">Dr. Herman - IGD</span></p>
                </div>
                <div className="flex gap-2 flex-col items-end">
                   <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm">
                      <CheckCircle className="w-4 h-4" /> Finalisasi Hasil
                   </button>
                   <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1 text-xs font-bold rounded flex items-center gap-1 shadow-sm">
                      <FileText className="w-3 h-3" /> Cetak Form
                   </button>
                </div>
            </div>

            <div className="border border-slate-300 rounded bg-white flex-1 flex flex-col overflow-hidden shadow-sm">
               <div className="bg-slate-100 p-2 border-b border-slate-300 flex items-center gap-2 font-bold text-slate-700 text-sm">
                  <Beaker className="w-4 h-4 text-slate-500" /> Input Hasil Pemeriksaan (Darah Rutin)
               </div>
               <div className="flex-1 overflow-auto p-4">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-600 border-b border-slate-300">
                        <tr>
                           <th className="py-2 px-3">Parameter</th>
                           <th className="py-2 px-3">Hasil</th>
                           <th className="py-2 px-3">Nilai Rujukan</th>
                           <th className="py-2 px-3">Satuan</th>
                           <th className="py-2 px-3 text-center">Keterangan</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                           <td className="py-3 px-3 font-medium text-slate-800">Hemoglobin (Hb)</td>
                           <td className="py-3 px-3 w-32">
                              <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 font-bold text-red-600" defaultValue="11.2" />
                           </td>
                           <td className="py-3 px-3 text-slate-500">13.0 - 18.0</td>
                           <td className="py-3 px-3 text-slate-500">g/dL</td>
                           <td className="py-3 px-3 text-center">
                              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">Rendah</span>
                           </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                           <td className="py-3 px-3 font-medium text-slate-800">Leukosit</td>
                           <td className="py-3 px-3 w-32">
                              <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 font-bold" defaultValue="8.5" />
                           </td>
                           <td className="py-3 px-3 text-slate-500">4.0 - 10.0</td>
                           <td className="py-3 px-3 text-slate-500">ribu/ul</td>
                           <td className="py-3 px-3 text-center">
                              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded font-bold">Normal</span>
                           </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                           <td className="py-3 px-3 font-medium text-slate-800">Trombosit</td>
                           <td className="py-3 px-3 w-32">
                              <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 font-bold" defaultValue="250" />
                           </td>
                           <td className="py-3 px-3 text-slate-500">150 - 450</td>
                           <td className="py-3 px-3 text-slate-500">ribu/ul</td>
                           <td className="py-3 px-3 text-center">
                              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded font-bold">Normal</span>
                           </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                           <td className="py-3 px-3 font-medium text-slate-800">Hematokrit</td>
                           <td className="py-3 px-3 w-32">
                              <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-teal-500 font-bold text-red-600" defaultValue="35" />
                           </td>
                           <td className="py-3 px-3 text-slate-500">40 - 52</td>
                           <td className="py-3 px-3 text-slate-500">%</td>
                           <td className="py-3 px-3 text-center">
                              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">Rendah</span>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  
                  <div className="mt-4">
                     <label className="block text-sm font-bold text-slate-700 mb-1">Catatan Tambahan (Misal: Serum Lisis, dll)</label>
                     <textarea className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:border-teal-500 h-20" placeholder="Ketik catatan di sini..."></textarea>
                  </div>
               </div>
            </div>

          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 h-full border-2 border-dashed border-slate-200 rounded p-8">
             <Microscope className="w-16 h-16 mb-4 text-slate-300" />
             <p className="font-medium text-lg">Pilih Order Pemeriksaan</p>
             <p className="text-sm">Input hasil lab akan ditampilkan di area ini</p>
          </div>
        )}
      </div>
      
      {/* Floating Back Button */}
      <div className="absolute bottom-4 right-4 flex gap-2">
         <button onClick={() => navigate({ to: '/srm' })} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-slate-50">
           <XCircle className="w-4 h-4 text-red-600" /> KELUAR MODUL
         </button>
      </div>

    </div>
  );
}
