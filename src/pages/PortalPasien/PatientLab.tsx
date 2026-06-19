import React from "react";
import {
  Microscope,
  Activity,
  FileText,
  Download,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PatientLab() {
  const handleDownload = (filename: string) => {
    toast.success(`Simulasi: Mengunduh file ${filename} (PDF)...`);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Microscope className="w-5 h-5 text-indigo-600" /> Hasil
            Laboratorium & Radiologi
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Akses riwayat hasil pemeriksaan penunjang medis Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lab Results */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" /> Laboratorium
              Patologi Klinik
            </h3>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-slate-100">
              <li className="p-4 hover:bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">
                      Cek Darah Lengkap & Profil Lipid
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 20 Mar 2026
                      </span>
                      <span>Dr. Herman, Sp.PK</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload("Hasil_Lab_Darah_Lipid.pdf")}
                    className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded border border-indigo-100 hover:bg-indigo-100 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </div>
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-xs font-semibold text-red-800 mb-1">
                    Highlight Pemeriksaan (Out of Range):
                  </p>
                  <ul className="text-xs text-red-700 list-disc list-inside">
                    <li>
                      Kolesterol Total: 215 mg/dL{" "}
                      <span className="font-bold opacity-70">
                        (Normal &lt; 200)
                      </span>
                    </li>
                    <li>
                      Trigliserida: 180 mg/dL{" "}
                      <span className="font-bold opacity-70">
                        (Normal &lt; 150)
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="p-4 hover:bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">
                      Glukosa Puasa & HBA1C
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 15 Jan 2026
                      </span>
                      <span>Dr. Herman, Sp.PK</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload("Hasil_Lab_Glukosa.pdf")}
                    className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded border border-indigo-100 hover:bg-indigo-100 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </div>
                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <p className="text-xs font-semibold text-emerald-800">
                    Semua hasil dalam batas normal.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Radiology Results */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" /> Radiologi &
              Pencitraan
            </h3>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-slate-100">
              <li className="p-4 hover:bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">
                      Rontgen Thorax AP/PA
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 10 Des 2025
                      </span>
                      <span>Dr. Rini, Sp.Rad</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload("Hasil_Rad_Thorax.pdf")}
                    className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded border border-indigo-100 hover:bg-indigo-100 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Hasil
                  </button>
                </div>
                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <p className="font-semibold mb-1">Kesimpulan (Expertise):</p>
                  <p>
                    Cor dan Pulmo dalam batas normal. Tidak tampak kardiomegali.
                    Tidak tampak infiltrat/spesifik proses pada kedua paru.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
