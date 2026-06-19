import React from "react";
import { useNavigate } from '@tanstack/react-router';
import { ShieldAlert } from "lucide-react";

const AccessDenied = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-lg shadow-sm border border-slate-200 m-4">
      <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
        <ShieldAlert className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500 max-w-md">
        Akses ke halaman ini dibatasi. Anda memerlukan otorisasi administrator tingkat lanjut atau modul ini belum dipublikasikan untuk peran Anda.
        Silakan hubungi IT Support RS jika Anda membutuhkan akses ini.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-8 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md transition-colors shadow-sm"
      >
        Kembali ke Halaman Sebelumnya
      </button>
    </div>
  );
};

export default AccessDenied;
