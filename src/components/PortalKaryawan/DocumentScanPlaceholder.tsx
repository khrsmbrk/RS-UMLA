import React from "react";
import { ScanLine } from "lucide-react";
import toast from "react-hot-toast";

const DocumentScanPlaceholder = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-sm p-6 mb-6 text-white relative overflow-hidden">
      <div className="absolute -right-4 -top-4 opacity-10">
        <ScanLine className="w-32 h-32" />
      </div>
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-2">Pemindaian Dokumen</h3>
        <p className="text-xs text-blue-100 mb-4 max-w-[80%]">
          Fitur ini menggunakan kamera perangkat untuk memindai ID Card atau
          dokumen medis. (Tersedia di aplikasi mobile Android)
        </p>
        <button
          onClick={() => toast.success("Membuka kamera... (Simulasi)")}
          className="px-4 py-2 bg-white text-blue-700 text-sm font-bold rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
        >
          Buka Kamera
        </button>
      </div>
    </div>
  );
};

export default DocumentScanPlaceholder;
