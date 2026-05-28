import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, FileSpreadsheet, XCircle, X } from 'lucide-react';
import { useSRMStore, Patient } from '../../store/srmStore';

const SRMPasien = () => {
  const navigate = useNavigate();
  const patients = useSRMStore((state) => state.patients);
  const addPatient = useSRMStore((state) => state.addPatient);
  const updatePatient = useSRMStore((state) => state.updatePatient);
  const deletePatient = useSRMStore((state) => state.deletePatient);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    jenisKelamin: 'L',
    statusPernikahan: 'Belum Menikah',
    riwayatAlergi: 'Tidak Ada',
  });

  const [editPatient, setEditPatient] = useState<Partial<Patient>>({
    jenisKelamin: 'L',
    statusPernikahan: 'Belum Menikah',
    riwayatAlergi: 'Tidak Ada',
  });

  const filteredPatients = patients.filter(p => 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nik.includes(searchTerm) ||
    p.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PSN${(patients.length + 1).toString().padStart(4, '0')}`;
    const patientToAdd: Patient = {
      id,
      nik: newPatient.nik || '',
      namaLengkap: newPatient.namaLengkap || '',
      istri: newPatient.istri || '',
      pekerjaan: newPatient.pekerjaan || '',
      kotaLahir: newPatient.kotaLahir || '',
      tanggalLahir: newPatient.tanggalLahir || '',
      jenisKelamin: newPatient.jenisKelamin as 'L' | 'P',
      statusPernikahan: newPatient.statusPernikahan || '',
      riwayatAlergi: newPatient.riwayatAlergi || '',
      tanggalRegistrasi: new Date().toISOString().split('T')[0],
      jumlahKunjungan: 0
    };
    addPatient(patientToAdd);
    setIsAddModalOpen(false);
    setNewPatient({
      jenisKelamin: 'L',
      statusPernikahan: 'Belum Menikah',
      riwayatAlergi: 'Tidak Ada',
    });
  };

  const handleOpenEdit = (patient: Patient) => {
    setEditPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleEditPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPatient.id) return;
    updatePatient(editPatient.id, {
      nik: editPatient.nik || '',
      namaLengkap: editPatient.namaLengkap || '',
      istri: editPatient.istri || '',
      pekerjaan: editPatient.pekerjaan || '',
      kotaLahir: editPatient.kotaLahir || '',
      tanggalLahir: editPatient.tanggalLahir || '',
      jenisKelamin: editPatient.jenisKelamin as 'L' | 'P',
      statusPernikahan: editPatient.statusPernikahan || '',
      riwayatAlergi: editPatient.riwayatAlergi || '',
    });
    setIsEditModalOpen(false);
  };

  const handleDeletePatient = () => {
    if (selectedPatientId) {
      deletePatient(selectedPatientId);
      setSelectedPatientId(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleExportExcel = () => {
    if (filteredPatients.length === 0) {
      alert('Tidak ada data pasien untuk diexport.');
      return;
    }
    const headers = ["NO", "NO.RM", "NIK KTP", "NAMA LENGKAP", "ISTRI", "PEKERJAAN", "KOTA KELAHIRAN", "TGL LAHIR", "JENIS KELAMIN", "STATUS PERNIKAHAN", "RIWAYAT ALERGI"];
    const rows = filteredPatients.map((p, index) => [
      index + 1,
      p.id,
      `'${p.nik}`, // raw string format prefix for Excel compatibility
      p.namaLengkap,
      p.istri || '-',
      p.pekerjaan,
      p.kotaLahir,
      p.tanggalLahir,
      p.jenisKelamin,
      p.statusPernikahan,
      p.riwayatAlergi
    ]);

    const csvString = [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\r\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `data_pasien_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
        <h1 className="text-xl font-bold text-slate-800 uppercase tracking-wider">DATA MASTER PASIEN</h1>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto border border-slate-300 rounded-sm mb-4">
        <table className="w-full text-xs text-left whitespace-nowrap">
          <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">NO</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">NO.RM</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">NIK KTP</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300">NAMA</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300">ISTRI</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300">PEKERJAAN</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300">KOTA KELAHIRAN</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">TGL LAHIR</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">JENIS KELAMIN</th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">PERNIKAHAN</th>
              <th className="px-3 py-2 font-bold">RIWAYAT ALERGI</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-3 py-8 text-center text-slate-400 italic">Tidak ada data pasien ditemukan</td>
              </tr>
            ) : (
              filteredPatients.map((patient, index) => (
                <tr 
                  key={patient.id} 
                  onClick={() => setSelectedPatientId(patient.id)}
                  onDoubleClick={() => handleOpenEdit(patient)}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} ${selectedPatientId === patient.id ? 'bg-blue-100 border-blue-400' : 'hover:bg-blue-50'} border-b border-slate-200 cursor-pointer`}
                >
                  <td className="px-3 py-2 text-center border-r border-slate-300">{index + 1}</td>
                  <td className="px-3 py-2 text-center border-r border-slate-300 font-bold">{patient.id}</td>
                  <td className="px-3 py-2 text-center border-r border-slate-300">{patient.nik}</td>
                  <td className="px-3 py-2 border-r border-slate-300 font-bold">{patient.namaLengkap}</td>
                  <td className="px-3 py-2 border-r border-slate-300">{patient.istri || '-'}</td>
                  <td className="px-3 py-2 border-r border-slate-300">{patient.pekerjaan}</td>
                  <td className="px-3 py-2 border-r border-slate-300">{patient.kotaLahir}</td>
                  <td className="px-3 py-2 text-center border-r border-slate-300">{patient.tanggalLahir}</td>
                  <td className="px-3 py-2 text-center border-r border-slate-300">{patient.jenisKelamin}</td>
                  <td className="px-3 py-2 text-center border-r border-slate-300">{patient.statusPernikahan}</td>
                  <td className="px-3 py-2">{patient.riwayatAlergi}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-3 border border-slate-300 rounded-sm">
        <button 
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 text-green-600" /> TAMBAH
        </button>
        <button 
          className={`border text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm ${selectedPatientId ? 'bg-slate-100 border-slate-300 hover:bg-slate-200 cursor-pointer' : 'bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed text-slate-400'}`}
          disabled={!selectedPatientId}
          onClick={() => {
            const p = patients.find(pat => pat.id === selectedPatientId);
            if (p) handleOpenEdit(p);
          }}
        >
          <Edit className="w-4 h-4 text-blue-600" /> EDIT
        </button>
        <button 
          className={`border text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm ${selectedPatientId ? 'bg-slate-100 border-slate-300 hover:bg-slate-200 cursor-pointer' : 'bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed text-slate-400'}`}
          disabled={!selectedPatientId}
          onClick={() => setIsDeleteConfirmOpen(true)}
        >
          <Trash2 className="w-4 h-4 text-red-600" /> HAPUS
        </button>
        
        <div className="mx-auto">
          <button 
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> Export Ke Excel
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-bold text-slate-700 whitespace-nowrap">Cari Pasien :</label>
          <input 
            type="text" 
            placeholder="Masukkan No.RM/Nik.KTP/Nama..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500" 
          />
        </div>

        <button 
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-red-600 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm ml-auto"
          onClick={() => navigate('/srm')}
        >
          <XCircle className="w-4 h-4" /> KELUAR
        </button>
      </div>

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">Tambah Pasien Baru</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <form id="add-patient-form" onSubmit={handleAddPatient} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">NIK KTP <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={newPatient.nik || ''} onChange={e => setNewPatient({...newPatient, nik: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={newPatient.namaLengkap || ''} onChange={e => setNewPatient({...newPatient, namaLengkap: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kota Kelahiran <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={newPatient.kotaLahir || ''} onChange={e => setNewPatient({...newPatient, kotaLahir: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
                  <input required type="date" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={newPatient.tanggalLahir || ''} onChange={e => setNewPatient({...newPatient, tanggalLahir: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kelamin <span className="text-red-500">*</span></label>
                  <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={newPatient.jenisKelamin || 'L'} onChange={e => setNewPatient({...newPatient, jenisKelamin: e.target.value as 'L'|'P'})}>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status Pernikahan <span className="text-red-500">*</span></label>
                  <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={newPatient.statusPernikahan || 'Belum Menikah'} onChange={e => setNewPatient({...newPatient, statusPernikahan: e.target.value})}>
                    <option value="Belum Menikah">Belum Menikah</option>
                    <option value="Menikah">Menikah</option>
                    <option value="Cerai">Cerai</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pekerjaan <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={newPatient.pekerjaan || ''} onChange={e => setNewPatient({...newPatient, pekerjaan: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Suami/Istri</label>
                  <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={newPatient.istri || ''} onChange={e => setNewPatient({...newPatient, istri: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Riwayat Alergi</label>
                  <textarea className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" rows={3} value={newPatient.riwayatAlergi || ''} onChange={e => setNewPatient({...newPatient, riwayatAlergi: e.target.value})}></textarea>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-lg">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50">Batal</button>
              <button type="submit" form="add-patient-form" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">Simpan Pasien</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">Update Data Pasien - {editPatient.id}</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <form id="edit-patient-form" onSubmit={handleEditPatient} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">NIK KTP <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={editPatient.nik || ''} onChange={e => setEditPatient({...editPatient, nik: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={editPatient.namaLengkap || ''} onChange={e => setEditPatient({...editPatient, namaLengkap: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kota Kelahiran <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={editPatient.kotaLahir || ''} onChange={e => setEditPatient({...editPatient, kotaLahir: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
                  <input required type="date" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={editPatient.tanggalLahir || ''} onChange={e => setEditPatient({...editPatient, tanggalLahir: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kelamin <span className="text-red-500">*</span></label>
                  <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={editPatient.jenisKelamin || 'L'} onChange={e => setEditPatient({...editPatient, jenisKelamin: e.target.value as 'L'|'P'})}>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status Pernikahan <span className="text-red-500">*</span></label>
                  <select required className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={editPatient.statusPernikahan || 'Belum Menikah'} onChange={e => setEditPatient({...editPatient, statusPernikahan: e.target.value})}>
                    <option value="Belum Menikah">Belum Menikah</option>
                    <option value="Menikah">Menikah</option>
                    <option value="Cerai">Cerai</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pekerjaan <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={editPatient.pekerjaan || ''} onChange={e => setEditPatient({...editPatient, pekerjaan: e.target.value})} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Suami/Istri</label>
                  <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" value={editPatient.istri || ''} onChange={e => setEditPatient({...editPatient, istri: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Riwayat Alergi</label>
                  <textarea className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" rows={3} value={editPatient.riwayatAlergi || ''} onChange={e => setEditPatient({...editPatient, riwayatAlergi: e.target.value})}></textarea>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-lg">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50">Batal</button>
              <button type="submit" form="edit-patient-form" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Konfirmasi Hapus</h3>
            <p className="text-sm text-slate-600 mb-6">
              Apakah Anda yakin ingin menghapus data pasien dengan nomor rekam medis <strong>{selectedPatientId}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)} 
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
              >
                Batal
              </button>
              <button 
                onClick={handleDeletePatient} 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SRMPasien;
