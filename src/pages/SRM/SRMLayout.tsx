import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from '@tanstack/react-router';
import { 
  UserPlus, ClipboardList, LayoutDashboard, Users, Search, 
  FileText, MessageCircle, Syringe, BarChart2, Settings, XCircle,
  ChevronDown
} from 'lucide-react';
import { useSRMStore } from '../../store/srmStore';
import toast from 'react-hot-toast';

const SRMLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { settings } = useSRMStore();

  useEffect(() => {
    document.title = settings.titleBar;
  }, [settings.titleBar]);

  const showVersion = () => {
    const date = new Date();
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    toast(`Versi ${date.getFullYear()}.${months[date.getMonth()]}.${date.getDate()}\nBuilder by Kharizer`, { duration: 4000 });
  };

  const toggleMenu = (menu: string) => {
    if (activeMenu === menu) setActiveMenu(null);
    else setActiveMenu(menu);
  };

  const closeMenu = () => setActiveMenu(null);

  const toolbarItems = [
    { name: 'Kunjungan', icon: UserPlus, path: '/srm/kunjungan' },
    { name: 'Data Rekam Medis', icon: ClipboardList, path: '/srm/rekam-medis' },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/srm/dashboard' },
    { name: 'Antrian Pasien', icon: Users, path: '/srm/antrian' },
    { name: 'Pencarian Lanjutan', icon: Search, path: '/srm/pencarian' },
    { name: 'Laporan PDF', icon: FileText, path: '/srm/laporan-pdf' },
    { name: 'WhatsApp Reminder', icon: MessageCircle, path: '/srm/wa-reminder' },
    { name: 'Riwayat Vaksinasi', icon: Syringe, path: '/srm/vaksinasi' },
    { name: 'Laporan', icon: BarChart2, path: '/srm/laporan' },
    { name: 'Pengaturan', icon: Settings, path: '/srm/pengaturan' },
    { name: 'Keluar', icon: XCircle, path: '/', isExit: true },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-sm print:bg-white" onClick={() => activeMenu && closeMenu()}>
      {/* Top Menu Bar */}
      <div className="bg-slate-50 border-b border-slate-300 flex items-center px-2 py-1 text-xs print:hidden">
        <Link 
          to="/srm/wa-reminder"
          className="px-3 py-1 hover:bg-blue-100 rounded"
        >
          Reminder
        </Link>
        
        <div className="relative">
          <button 
            className={`px-3 py-1 hover:bg-blue-100 rounded flex items-center ${activeMenu === 'integrasi' ? 'bg-blue-200' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleMenu('integrasi'); }}
          >
            Integrasi
          </button>
          {activeMenu === 'integrasi' && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-300 shadow-lg z-50 py-1">
              <Link to="/srm/integrasi/bpjs" className="block px-4 py-1.5 hover:bg-blue-100">Bridging BPJS</Link>
              <Link to="/srm/integrasi/satusehat" className="block px-4 py-1.5 hover:bg-blue-100">Satu Sehat</Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            className={`px-3 py-1 hover:bg-blue-100 rounded flex items-center ${activeMenu === 'kunjungan' ? 'bg-blue-200' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleMenu('kunjungan'); }}
          >
            Kunjungan
          </button>
          {activeMenu === 'kunjungan' && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-300 shadow-lg z-50 py-1">
              <Link to="/srm/kunjungan" className="block px-4 py-1.5 hover:bg-blue-100">Kunjungan</Link>
              <Link to="/srm/rekam-medis" className="block px-4 py-1.5 hover:bg-blue-100">Data Rekam Medis</Link>
              <Link to="/srm/laporan" className="block px-4 py-1.5 hover:bg-blue-100">Laporan</Link>
              <Link to="/srm/antrian" className="block px-4 py-1.5 hover:bg-blue-100">Antrian Pasien</Link>
              <Link to="/srm/dashboard" className="block px-4 py-1.5 hover:bg-blue-100">Dashboard</Link>
              <hr className="my-1 border-slate-200" />
              <Link to="/" className="block px-4 py-1.5 hover:bg-blue-100 flex justify-between">
                <span>Keluar</span>
                <span className="text-slate-400 text-[10px]">Ctrl+X</span>
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
             className={`px-3 py-1 hover:bg-blue-100 rounded flex items-center ${activeMenu === 'modul' ? 'bg-blue-200' : ''}`}
             onClick={(e) => { e.stopPropagation(); toggleMenu('modul'); }}
          >
            Modul Pelayanan
          </button>
          {activeMenu === 'modul' && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-300 shadow-lg z-50 py-1">
              <Link to="/srm/rawat-jalan" className="block px-4 py-1.5 hover:bg-blue-100">Poli / Rawat Jalan</Link>
              <Link to="/srm/rawat-inap" className="block px-4 py-1.5 hover:bg-blue-100">Bangsal / Rawat Inap</Link>
              <Link to="/srm/igd" className="block px-4 py-1.5 hover:bg-blue-100">IGD</Link>
              <Link to="/srm/apotek" className="block px-4 py-1.5 hover:bg-blue-100">Apotek / Farmasi</Link>
              <Link to="/srm/laboratorium" className="block px-4 py-1.5 hover:bg-blue-100">Laboratorium</Link>
              <Link to="/srm/radiologi" className="block px-4 py-1.5 hover:bg-blue-100">Radiologi</Link>
              <Link to="/srm/kasir" className="block px-4 py-1.5 hover:bg-blue-100">Kasir / Billing</Link>
              <Link to="/srm/logistik" className="block px-4 py-1.5 hover:bg-blue-100">Logistik Gudang</Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            className={`px-3 py-1 hover:bg-blue-100 rounded flex items-center ${activeMenu === 'master' ? 'bg-blue-200' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleMenu('master'); }}
          >
            Data Master
          </button>
          {activeMenu === 'master' && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-300 shadow-lg z-50 py-1">
              <Link to="/srm/pasien" className="block px-4 py-1.5 hover:bg-blue-100">Pasien</Link>
              <Link to="/srm/master/pemeriksaan-fisik" className="block px-4 py-1.5 hover:bg-blue-100">Pemeriksaan Fisik</Link>
              <Link to="/srm/master/pemeriksaan-penunjang" className="block px-4 py-1.5 hover:bg-blue-100">Pemeriksaan Penunjang</Link>
              <Link to="/srm/master/diagnosis" className="block px-4 py-1.5 hover:bg-blue-100">Diagnosis</Link>
              <Link to="/srm/master/terapi" className="block px-4 py-1.5 hover:bg-blue-100">Terapi</Link>
              <Link to="/srm/master/tindakan" className="block px-4 py-1.5 hover:bg-blue-100">Tindakan</Link>
              <Link to="/srm/master/obat" className="block px-4 py-1.5 hover:bg-blue-100">Obat</Link>
              <hr className="my-1 border-slate-200" />
              <Link to="/srm/pengaturan" className="block px-4 py-1.5 hover:bg-blue-100">Pengaturan</Link>
              <Link to="/srm/pengaturan" className="block px-4 py-1.5 hover:bg-blue-100">Printer</Link>
              <Link to="/srm/pengaturan" className="block px-4 py-1.5 hover:bg-blue-100">Backup Database</Link>
              <hr className="my-1 border-slate-200" />
              <button 
                className="block w-full text-left px-4 py-1.5 hover:bg-blue-100"
                onClick={showVersion}
              >
                About
              </button>
              <hr className="my-1 border-slate-200" />
              <Link to="/srm/master/template-diagnosis" className="block px-4 py-1.5 hover:bg-blue-100">Template Diagnosis</Link>
              <Link to="/srm/jadwal-dokter" className="block px-4 py-1.5 hover:bg-blue-100">Jadwal Dokter</Link>
            </div>
          )}
        </div>

        <Link 
          to="/srm/password"
          className="px-3 py-1 hover:bg-blue-100 rounded"
        >
          Password
        </Link>
        <Link 
          to="/srm/register"
          className="px-3 py-1 hover:bg-blue-100 rounded"
        >
          Register
        </Link>
        <button 
          className="px-3 py-1 hover:bg-blue-100 rounded text-slate-400"
          onClick={showVersion}
        >
          Versi
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-100 border-b border-slate-300 flex items-center px-2 py-2 overflow-x-auto print:hidden">
        {toolbarItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center min-w-[80px] px-2 py-1 mx-0.5 rounded border ${
                isActive && !item.isExit ? 'bg-slate-200 border-slate-300 shadow-inner' : 'border-transparent hover:bg-slate-200 hover:border-slate-300'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${item.isExit ? 'text-red-600' : 'text-slate-700'}`} />
              <span className="text-[10px] font-medium text-slate-800 text-center leading-tight">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-slate-50 p-4 print:p-0 print:bg-white print:overflow-visible">
        <Outlet />
      </div>
    </div>
  );
};

export default SRMLayout;
