import React, { useState } from 'react';
import { Lock, Save, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SRMPassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Password baru dan konfirmasi tidak cocok!');
      return;
    }
    toast.success('Password berhasil diperbarui (Simulasi)');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-6 h-full flex flex-col max-w-md mx-auto mt-10">
      <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-2">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" /> Ubah Password
        </h1>
        <button onClick={() => navigate('/srm')} className="text-slate-400 hover:text-red-500">
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Password Lama
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Password Baru
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-2">
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
        >
          <Save className="w-4 h-4" /> SIMPAN
        </button>
      </div>
    </div>
  );
}
