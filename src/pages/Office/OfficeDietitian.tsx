import React, { useState, useMemo } from "react";
import {
  Utensils,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Search,
  Check
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeDietitian() {
  const [searchTerm, setSearchTerm] = useState("");
  const { dietOrders: diets, updateDietOrderStatus } = useOfficeStore();

  const updateStatus = (id: string) => {
      const target = diets.find((d: any) => d.id === id);
      if (!target) return;
      if (target.status === 'Persiapan') {
          updateDietOrderStatus(id, 'Diantar');
      } else if (target.status === 'Diantar') {
          updateDietOrderStatus(id, 'Selesai');
      }
  }

  const filteredDiets = useMemo(() => {
      return diets.filter(d => 
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          d.room.toLowerCase().includes(searchTerm.toLowerCase())
      )
  }, [diets, searchTerm]);

  const stats = useMemo(() => {
      return {
          biasa: diets.filter(d => d.diet.includes("Biasa")).length,
          lunak: diets.filter(d => d.diet.includes("Lunak")).length,
          cair: diets.filter(d => d.diet.includes("Cair")).length,
          khusus: diets.filter(d => !d.diet.includes("Biasa") && !d.diet.includes("Lunak") && !d.diet.includes("Cair")).length,
      }
  }, [diets]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-orange-500" /> Instalasi Gizi &
            Katering
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manajemen diet pasien rawat inap, restriksi alergi, dan distribusi
            makanan.
          </p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold flex items-center justify-center gap-2 text-sm transition-transform active:scale-95 w-full sm:w-auto">
          Cetak Label Diet Hari Ini
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">
                Daftar Distribusi Makanan (Siang)
              </h3>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari pasien / kamar..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {filteredDiets.map((d) => (
                <div
                  key={d.id}
                  className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 transition-colors group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded font-black text-[10px] uppercase tracking-widest shadow-sm">
                        {d.room}
                      </span>
                      <span className="font-bold text-slate-800 text-lg">
                        {d.name}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-600 flex flex-wrap items-center gap-4 mt-2">
                       <div className="flex-1 min-w-[150px]">
                        <strong className="text-slate-500 uppercase text-[10px] tracking-wider block mb-0.5">
                          Jenis Diet
                        </strong>
                        <span className="font-bold text-slate-700">{d.diet}</span>
                      </div>
                      {d.allergy !== "-" && (
                        <div className="flex-1 min-w-[150px]">
                          <strong className="text-rose-500 uppercase text-[10px] tracking-wider block mb-0.5">
                            <AlertTriangle className="w-3 h-3 inline pb-0.5" /> Peringatan Alergi
                          </strong>
                          <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100 text-xs">
                            {d.allergy}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                        d.status === "Selesai"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : d.status === "Diantar"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                        {d.status === "Selesai" && <CheckCircle className="w-3 h-3 inline mr-1 pb-0.5"/>}
                        {d.status === "Diantar" && <Clock className="w-3 h-3 inline mr-1 pb-0.5"/>}
                        {d.status === "Persiapan" && <Utensils className="w-3 h-3 inline mr-1 pb-0.5"/>}
                        {d.status}
                    </span>
                    {d.status !== 'Selesai' && (
                        <button 
                            onClick={() => updateStatus(d.id)}
                            className="bg-slate-100 hover:bg-orange-100 text-slate-600 hover:text-orange-700 p-2 rounded-lg transition-colors border border-slate-200 hover:border-orange-200 shadow-sm"
                            title="Update Status"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                    )}
                  </div>
                </div>
              ))}
               {filteredDiets.length === 0 && (
                   <div className="p-10 text-center text-slate-500 italic">Tidak ada jadwal diet yang sesuai.</div>
               )}
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6 self-start sticky top-24">
          <div>
            <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-4 flex items-center justify-between">
              Statistik Diet Pasien 
              <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px]">Siang Ini</span>
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">
                  Biasa (Nasi)
                </span>
                <span className="text-lg font-black text-slate-800 px-2 bg-white rounded shadow-sm border border-slate-200">{stats.biasa}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">
                  Lunak (Bubur)
                </span>
                <span className="text-lg font-black text-slate-800 px-2 bg-white rounded shadow-sm border border-slate-200">{stats.lunak}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">
                  Cair / Sonde
                </span>
                <span className="text-lg font-black text-slate-800 px-2 bg-white rounded shadow-sm border border-slate-200">{stats.cair}</span>
              </div>
               <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-bold text-slate-600">
                  Diet Khusus
                </span>
                <span className="text-lg font-black text-slate-800 px-2 bg-white rounded shadow-sm border border-slate-200">{stats.khusus}</span>
              </div>
            </div>
            
             <div className="mt-6">
                <div className="bg-rose-50 border border-rose-100 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                            <h5 className="text-sm font-bold text-rose-800 mb-1">Perhatian Khusus</h5>
                            <p className="text-xs text-rose-600 leading-relaxed">Terdapat <span className="font-bold">{diets.filter(d => d.allergy !== "-").length} pasien</span> dengan riwayat alergi pada blok distribusi makanan siang ini.</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
