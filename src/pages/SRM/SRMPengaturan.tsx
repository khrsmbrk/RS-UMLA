import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Edit, Trash2, Save, XCircle, FolderOpen, X } from 'lucide-react';
import { useSRMStore, Operator } from '../../store/srmStore';

const SRMPengaturan = () => {
  const navigate = useNavigate();
  const { operators, settings, updateSettings, addOperator, updateOperator, deleteOperator } = useSRMStore();
  const [localSettings, setLocalSettings] = useState(settings);
  
  const [selectedOpId, setSelectedOpId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [opForm, setOpForm] = useState<Partial<Operator>>({});

  const handleSettingChange = (field: keyof typeof settings, value: string) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    alert('Pengaturan berhasil disimpan!');
  };

  const handleCheckboxChange = (field: keyof Operator['permissions']) => {
    setOpForm(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [field]: !prev.permissions?.[field]
      } as any
    }));
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setOpForm({
      kode: `OP00${operators.length + 1}`,
      nama: '',
      passwordHash: '',
      permissions: {
        kunjungan: false, rekamMedis: false, laporan: false, pasien: false,
        pemeriksaan: false, diagnosis: false, tindakan: false, layananTambahan: false, pengaturan: false
      }
    });
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    if (!selectedOpId) return alert('Pilih operator terlebih dahulu');
    const op = operators.find(o => o.id === selectedOpId);
    if (op) {
      setIsEdit(true);
      setOpForm({ ...op });
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = () => {
    if (!selectedOpId) return alert('Pilih operator terlebih dahulu');
    if (confirm('Yakin ingin menghapus operator ini?')) {
      deleteOperator(selectedOpId);
      setSelectedOpId(null);
    }
  };

  const handleSaveOperator = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      if (opForm.id) updateOperator(opForm.id, opForm);
    } else {
      addOperator({
        ...opForm as Operator,
        id: `OP-${Date.now()}`
      });
    }
    setIsModalOpen(false);
  };

  const handleBackupData = () => {
    const state = useSRMStore.getState();
    const dataToBackup = {
      patients: state.patients,
      queueToday: state.queueToday,
      visits: state.visits,
      doctors: state.doctors,
      doctorSchedules: state.doctorSchedules,
      operators: state.operators,
      settings: state.settings,
      integrationConfig: state.integrationConfig
    };
    
    const jsonString = JSON.stringify(dataToBackup, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const fileName = `Backup_SIM_RS_${new Date().toISOString().split('T')[0]}.json`;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Backup data berhasil diunduh dengan nama: ${fileName}`);
  };

  const handleRestoreData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        useSRMStore.setState(json);
        alert('Data berhasil di-restore!');
      } catch (error) {
        alert('Format file backup tidak valid.');
        console.error(error);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2 border-b border-slate-200 pb-2">
        <h1 className="text-xl font-bold text-slate-800 uppercase tracking-wider">PENGATURAN</h1>
      </div>

      {/* Operators Table */}
      <div className="border border-slate-300 rounded-sm overflow-auto max-h-64">
        <table className="w-full text-xs text-left whitespace-nowrap">
          <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">NO</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">KODE</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300">NAMA</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300">PASSWORD</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">KUNJUNGAN</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">REKAM MEDIS</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">LAPORAN</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">PASIEN</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">PEMERIKSAAN</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">DIAGNOSIS</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">TINDAKAN</th>
              <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">LAYANAN TAMBAHAN</th>
              <th className="px-2 py-2 font-bold text-center">PENGATURAN</th>
            </tr>
          </thead>
          <tbody>
            {operators.map((op, index) => (
              <tr 
                key={op.id} 
                onClick={() => setSelectedOpId(op.id)}
                className={`${selectedOpId === op.id ? 'bg-blue-100' : 'bg-white'} hover:bg-slate-50 border-b border-slate-200 cursor-pointer`}
              >
                <td className="px-2 py-2 text-center border-r border-slate-300 text-green-600 font-bold">{index + 1}</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.kode}</td>
                <td className="px-2 py-2 border-r border-slate-300 font-bold">{op.nama}</td>
                <td className="px-2 py-2 border-r border-slate-300">*****</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.permissions.kunjungan ? 'True' : 'False'}</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.permissions.rekamMedis ? 'True' : 'False'}</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.permissions.laporan ? 'True' : 'False'}</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.permissions.pasien ? 'True' : 'False'}</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.permissions.pemeriksaan ? 'True' : 'False'}</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.permissions.diagnosis ? 'True' : 'False'}</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.permissions.tindakan ? 'True' : 'False'}</td>
                <td className="px-2 py-2 text-center border-r border-slate-300 font-bold">{op.permissions.layananTambahan ? 'True' : 'False'}</td>
                <td className="px-2 py-2 text-center font-bold">{op.permissions.pengaturan ? 'True' : 'False'}</td>
              </tr>
            ))}
            {/* Empty rows to fill space like in screenshot */}
            {[...Array(Math.max(0, 5 - operators.length))].map((_, i) => (
              <tr key={`empty-${i}`} className="bg-white border-b border-slate-200">
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4 border-r border-slate-300"></td>
                <td className="px-2 py-4"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Operator Buttons */}
      <div className="flex gap-2 mb-2">
        <button 
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm relative"
          onClick={handleAddClick}
        >
          <UserPlus className="w-4 h-4 text-green-600" /> Tambah Operator Baru
        </button>
        <button 
          className={`border px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm ${selectedOpId ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'}`}
          onClick={handleEditClick}
          disabled={!selectedOpId}
        >
          <Edit className="w-4 h-4 text-blue-600" /> Edit
        </button>
        <button 
          className={`border px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm ${selectedOpId ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'}`}
          onClick={handleDeleteClick}
          disabled={!selectedOpId}
        >
          <Trash2 className="w-4 h-4 text-red-600" /> Hapus
        </button>
      </div>

      {/* Settings Forms */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Left Column - Headers */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 border border-slate-300 rounded-sm p-3">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Header-1</h3>
            <textarea 
              className="w-full border border-slate-300 rounded p-2 text-sm h-24 focus:outline-none focus:border-blue-500 font-bold"
              value={localSettings.header1}
              onChange={(e) => handleSettingChange('header1', e.target.value)}
            ></textarea>
          </div>
          <div className="bg-slate-50 border border-slate-300 rounded-sm p-3">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Header-2</h3>
            <textarea 
              className="w-full border border-slate-300 rounded p-2 text-sm h-24 focus:outline-none focus:border-blue-500 font-bold"
              value={localSettings.header2}
              onChange={(e) => handleSettingChange('header2', e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Middle Column - Title & Version */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 border border-slate-300 rounded-sm p-3">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Title Bar</h3>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:border-blue-500 font-bold uppercase"
              value={localSettings.titleBar}
              onChange={(e) => handleSettingChange('titleBar', e.target.value)}
            />
          </div>
          <div className="bg-slate-50 border border-slate-300 rounded-sm p-3 flex-1">
            <h3 className="text-sm font-bold text-slate-700 mb-2 uppercase">VERSI</h3>
            <div className="w-full border border-slate-300 rounded p-2 text-sm h-32 bg-white text-slate-500 font-medium">
              Versi {new Date().getFullYear()}.{['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][new Date().getMonth()]}.{new Date().getDate()}<br/>
              Builder by Kharizer
            </div>
          </div>
        </div>

        {/* Right Column - Backup */}
        <div className="bg-slate-50 border border-slate-300 rounded-sm p-3 flex flex-col">
          <h3 className="text-sm font-bold text-slate-700 mb-4">BackUp Data Pelanggan :</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-1">Lokasi BackUp Data Pelanggan :</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={localSettings.backupFolder} 
                onChange={e => handleSettingChange('backupFolder', e.target.value)} 
                className="flex-1 border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500" 
              />
              <button 
                className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1.5 rounded shadow-sm"
                onClick={() => {
                  const val = prompt('Masukkan direktori backup:', localSettings.backupFolder);
                  if (val) handleSettingChange('backupFolder', val);
                }}
              >
                <FolderOpen className="w-4 h-4 text-blue-600" />
              </button>
            </div>
            <p className="text-xs font-bold text-red-600 mt-2">Nama Folder Tidak Boleh Menggunakan Spasi...!!!</p>
          </div>

          <div className="flex justify-end mb-8">
            <button 
              className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
              onClick={handleBackupData}
            >
              <Save className="w-4 h-4 text-green-600" /> BackUp
            </button>
          </div>

          <div className="mt-auto">
            <label className="block text-sm font-bold text-slate-700 mb-1">Pilih File Backup Untuk Di Restore:</label>
            <div className="flex gap-2">
              <input 
                type="file" 
                className="flex-1 border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500" 
                accept=".json" 
                onChange={handleRestoreData}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Action Buttons */}
      <div className="flex justify-end gap-2 mt-2 pt-4 border-t border-slate-200">
        <button 
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          onClick={handleSaveSettings}
        >
          <Save className="w-4 h-4 text-green-600" /> Simpan
        </button>
        <button 
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-red-600 px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          onClick={() => navigate('/srm')}
        >
          <XCircle className="w-4 h-4" /> Keluar
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center bg-slate-100 border-b border-slate-300 p-4">
              <h2 className="text-lg font-bold text-slate-800">{isEdit ? 'Edit Operator' : 'Tambah Operator Baru'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveOperator} className="p-4 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Kode Operator</label>
                  <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={opForm.kode || ''} onChange={e => setOpForm({...opForm, kode: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={opForm.nama || ''} onChange={e => setOpForm({...opForm, nama: e.target.value})} required />
                </div>
                {!isEdit && (
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                    <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={opForm.passwordHash || ''} onChange={e => setOpForm({...opForm, passwordHash: e.target.value})} required />
                  </div>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">Hak Akses Modul</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.keys(opForm.permissions || {}).map((key) => (
                  <label key={key} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300"
                      checked={opForm.permissions?.[key as keyof Operator['permissions']] || false}
                      onChange={() => handleCheckboxChange(key as keyof Operator['permissions'])}
                    />
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-sm bg-slate-100 hover:bg-slate-200 border border-slate-300">Batal</button>
                <button type="submit" className="px-4 py-2 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2"><Save className="w-4 h-4"/> Simpan Operator</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SRMPengaturan;
