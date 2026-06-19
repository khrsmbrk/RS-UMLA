import React, { useState } from 'react';
import { Package, Search, PlusCircle, ArrowDownCircle, ArrowUpCircle, Filter, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';

export default function SRMLogistik() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'inventory' | 'in' | 'out'>('inventory');

  return (
    <div className="bg-slate-50 h-full flex flex-col relative rounded-sm border border-slate-300 overflow-hidden">
      
      {/* Header */}
      <div className="bg-amber-600 text-white p-4 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <div>
               <h1 className="text-xl font-bold tracking-wide text-white">Logistik & Gudang Farmasi</h1>
               <p className="text-sm text-amber-200 font-medium">Manajemen Stok Obat, Alkes, dan Barang Umum</p>
            </div>
         </div>
         <div className="flex bg-amber-700 rounded overflow-hidden border border-amber-500">
            <div className="px-4 py-2 border-r border-amber-500 text-center">
               <div className="text-xs text-amber-200">Total Item</div>
               <div className="font-bold text-lg leading-none">1,250</div>
            </div>
            <div className="px-4 py-2 text-center bg-red-600/30">
               <div className="text-xs text-red-200">Stok Menipis</div>
               <div className="font-bold text-lg leading-none text-red-100">15</div>
            </div>
         </div>
      </div>

      <div className="flex bg-white border-b border-slate-200">
          <button 
             className={`px-6 py-3 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'inventory' ? 'border-amber-600 text-amber-700 bg-amber-50' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
             onClick={() => setActiveTab('inventory')}
          >
             <Package className="w-4 h-4" /> Data Inventori
          </button>
          <button 
             className={`px-6 py-3 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'in' ? 'border-amber-600 text-amber-700 bg-amber-50' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
             onClick={() => setActiveTab('in')}
          >
             <ArrowDownCircle className="w-4 h-4" /> Penerimaan Barang
          </button>
          <button 
             className={`px-6 py-3 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'out' ? 'border-amber-600 text-amber-700 bg-amber-50' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
             onClick={() => setActiveTab('out')}
          >
             <ArrowUpCircle className="w-4 h-4" /> Distribusi / Pengeluaran
          </button>
      </div>

      <div className="flex-1 p-4 overflow-auto">
         {activeTab === 'inventory' && (
            <div className="bg-white border border-slate-300 rounded shadow-sm flex flex-col h-full">
               <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                  <div className="flex gap-2">
                     <div className="relative w-64">
                       <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                       <input type="text" placeholder="Cari nama barang, kode..." className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-amber-500" />
                     </div>
                     <button className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-3 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm">
                        <Filter className="w-4 h-4" /> Filter
                     </button>
                  </div>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm font-bold shadow-sm transition-colors flex items-center gap-2" onClick={() => toast.success('Tambahkan Item Master')}>
                     <PlusCircle className="w-4 h-4" /> Tambah Item Baru
                  </button>
               </div>
               <div className="flex-1 overflow-auto p-4">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-slate-100 text-slate-600 border-b border-slate-300">
                        <tr>
                           <th className="py-3 px-4 font-bold">Kode</th>
                           <th className="py-3 px-4 font-bold">Nama Item</th>
                           <th className="py-3 px-4 font-bold">Kategori</th>
                           <th className="py-3 px-4 font-bold text-center">Stok Saat Ini</th>
                           <th className="py-3 px-4 font-bold text-center">Satuan / Kemasan</th>
                           <th className="py-3 px-4 font-bold text-right">Harga Beli Akhir</th>
                           <th className="py-3 px-4 font-bold text-center">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                           <td className="py-3 px-4 font-bold text-slate-600">OBT-001</td>
                           <td className="py-3 px-4 font-bold text-slate-800">Amoxicillin 500mg Tab</td>
                           <td className="py-3 px-4 text-slate-600">Obat Oral</td>
                           <td className="py-3 px-4 text-center font-bold text-slate-800 text-lg">1,250</td>
                           <td className="py-3 px-4 text-center text-slate-600">Box (100 Tab)</td>
                           <td className="py-3 px-4 text-right text-slate-600">Rp 45.000 / Box</td>
                           <td className="py-3 px-4 text-center">
                              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Aman</span>
                           </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                           <td className="py-3 px-4 font-bold text-slate-600">ALK-001</td>
                           <td className="py-3 px-4 font-bold text-slate-800">Spuit 3cc Onemed</td>
                           <td className="py-3 px-4 text-slate-600">Alkes BHP</td>
                           <td className="py-3 px-4 text-center font-bold text-red-600 text-lg">15</td>
                           <td className="py-3 px-4 text-center text-slate-600">Box (100 Pcs)</td>
                           <td className="py-3 px-4 text-right text-slate-600">Rp 85.000 / Box</td>
                           <td className="py-3 px-4 text-center">
                              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Kritis</span>
                           </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                           <td className="py-3 px-4 font-bold text-slate-600">OBT-002</td>
                           <td className="py-3 px-4 font-bold text-slate-800">Paracetamol Infus 1000mg/100ml</td>
                           <td className="py-3 px-4 text-slate-600">Obat Injeksi / Infus</td>
                           <td className="py-3 px-4 text-center font-bold text-slate-800 text-lg">450</td>
                           <td className="py-3 px-4 text-center text-slate-600">Botol</td>
                           <td className="py-3 px-4 text-right text-slate-600">Rp 35.000 / Btl</td>
                           <td className="py-3 px-4 text-center">
                              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Aman</span>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         )}

         {activeTab !== 'inventory' && (
            <div className="flex-1 flex items-center justify-center h-full text-slate-400">
               <div className="text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-slate-300 opacity-50" />
                  <h2 className="text-xl font-bold text-slate-500 mb-2">Modul {activeTab === 'in' ? 'Penerimaan' : 'Distribusi'} Sedang Disiapkan</h2>
                  <p className="text-sm">Fitur ini akan tersedia pada pembaruan SIM RS berikutnya.</p>
               </div>
            </div>
         )}
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
