import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useOfficeStore } from "./store/officeStore";
import { logout as authLogout } from "./store/auth";
import {
  Search,
  Sun,
  LayoutDashboard,
  Users,
  Activity,
  Bed,
  FileText,
  Syringe,
  Microscope,
  Stethoscope,
  Pill,
  Briefcase,
  Archive,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function OfficeLayout() {
  const { userRole, currentUser, logout } = useOfficeStore();
  const navigate = useNavigate();
  const location = useLocation();

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

  const menuGroups = {
    Clinical: [
      "/office/patient",
      "/office/room",
      "/office/medical",
      "/office/telemedicine",
    ],
    Diagnostics: [
      "/office/laboratory",
      "/office/radiology",
      "/office/medicine",
      "/office/clinicalpharm",
      "/office/bloodbank",
    ],
    Operations: [
      "/office/hr-management",
      "/office/inventory",
      "/office/fleet",
      "/office/recruitment",
      "/office/shift",
    ],
    "Finance & Insights": [
      "/office/finance",
      "/office/analytic",
      "/office/procurement",
      "/office/audit",
    ],
  };

  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("dashboard")) return <LayoutDashboard className="w-4 h-4" />;
    if (l.includes("pasien") || l.includes("patient") || l.includes("kamar"))
      return <Bed className="w-4 h-4" />;
    if (
      l.includes("sdm") ||
      l.includes("pegawai") ||
      l.includes("staf") ||
      l.includes("hr")
    )
      return <Users className="w-4 h-4" />;
    if (
      l.includes("analitik") ||
      l.includes("laporan") ||
      l.includes("analisis")
    )
      return <BarChart2 className="w-4 h-4" />;
    if (l.includes("keuangan")) return <FileText className="w-4 h-4" />;
    if (l.includes("farmasi") || l.includes("obat"))
      return <Pill className="w-4 h-4" />;
    if (l.includes("medis") || l.includes("dokter"))
      return <Stethoscope className="w-4 h-4" />;
    if (l.includes("aset") || l.includes("inventori") || l.includes("kontrak"))
      return <Archive className="w-4 h-4" />;
    if (l.includes("pengadaan")) return <Briefcase className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getNavItems = () => {
    const defaultNavs = [{ label: "Dashboard", path: "/office/dashboard" }];

    switch (userRole) {
      case "bph":
        return [
          ...defaultNavs,
          { label: "Analitik & Laporan", path: "/office/analytic" },
          { label: "Keuangan", path: "/office/finance" },
          { label: "Audit Internal", path: "/office/audit" },
        ];
      case "direktur":
        return [
          ...defaultNavs,
          { label: "Analitik & Laporan", path: "/office/analytic" },
          { label: "Keuangan", path: "/office/finance" },
          { label: "SDM & Pegawai", path: "/office/hr-management" },
          { label: "Manajemen Aset", path: "/office/assets" },
          { label: "Manajemen Kontrak", path: "/office/contracts" },
          { label: "Manajemen Inventori", path: "/office/inventory" },
        ];
      case "wadir_medis":
        return [
          ...defaultNavs,
          { label: "Analisis Medis", path: "/office/analytic" },
          { label: "Ketersediaan Kamar", path: "/office/room" },
          { label: "Farmasi & Obat", path: "/office/medicine" },
          { label: "Dokter & Staf Medis", path: "/office/doctors" },
          { label: "Manajemen Casemix", path: "/office/casemix" },
        ];
      case "wadir_keuangan":
        return [
          ...defaultNavs,
          { label: "Analisis Keuangan", path: "/office/analytic" },
          { label: "Manajemen Keuangan", path: "/office/finance" },
          { label: "Pengadaan", path: "/office/procurement" },
          { label: "Manajemen Aset", path: "/office/assets" },
        ];
      case "wadir_admin":
        return [
          ...defaultNavs,
          { label: "Analisis SDM", path: "/office/hr-analytics" },
          { label: "Manajemen HRD", path: "/office/hr-management" },
          { label: "Perekrutan", path: "/office/recruitment" },
          { label: "Manajemen Armada", path: "/office/fleet" },
          { label: "Nota Dinas", path: "/office/nota-dinas" },
        ];
      case "kepala_igd":
        return [
          ...defaultNavs,
          { label: "Data Pasien", path: "/office/patient" },
          { label: "Ketersediaan Kamar", path: "/office/room" },
          { label: "Jadwal Dokter", path: "/office/doctors" },
          { label: "Jadwal Shift", path: "/office/shift" },
          { label: "Farmasi", path: "/office/medicine" },
        ];
      case "kasubag_pegawai":
        return [
          ...defaultNavs,
          { label: "Data Pegawai", path: "/office/hr-management" },
          { label: "Rapor Pegawai", path: "/office/appraisal" },
          { label: "Perekrutan", path: "/office/recruitment" },
          { label: "Jadwal & Shift", path: "/office/shift" },
          { label: "E-Learning", path: "/office/elearning" },
        ];
      case "dokter_umum":
      case "dokter_spesialis":
        return [
          ...defaultNavs,
          { label: "Daftar Pasien", path: "/office/patient" },
          { label: "Ketersediaan Kamar", path: "/office/room" },
          { label: "Permintaan Farmasi", path: "/office/medicine" },
          { label: "Jadwal & Agenda", path: "/office/calendar" },
          { label: "Layanan Telemedisin", path: "/office/telemedicine" },
        ];
      case "perawat":
      case "paramedis":
        return [
          ...defaultNavs,
          { label: "Data Pasien Blok", path: "/office/patient" },
          { label: "Manajemen Kamar", path: "/office/room" },
          { label: "Jadwal Shift", path: "/office/shift" },
          { label: "Permintaan Darah", path: "/office/bloodbank" },
        ];
      case "apoteker":
        return [
          ...defaultNavs,
          { label: "Inventaris Farmasi", path: "/office/inventory" },
          { label: "Resep Obat", path: "/office/medicine" },
          { label: "Farmasi Klinis", path: "/office/clinicalpharm" },
        ];
      case "staf_admin":
      case "developer_web":
        return [
          ...defaultNavs,
          { label: "Ticketing & Bantuan", path: "/office/ticketing" },
          { label: "Sistem Informasi Web", path: "/office/developer" },
          { label: "Nota Dinas", path: "/office/nota-dinas" },
          { label: "Sistem Employee", path: "/office/ess" },
          { label: "Manajemen Arsip", path: "/office/archive" },
        ];
      default:
        return [
          ...defaultNavs,
          { label: "Pasien & Klinis", path: "/office/patient" },
          { label: "Kamar", path: "/office/room" },
          { label: "HR & Pegawai", path: "/office/hr-management" },
          { label: "Pengadaan", path: "/office/procurement" },
          { label: "Analitik Pusat", path: "/office/analytic" },
        ];
    }
  };

  const navItems = React.useMemo(() => getNavItems(), [userRole]);

  useEffect(() => {
    if (userRole && location.pathname !== "/office/login" && location.pathname !== "/office/dashboard" && location.pathname !== "/office/access-denied") {
      const allowedPaths = navItems.map((item) => item.path);
      const isAllowed = allowedPaths.some((p) => location.pathname.startsWith(p));
      if (!isAllowed) {
        navigate("/office/access-denied");
      }
    }
  }, [location.pathname, userRole, navigate, navItems]);

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        {/* Logo */}
        <div className="h-16 px-6 flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded bg-teal-500 relative overflow-hidden flex items-center justify-center">
            {/* Medical cross stylized */}
            <div className="w-1.5 h-3.5 bg-white rounded-sm absolute"></div>
            <div className="w-3.5 h-1.5 bg-white rounded-sm absolute"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Meditech
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 no-scrollbar">
          {navItems.map((item, idx) => {
            const isActive =
              location.pathname.includes(item.path) ||
              (item.label === "Dashboard" &&
                location.pathname === "/office/dashboard");
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-teal-50/50 text-teal-700 font-medium"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div
                  className={`${isActive ? "text-teal-600" : "text-slate-400"}`}
                >
                  {getIcon(item.label)}
                </div>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 flex flex-col gap-1">
          <Link
            to="/office/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Pengaturan
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 px-8 flex items-center justify-between shrink-0 bg-[#F4F7F6]">
          <div className="relative w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patients, appointments, records..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors">
              <Sun className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pr-4 pl-1 py-1 cursor-pointer hover:shadow-sm transition-shadow">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || "F S")}&background=0D8ABC&color=fff`}
                alt="Avatar"
                className="w-7 h-7 rounded-full bg-slate-100"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser?.name || "Fl Suhan"}
                </span>
                <span className="text-[10px] text-slate-500">
                  {currentUser?.email || "Example@gmail.com"}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 no-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
