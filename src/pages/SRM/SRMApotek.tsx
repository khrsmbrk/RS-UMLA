import React, { useState } from "react";
import {
  Pill,
  Search,
  ClipboardList,
  CheckCircle,
  PackageSearch,
  XCircle,
  FileSpreadsheet,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";
import toast from "react-hot-toast";
import { useNavigate } from '@tanstack/react-router';

export default function SRMApotek() {
  const navigate = useNavigate();
  const { patients, masterData, apotekRecipes: recipes, updateApotekRecipeStatus } = useSRMStore();
  const [searchTerm, setSearchTerm] = useState("");
  const obatList = masterData["obat"] || [];

  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col md:flex-row gap-4">
      {/* Kiri - Daftar Antrean Resep */}
      <div className="w-full md:w-1/3 flex flex-col gap-4 border-r border-slate-200 pr-4">
        <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-2 bg-slate-50 p-2 rounded">
          <Pill className="w-5 h-5 text-indigo-600" />
          <h1 className="text-xl font-bold text-slate-800 uppercase">
            Farmasi & Apotek
          </h1>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari Resep/Pasien..."
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>

        <div className="flex-1 overflow-auto bg-slate-50 border border-slate-300 rounded">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe.id)}
              className={`p-3 border-b border-slate-200 cursor-pointer hover:bg-indigo-50 ${selectedRecipe === recipe.id ? "bg-indigo-100 border-l-4 border-l-indigo-600" : "bg-white"}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800 text-sm">
                  {recipe.id}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {recipe.time} WIB
                </span>
              </div>
              <div className="text-sm font-medium text-slate-700">
                {recipe.pasien}{" "}
                <span className="text-slate-500 font-normal">
                  ({recipe.noRM})
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {recipe.dokter} - {recipe.poli}
              </div>
              <div className="mt-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    recipe.status === "Menunggu"
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : recipe.status === "Diramu"
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {recipe.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanan - Detail Resep & Obat */}
      <div className="flex-1 flex flex-col gap-4">
        {selectedRecipe ? (
          <>
            <div className="bg-slate-50 border border-slate-300 rounded p-4 flex justify-between items-start shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  Detail Resep: {selectedRecipe}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Pasien:{" "}
                  <span className="font-bold text-slate-700">
                    Siti Aminah (PSN0002)
                  </span>
                </p>
                <p className="text-sm text-slate-500">
                  Dokter:{" "}
                  <span className="font-bold text-slate-700">
                    Dr. Citra - Poli Gigi
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    updateApotekRecipeStatus(selectedRecipe, "Selesai");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Tandai Selesai & Serahkan
                </button>
              </div>
            </div>

            <div className="border border-slate-300 rounded bg-white flex-1 flex flex-col overflow-hidden shadow-sm">
              <div className="bg-slate-100 p-2 border-b border-slate-300 flex items-center gap-2 font-bold text-slate-700 text-sm">
                <ClipboardList className="w-4 h-4" /> Daftar Obat Diresepkan
              </div>
              <div className="flex-1 overflow-auto p-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-300">
                    <tr>
                      <th className="py-2 px-3">Nama Obat</th>
                      <th className="py-2 px-3">Aturan Pakai</th>
                      <th className="py-2 px-3 text-center">Jumlah</th>
                      <th className="py-2 px-3 text-right">Harga Satuan</th>
                      <th className="py-2 px-3 text-right">Subtotal</th>
                      <th className="py-2 px-3 text-center">Stok</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-slate-800">
                        Amoxicillin 500mg
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        3 x 1 Sesudah Makan
                      </td>
                      <td className="py-2 px-3 text-center font-medium">15</td>
                      <td className="py-2 px-3 text-right text-slate-600">
                        Rp 500
                      </td>
                      <td className="py-2 px-3 text-right font-medium">
                        Rp 7.500
                      </td>
                      <td className="py-2 px-3 text-center text-emerald-600 font-bold">
                        Tersedia
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-slate-800">
                        Paracetamol 500mg
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        3 x 1 Bila Demam
                      </td>
                      <td className="py-2 px-3 text-center font-medium">10</td>
                      <td className="py-2 px-3 text-right text-slate-600">
                        Rp 200
                      </td>
                      <td className="py-2 px-3 text-right font-medium">
                        Rp 2.000
                      </td>
                      <td className="py-2 px-3 text-center text-emerald-600 font-bold">
                        Tersedia
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-300 font-bold text-slate-800">
                    <tr>
                      <td colSpan={4} className="py-3 px-3 text-right">
                        Total Biaya Obat:
                      </td>
                      <td className="py-3 px-3 text-right">Rp 9.500</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded flex gap-3 text-sm text-amber-800">
              <PackageSearch className="w-5 h-5 flex-shrink-0" />
              <p>
                Obat ini akan secara otomatis mengurangi master stok saat
                ditandai "Selesai & Serahkan", dan tagihan akan otomatis masuk
                ke Modul Kasir.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 h-full border-2 border-dashed border-slate-200 rounded p-8">
            <Pill className="w-16 h-16 mb-4 text-slate-300" />
            <p className="font-medium text-lg">Pilih resep pada antrean</p>
            <p className="text-sm">
              Anda akan melihat detail obat dan tagihan di sini
            </p>
          </div>
        )}
      </div>

      {/* Floating Back Button */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() => navigate({ to: "/srm" })}
          className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-slate-50"
        >
          <XCircle className="w-4 h-4 text-red-600" /> KELUAR MODUL
        </button>
      </div>
    </div>
  );
}
