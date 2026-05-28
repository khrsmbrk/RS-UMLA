import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useOfficeStore } from "./store/officeStore";
import { logout as authLogout } from "./store/auth";
import {
  Building2,
  LogOut,
  LayoutDashboard,
  Search,
  Bell,
  Menu,
  X,
  UserCircle,
  Users,
  FileText,
  CheckCircle,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function OfficeLayout() {
  const { userRole, logout } = useOfficeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!userRole) {
      navigate("/office/login");
    }
  }, [userRole, navigate]);

  if (!userRole) return null;

  const handleLogout = async () => {
    await authLogout();
    logout();
    navigate("/office/login");
  };

  const getRoleName = () => {
    const roleNames: Record<string, string> = {
      bph: "BPH Rumah Sakit",
      direktur: "Direktur",
      wadir_medis: "Wakil Direktur Medis",
      wadir_keuangan: "Wakil Direktur Keuangan",
      wadir_admin: "Wadir Administrasi & SDI",
      kabid_jalan: "Kabid Pelayanan Rawat Jalan",
      kabid_keperawatan: "Kabid Keperawatan",
      kepala_igd: "Kepala IGD",
      kepala_inap: "Kepala Instalasi Rawat Inap",
      kepala_bedah: "Kepala Instalasi Bedah",
      kepala_farmasi: "Kepala Instalasi Farmasi",
      kepala_gizi: "Kepala Instalasi Gizi",
      kepala_lab: "Kepala Instalasi Lab",
      kepala_rad: "Kepala Instalasi Radiologi",
      kepala_paviliun: "Kepala Unit Paviliun",
      kasubag_data: "Kasubag Pengolahan Data",
      kasubag_akuntansi: "Kasubag Akuntansi",
      kasubag_pasar: "Kasubag Pemasaran / PKRS",
      bendahara: "Bendahara",
      kasubag_aset: "Kasubag Penjagaan Aset",
      kasubag_kebersihan: "Kasubag Kebersihan",
      pkrs: "Petugas PKRS",
      developer_web: "Developer Web",
      dokter_umum: "Dokter Umum",
      dokter_gigi: "Dokter Gigi",
      dokter_spesialis: "Dokter Spesialis",
      perawat: "Perawat",
      paramedis: "Paramedis / Bidan",
      apoteker: "Apoteker",
      ahli_gizi: "Ahli Gizi",
      analis_lab: "Analis Laboratorium",
      radiografer: "Radiografer",
      tenaga_adm: "Tenaga Administrasi",
    };
    return roleNames[userRole] || "Pegawai RSUMLA";
  };

  const isBph = ["bph"].includes(userRole);
  const isDireksi = [
    "direktur",
    "wadir_medis",
    "wadir_keuangan",
    "wadir_admin",
  ].includes(userRole);
  const isManajemen = [
    "kabid_jalan",
    "kabid_keperawatan",
    "kepala_igd",
    "kepala_inap",
    "kepala_bedah",
    "kepala_farmasi",
    "kepala_gizi",
    "kepala_lab",
    "kepala_rad",
    "kepala_paviliun",
    "kasubag_data",
    "kasubag_akuntansi",
    "kasubag_pasar",
    "bendahara",
    "kasubag_aset",
    "kasubag_kebersihan",
  ].includes(userRole);
  const isNakes = [
    "dokter_umum",
    "dokter_gigi",
    "dokter_spesialis",
    "perawat",
    "paramedis",
    "apoteker",
    "ahli_gizi",
    "analis_lab",
    "radiografer",
  ].includes(userRole);
  const isKeuangan = [
    "wadir_keuangan",
    "kasubag_akuntansi",
    "bendahara",
  ].includes(userRole);
  const isAset = ["wadir_admin", "kasubag_aset", "kasubag_kebersihan"].includes(
    userRole,
  );
  const isSDM = ["wadir_admin", "tenaga_adm", "kasubag_data"].includes(
    userRole,
  );

  const isAdminIT = ["tenaga_adm", "kasubag_data", "developer_web"].includes(userRole);

  const menuItems: any[] = [];

  // Semua Role
  menuItems.push({
    path: "/office/dashboard",
    label: "Home Dashboard",
    icon: LayoutDashboard,
  });
  menuItems.push({ path: "/office/chat", label: "Pesan Internal", icon: Bell });
  menuItems.push({
    path: "/office/ess",
    label: "Cuti & Slip Gaji",
    icon: FileText,
  });
  menuItems.push({
    path: "/office/appraisal",
    label: "KPI Saya",
    icon: CheckCircle,
  });
  menuItems.push({
    path: "/office/calendar",
    label: "E-Meeting",
    icon: Calendar,
  });
  menuItems.push({
    path: "/office/incidents",
    label: "Pelaporan IKP",
    icon: AlertCircle,
  });

  if (isBph || isDireksi) {
    if (isKeuangan)
      menuItems.push({
        path: "/office/finance",
        label: "Keuangan Korporat",
        icon: TrendingUp,
      });
    menuItems.push({
      path: "/office/hr-analytics",
      label: "Kinerja Pegawai",
      icon: Users,
    });
    menuItems.push({
      path: "/office/audit",
      label: "Audit SPI",
      icon: AlertCircle,
    });
    menuItems.push({
      path: "/office/contracts",
      label: "Manajemen PKS",
      icon: FileText,
    });
    menuItems.push({
      path: "/office/nota-dinas",
      label: "Surat & Disposisi",
      icon: FileText,
    });
    menuItems.push({
      path: "/office/casemix",
      label: "Casemix & BPJS",
      icon: TrendingUp,
    });
  }

  if (isManajemen) {
    menuItems.push({
      path: "/office/nota-dinas",
      label: "Nota Dinas Cepat",
      icon: FileText,
    });
    menuItems.push({
      path: "/office/shift",
      label: "Manajemen Shift (Tim)",
      icon: Calendar,
    });
    menuItems.push({
      path: "/office/room-booking",
      label: "Booking Ruangan",
      icon: Calendar,
    });
    menuItems.push({
      path: "/office/doc-control",
      label: "Document Control",
      icon: FileText,
    });
    if (!isBph && !isDireksi) {
      menuItems.push({
        path: "/office/audit",
        label: "Kanban Akreditasi",
        icon: AlertCircle,
      });
    }
  }

  if (isNakes) {
    menuItems.push({
      path: "/office/shift",
      label: "Jadwal Jaga",
      icon: Calendar,
    });
    menuItems.push({
      path: "/office/archive",
      label: "SPO & Pedoman Medis",
      icon: FileText,
    });
    menuItems.push({
      path: "/office/elearning",
      label: "CME & Pelatihan",
      icon: Search,
    });

    // Nakes specific items
    if (
      ["dokter_spesialis", "dokter_umum", "perawat", "analis_lab"].includes(
        userRole,
      )
    ) {
      menuItems.push({
        path: "/office/blood-bank",
        label: "Bank Darah",
        icon: Search,
      });
    }
    if (["apoteker", "perawat", "dokter_umum"].includes(userRole)) {
      menuItems.push({
        path: "/office/inventory",
        label: "Gudang Farmasi",
        icon: Search,
      });
    }
    if (userRole === "ahli_gizi") {
      menuItems.push({
        path: "/office/dietitian",
        label: "Instalasi Gizi",
        icon: Search,
      });
      menuItems.push({
        path: "/office/nutrition-mfg",
        label: "Produksi Susu/Enteral",
        icon: Search,
      });
    }
    if (["perawat", "bidan"].includes(userRole)) {
      menuItems.push({
        path: "/office/cssd",
        label: "Sterilisasi CSSD",
        icon: Search,
      });
      menuItems.push({
        path: "/office/laundry",
        label: "Linen Laundry",
        icon: Search,
      });
      menuItems.push({
        path: "/office/bed-management",
        label: "Bed Management",
        icon: Search,
      });
      menuItems.push({
        path: "/office/morgue",
        label: "Kamar Jenazah",
        icon: Search,
      });
    }
    if (["dokter_spesialis", "dokter_umum"].includes(userRole)) {
      menuItems.push({
        path: "/office/credentials",
        label: "Komite Medik (Kredensial)",
        icon: Search,
      });
    }
  }

  if (isKeuangan) {
    if (!isBph && !isDireksi)
      menuItems.push({
        path: "/office/finance",
        label: "Keuangan Dashboard",
        icon: TrendingUp,
      });
    menuItems.push({
      path: "/office/procurement",
      label: "Approval Pengadaan",
      icon: Search,
    });
    menuItems.push({
      path: "/office/casemix",
      label: "Casemix & Klaim",
      icon: TrendingUp,
    });
  }

  if (isAset) {
    menuItems.push({
      path: "/office/assets",
      label: "Aset Kritis & PM",
      icon: Search,
    });
    menuItems.push({
      path: "/office/biomedical",
      label: "Kalibrasi Alkes",
      icon: Search,
    });
    menuItems.push({
      path: "/office/patrol",
      label: "Log Patroli & IPSRS",
      icon: CheckCircle,
    });
    menuItems.push({
      path: "/office/ticketing",
      label: "Tiket Perbaikan",
      icon: AlertCircle,
    });
    if (["kasubag_kebersihan", "wadir_admin"].includes(userRole)) {
      menuItems.push({
        path: "/office/waste",
        label: "Limbah & Sanitasi",
        icon: CheckCircle,
      });
      menuItems.push({
        path: "/office/laundry",
        label: "Manajemen Linen",
        icon: CheckCircle,
      });
    }
    if (userRole === "kasubag_aset" || userRole === "wadir_admin")
      menuItems.push({
        path: "/office/fleet",
        label: "Fleet Management",
        icon: CheckCircle,
      });
  }

  if (isSDM) {
    menuItems.push({
      path: "/office/hr-analytics",
      label: "HR Analytics",
      icon: Users,
    });
    menuItems.push({
      path: "/office/hr-management",
      label: "Data Kepegawaian",
      icon: Users,
    });
    menuItems.push({
      path: "/office/recruitment",
      label: "E-Recruitment",
      icon: Users,
    });
    menuItems.push({
      path: "/office/archive",
      label: "Arsip & Kebijakan",
      icon: FileText,
    });
  }

  // Global or additional specific menu additions based on precise role matching
  if (userRole === "wadir_admin" || userRole === "hrd") {
    menuItems.push({
      path: "/office/it-support",
      label: "IT & Jaringan",
      icon: Search,
    });
    menuItems.push({
      path: "/office/legal",
      label: "Hukum & Legal",
      icon: Search,
    });
    menuItems.push({
      path: "/office/security",
      label: "Keamanan (Security)",
      icon: Search,
    });
    menuItems.push({
      path: "/office/parking",
      label: "Manajemen Parkir",
      icon: Search,
    });
    menuItems.push({
      path: "/office/diklit",
      label: "Pendidikan & Penelitian",
      icon: Search,
    });
    menuItems.push({
      path: "/office/call-center",
      label: "Call Center (PKRS)",
      icon: Search,
    });
  }

  if (userRole === "wadir_admin" || userRole === "kasubag_aset") {
    menuItems.push({
      path: "/office/k3rs",
      label: "Komite K3RS",
      icon: Search,
    });
    menuItems.push({
      path: "/office/gas-medis",
      label: "Instalasi Gas Medis",
      icon: Search,
    });
  }

  if (["tenaga_adm", "kasubag_data", "developer_web", "wadir_admin", "direktur"].includes(userRole)) {
    menuItems.push({
      path: "/office/developer-web",
      label: "Developer Web",
      icon: Search,
    });
  }

  if (userRole === "wadir_medis") {
    menuItems.push({ path: "/office/ppi", label: "Komite PPI", icon: Search });
    menuItems.push({
      path: "/office/quality",
      label: "Komite Mutu (PMKP)",
      icon: Search,
    });
    menuItems.push({
      path: "/office/spiritual",
      label: "Bimbingan Rohani",
      icon: Search,
    });
    menuItems.push({
      path: "/office/rm-admin",
      label: "Rekam Medis (RM)",
      icon: Search,
    });
    menuItems.push({
      path: "/office/lab-admin",
      label: "Laboratorium (Admin)",
      icon: Search,
    });
    menuItems.push({
      path: "/office/radiology-admin",
      label: "Radiologi & PACS",
      icon: Search,
    });
    menuItems.push({
      path: "/office/hemodialysis-admin",
      label: "Hemodialisa (Admin)",
      icon: Search,
    });
  }

  // 30 NEW FEATURES - assigned broadly to wadir_medis to ensure they show up in demo role
  if (
    userRole === "wadir_medis" ||
    userRole === "direktur" ||
    userRole === "wadir_admin"
  ) {
    menuItems.push(
      { path: "/office/pharmacy-admin", label: "Farmasi PBF", icon: Search },
      { path: "/office/physiotherapy", label: "Fisioterapi", icon: Search },
      { path: "/office/discharge", label: "Discharge Planning", icon: Search },
      { path: "/office/outpatient", label: "Poli Rawat Jalan", icon: Search },
      { path: "/office/inpatient", label: "Poli Rawat Inap", icon: Search },
      { path: "/office/surgery", label: "Kamar Bedah (IBS)", icon: Search },
      { path: "/office/icu", label: "ICU & Kritis", icon: Search },
      { path: "/office/nicu", label: "NICU / Perina", icon: Search },
      { path: "/office/emergency", label: "IGD & Triage", icon: Search },
      { path: "/office/mcu", label: "Medical Check Up", icon: Search },
      { path: "/office/blood-donor", label: "Donor Darah", icon: Search },
      { path: "/office/cathlab", label: "Cathlab", icon: Search },
      { path: "/office/endoscopy", label: "Endoskopi", icon: Search },
      { path: "/office/vip-clinic", label: "Klinik Eksekutif", icon: Search },
      { path: "/office/homecare", label: "Homecare", icon: Search },
      { path: "/office/telemedicine", label: "Telemedicine", icon: Search },
      {
        path: "/office/medical-tourism",
        label: "Medical Tourism",
        icon: Search,
      },
      { path: "/office/insurance", label: "Asuransi Swasta", icon: Search },
      { path: "/office/internal-audit", label: "SPI / Audit RS", icon: Search },
      { path: "/office/ethics", label: "Komite Etik RS", icon: Search },
      { path: "/office/clinical-pharm", label: "Farmasi Klinis", icon: Search },
      { path: "/office/forensic", label: "Forensik / Visum", icon: Search },
      { path: "/office/health-promo", label: "PKRS / Promkes", icon: Search },
      { path: "/office/research", label: "Penelitian RS", icon: Search },
      { path: "/office/library", label: "Perpustakaan", icon: Search },
      { path: "/office/mess", label: "Asrama Pegawai", icon: Search },
      { path: "/office/daycare", label: "Daycare RS", icon: Search },
      { path: "/office/nutrition-care", label: "Asuhan Gizi", icon: Search },
      { path: "/office/palliative", label: "Paliatif", icon: Search },
      { path: "/office/optic", label: "Optik / Kacamata", icon: Search },
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-700">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center">
        <div className="flex items-center text-blue-600 font-bold text-lg">
          <Building2 className="w-6 h-6 mr-2" /> RS UMLA Office
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-slate-500 p-2"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile */}
      <div
        className={`${isSidebarOpen ? "block" : "hidden"} md:block fixed inset-0 z-40 md:static md:w-64 bg-slate-900 flex-shrink-0 flex flex-col text-slate-300 transition-transform`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center text-white">
            <Building2 className="w-8 h-8 text-blue-400 mr-3" />
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">
                RS UMLA
              </h1>
              <h2 className="text-blue-400 text-[10px] font-semibold tracking-widest uppercase">
                Office Portal
              </h2>
            </div>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 border-b border-slate-800 bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center border border-slate-600 shadow-inner">
              <UserCircle className="w-7 h-7 text-slate-300" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white font-black text-sm truncate uppercase tracking-widest">
                User {userRole}
              </p>
              <p className="text-blue-400 font-bold text-[10px] truncate uppercase tracking-widest mt-0.5">
                {getRoleName()}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-grow py-4 overflow-y-auto px-3 space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">
            Modul Internal
          </div>
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon
                className={`w-5 h-5 mr-3 ${location.pathname === item.path ? "text-blue-200" : "text-slate-500"}`}
              />
              {item.label}
            </Link>
          ))}

          {(isNakes || isBph || isDireksi) && (
            <>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-3">
                Sistem Medis & Publik
              </div>
              {(isNakes || isDireksi || isBph) && (
                <Link
                  to="/srm"
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all group"
                >
                  <LayoutDashboard className="w-5 h-5 mr-3 text-slate-500 group-hover:text-slate-400" />
                  Portal Medis (SRM)
                </Link>
              )}
              {isNakes && (
                <Link
                  to="/srm/rekam-medis"
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all group"
                >
                  <FileText className="w-5 h-5 mr-3 text-slate-500 group-hover:text-slate-400" />
                  Rekam Medis (EMR)
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 bg-slate-800/50 hover:bg-rose-900/50 border border-slate-700 hover:border-rose-700 hover:text-rose-400 rounded-xl transition-all text-sm font-bold text-slate-400"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout App
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 overflow-hidden bg-slate-50">
        <header className="bg-white border-b border-slate-200 h-16 flex justify-between items-center px-4 sm:px-8 shadow-sm">
          <div className="flex-1 flex items-center">
            {/* Can put a universal search here */}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 hover:text-slate-600 p-2">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
