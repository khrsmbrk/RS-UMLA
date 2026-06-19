import React, { useState } from 'react';
import { UserPlus, Save, XCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';

export default function SRMRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    role: 'Staff',
    password: ''
  });

  const handleSave = () => {
    toast.success('User baru berhasil didaftarkan (Simulasi)');
    setFormData({ username: '', fullName: '', role: 'Staff', password: '' });
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-6 flex flex-col max-w-lg mx-auto mt-10">
      <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-2">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-600" /> Register User Baru
        </h1>
        <button onClick={() => navigate({ to: '/srm' })} className="text-slate-400 hover:text-red-500">
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Username
          </label>
          <input
            type="text"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Role Akses
          </label>
          <select
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="Admin">Administrator</option>
            <option value="Dokter">Dokter</option>
            <option value="Perawat">Perawat</option>
            <option value="Staff">Staff Pendaftaran</option>
            <option value="Apoteker">Apoteker</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Password Default
          </label>
          <input
            type="password"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-2">
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
        >
          <Save className="w-4 h-4" /> DAFTAR
        </button>
      </div>
    </div>
  );
}
