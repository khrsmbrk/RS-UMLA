import React, { useState } from 'react';
import { User, Briefcase, MapPin, Phone, Mail, Edit2 } from 'lucide-react';

const ProfileCard = ({ employee }: { employee: any }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      <div className="bg-blue-600 h-24 relative">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      <div className="px-6 pb-6 w-full">
        <div className="-mt-12 mb-4 relative z-10 w-24 h-24">
          <div className="w-24 h-24 bg-white rounded-full p-1 border border-slate-100 shadow-sm">
            <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-3xl font-bold">
              {employee.name.charAt(0)}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-slate-800">{employee.name}</h2>
          <p className="text-sm text-blue-600 font-medium mb-4">{employee.jabatan} • {employee.unit}</p>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-slate-600">
              <Briefcase className="w-4 h-4 mr-3 text-slate-400" />
              <span>NIP: {employee.nip}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <User className="w-4 h-4 mr-3 text-slate-400" />
              <span>Status: {employee.statusKepegawaian}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Phone className="w-4 h-4 mr-3 text-slate-400" />
              <span>{employee.kontak}</span>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="border-t border-slate-100 p-6 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Edit Profil (Simulasi)</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nomor Telepon</label>
              <input type="text" defaultValue={employee.kontak} className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Alamat</label>
              <textarea rows={2} className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Masukkan alamat..."></textarea>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Batal</button>
              <button onClick={() => { alert('Profil berhasil diperbarui (Simulasi)'); setIsEditing(false); }} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
