import React, { useState } from 'react';
import { CreditCard, Search, Receipt, CheckCircle, Printer, XCircle, FileSpreadsheet, HandCoins } from 'lucide-react';
import { useSRMStore } from '../../store/srmStore';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';

export default function SRMKasir() {
  const navigate = useNavigate();
  const { patients } = useSRMStore();
  const { kasirBills: bills, updateKasirBillStatus } = useSRMStore();
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedBill, setSelectedBill] = useState<string | null>(null);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col md:flex-row gap-4 relative">
      {/* Kiri - Daftar Tagihan / Antrean Pembayaran */}
      <div className="w-full md:w-1/3 flex flex-col gap-4 border-r border-slate-200 pr-4">
         <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-2 bg-slate-50 p-2 rounded">
          <CreditCard className="w-5 h-5 text-emerald-600" />
          <h1 className="text-xl font-bold text-slate-800 uppercase">Kasir / Billing</h1>
        </div>
        
        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari Invoice/Pasien..." 
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-emerald-500 shadow-sm"
          />
        </div>

        <div className="flex-1 overflow-auto bg-slate-50 border border-slate-300 rounded">
          {bills.map(bill => (
            <div 
              key={bill.id}
              onClick={() => setSelectedBill(bill.id)}
              className={`p-3 border-b border-slate-200 cursor-pointer hover:bg-emerald-50 ${selectedBill === bill.id ? 'bg-emerald-100 border-l-4 border-l-emerald-600' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800 text-sm">{bill.id}</span>
                <span className="text-xs text-slate-500 font-medium">{bill.time} WIB</span>
              </div>
              <div className="text-sm font-medium text-slate-700">{bill.pasien} <span className="text-slate-500 font-normal">({bill.noRM})</span></div>
              <div className="text-xs text-slate-500 mt-1">{bill.poli} • <span className="font-bold text-slate-600">{bill.tipe}</span></div>
              <div className="mt-2 flex justify-between items-center">
                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    bill.status === 'Menunggu' ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                 }`}>
                    {bill.status}
                 </span>
                 <span className="font-bold text-slate-800 text-sm">{formatRupiah(bill.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanan - Rincian Tagihan & Pembayaran */}
      <div className="flex-1 flex flex-col gap-4">
        {selectedBill ? (
          <>
            <div className="bg-slate-50 border border-slate-300 rounded p-4 flex justify-between items-start shadow-sm">
                <div>
                   <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">Invoice: {selectedBill}</h2>
                   <p className="text-sm text-slate-500 mt-1">Pasien: <span className="font-bold text-slate-700">Budi Santoso (PSN0001)</span></p>
                   <p className="text-sm text-slate-500">Penjamin: <span className="font-bold text-slate-700">Umum / Pribadi</span></p>
                </div>
                <div className="flex gap-2">
                   <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm">
                      <Printer className="w-4 h-4" /> Cetak Kwitansi
                   </button>
                   <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm" onClick={() => { updateKasirBillStatus(activeBill.id, 'Lunas'); toast.success('Pembayaran Berhasil'); }}>
                      <HandCoins className="w-4 h-4" /> Proses Pembayaran
                   </button>
                </div>
            </div>

            <div className="border border-slate-300 rounded bg-white flex-1 flex flex-col overflow-hidden shadow-sm">
               <div className="bg-slate-100 p-2 border-b border-slate-300 flex items-center gap-2 font-bold text-slate-700 text-sm">
                  <Receipt className="w-4 h-4 text-slate-500" /> Rincian Biaya Perawatan
               </div>
               <div className="flex-1 overflow-auto p-4">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-600 border-b border-slate-300">
                        <tr>
                           <th className="py-2 px-3">Item Pelayanan / Produk</th>
                           <th className="py-2 px-3">Departemen</th>
                           <th className="py-2 px-3 text-center">Qty</th>
                           <th className="py-2 px-3 text-right">Harga Satuan</th>
                           <th className="py-2 px-3 text-right">Subtotal</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                           <td className="py-3 px-3 font-medium text-slate-800">Konsultasi Dokter Umum</td>
                           <td className="py-3 px-3 text-slate-600">Poli Umum</td>
                           <td className="py-3 px-3 text-center">1</td>
                           <td className="py-3 px-3 text-right text-slate-600">{formatRupiah(50000)}</td>
                           <td className="py-3 px-3 text-right font-bold text-slate-800">{formatRupiah(50000)}</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                           <td className="py-3 px-3 font-medium text-slate-800">Tindakan Jahit Luka Ringan</td>
                           <td className="py-3 px-3 text-slate-600">Poli Umum</td>
                           <td className="py-3 px-3 text-center">1</td>
                           <td className="py-3 px-3 text-right text-slate-600">{formatRupiah(75000)}</td>
                           <td className="py-3 px-3 text-right font-bold text-slate-800">{formatRupiah(75000)}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 bg-indigo-50">
                           <td className="py-3 px-3 font-medium text-indigo-800">Amoxicillin 500mg</td>
                           <td className="py-3 px-3 text-indigo-600">Apotek</td>
                           <td className="py-3 px-3 text-center text-indigo-800">15</td>
                           <td className="py-3 px-3 text-right text-indigo-600">{formatRupiah(500)}</td>
                           <td className="py-3 px-3 text-right font-bold text-indigo-800">{formatRupiah(7500)}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 bg-indigo-50">
                           <td className="py-3 px-3 font-medium text-indigo-800">Paracetamol 500mg</td>
                           <td className="py-3 px-3 text-indigo-600">Apotek</td>
                           <td className="py-3 px-3 text-center text-indigo-800">10</td>
                           <td className="py-3 px-3 text-right text-indigo-600">{formatRupiah(200)}</td>
                           <td className="py-3 px-3 text-right font-bold text-indigo-800">{formatRupiah(2000)}</td>
                        </tr>
                        <tr className="hover:bg-slate-50 bg-indigo-50">
                           <td className="py-3 px-3 font-medium text-indigo-800">Jasa Resep</td>
                           <td className="py-3 px-3 text-indigo-600">Apotek</td>
                           <td className="py-3 px-3 text-center text-indigo-800">1</td>
                           <td className="py-3 px-3 text-right text-indigo-600">{formatRupiah(15500)}</td>
                           <td className="py-3 px-3 text-right font-bold text-indigo-800">{formatRupiah(15500)}</td>
                        </tr>
                     </tbody>
                  </table>
                  
                  <div className="mt-8 flex justify-end">
                     <div className="w-72 border border-slate-300 rounded overflow-hidden">
                        <div className="flex justify-between p-3 border-b border-slate-200">
                           <span className="text-slate-600 font-medium">Subtotal</span>
                           <span className="text-slate-800">{formatRupiah(150000)}</span>
                        </div>
                        <div className="flex justify-between p-3 border-b border-slate-200">
                           <span className="text-slate-600 font-medium">Diskon</span>
                           <span className="text-emerald-600 font-bold">- {formatRupiah(0)}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-slate-800 text-white font-bold text-lg">
                           <span>Total Bayar</span>
                           <span>{formatRupiah(150000)}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="mt-8">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Metode Pembayaran</label>
                      <div className="flex gap-4">
                         <label className="flex items-center gap-2 border border-slate-300 rounded p-3 cursor-pointer hover:bg-slate-50 w-full">
                            <input type="radio" name="paymentMethod" defaultChecked className="text-emerald-600 focus:ring-emerald-500" />
                            <span className="font-medium text-slate-700">Tunai</span>
                         </label>
                         <label className="flex items-center gap-2 border border-slate-300 rounded p-3 cursor-pointer hover:bg-slate-50 w-full">
                            <input type="radio" name="paymentMethod" className="text-emerald-600 focus:ring-emerald-500" />
                            <span className="font-medium text-slate-700">Kartu Debit / Kredit</span>
                         </label>
                         <label className="flex items-center gap-2 border border-slate-300 rounded p-3 cursor-pointer hover:bg-slate-50 w-full">
                            <input type="radio" name="paymentMethod" className="text-emerald-600 focus:ring-emerald-500" />
                            <span className="font-medium text-slate-700">QRIS</span>
                         </label>
                      </div>
                  </div>
               </div>
            </div>

          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 h-full border-2 border-dashed border-slate-200 rounded p-8">
             <CreditCard className="w-16 h-16 mb-4 text-slate-300" />
             <p className="font-medium text-lg">Pilih Tagihan Pembayaran</p>
             <p className="text-sm">Rincian invoice akan ditampilkan di area ini</p>
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
