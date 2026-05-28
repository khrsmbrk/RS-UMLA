import React, { useState } from 'react';
import { Search, Users as UsersIcon } from 'lucide-react';
import { EMPLOYEES } from '../../data/employees';
import { getFilteredEmployees } from '../../utils/filters';
import QrAttendanceModule from '../../components/QrAttendanceModule';
import EmployeeQrGenerator from '../../components/EmployeeQrGenerator';
import EmployeeTable from '../../components/EmployeeTable';
import StatsCards from '../../components/StatsCards';
import { useOfficeStore } from './store/officeStore';

export default function OfficeHRD() {
  const [activeModule, setActiveModule] = useState('karyawan');
  const [divisiFilter, setDivisiFilter] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const { userRole } = useOfficeStore();
  
  // Create a mock session object for components that need it
  const session = {
    role: ['wadir_admin', 'direktur', 'bph', 'kasubag_data'].includes(userRole || '') ? 'management' : 'staff',
    name: 'Admin HRD / SDM'
  };

  const filteredEmployees = getFilteredEmployees(EMPLOYEES, divisiFilter, searchQuery, session);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-blue-600" /> Data Kepegawaian (HRD)
          </h1>
          <p className="text-slate-500 mt-1">
            Manajemen data pegawai, absensi QR, dan ID Card.
          </p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveModule("karyawan")}
          className={`px-4 py-2 text-sm rounded-full font-bold transition ${
            activeModule === "karyawan"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Data Karyawan
        </button>
        <button
          onClick={() => setActiveModule("absensi")}
          className={`px-4 py-2 text-sm rounded-full font-bold transition ${
            activeModule === "absensi"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Absensi QR
        </button>
        <button
          onClick={() => setActiveModule("qr_generator")}
          className={`px-4 py-2 text-sm rounded-full font-bold transition ${
            activeModule === "qr_generator"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Generate QR (ID Card)
        </button>
      </div>

      {activeModule === "karyawan" && (
        <div className="space-y-6">
          <StatsCards employees={filteredEmployees} user={session} />
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center w-full md:w-1/2 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3" />
              <input 
                type="text" 
                placeholder="Cari nama karyawan..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div className="w-full md:w-auto">
              <select 
                value={divisiFilter}
                onChange={(e) => setDivisiFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 font-medium text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 outline-none transition-all"
              >
                <option value="semua">Semua Divisi</option>
                <option value="puncak">Puncak</option>
                <option value="medis">Medis</option>
                <option value="keperawatan">Keperawatan</option>
                <option value="operasional">Operasional</option>
              </select>
            </div>
          </div>

          <EmployeeTable employees={filteredEmployees} />
        </div>
      )}

      {activeModule === "absensi" && (
        <QrAttendanceModule user={session} />
      )}

      {activeModule === "qr_generator" && (
        <EmployeeQrGenerator />
      )}
    </div>
  );
}
