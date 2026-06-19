import React, { useState } from "react";
import { User, Briefcase, MapPin, Phone, Mail, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

const ProfileCard = ({ employee }: { employee: any }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-28 relative">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-sm transition-colors border border-white/10"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      <div className="px-6 pb-6 w-full">
        <div className="-mt-14 mb-4 relative z-10 w-28 h-28">
          <div className="w-28 h-28 bg-white rounded-2xl p-1.5 border border-slate-200 shadow-sm rotate-3 hover:rotate-0 transition-transform">
            <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-800 text-3xl font-black bg-gradient-to-br from-emerald-100 to-teal-50">
              {employee.name.charAt(0)}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            {employee.name}
          </h2>
          <p className="text-sm text-emerald-600 font-bold mt-1 mb-5">
            {employee.jabatan} • {employee.unit}
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 mr-3">
                <Briefcase className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  NIP / ID Karyawan
                </p>
                <span className="font-mono font-medium text-slate-700">
                  {employee.nip}
                </span>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 mr-3">
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Status Kepegawaian
                </p>
                <span className="font-bold text-slate-700">
                  {employee.statusKepegawaian}
                </span>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 mr-3">
                <Phone className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Kontak
                </p>
                <span className="font-bold text-slate-700">
                  {employee.kontak}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="border-t border-slate-200 p-6 bg-slate-50/50">
          <h3 className="text-sm font-black text-slate-800 mb-4">
            Edit Profil (Simulasi)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Nomor Telepon
              </label>
              <input
                type="text"
                defaultValue={employee.kontak}
                className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Alamat
              </label>
              <textarea
                rows={2}
                className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-medium"
                placeholder="Masukkan alamat..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  toast.success("Profil berhasil diperbarui (Simulasi)");
                  setIsEditing(false);
                }}
                className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
