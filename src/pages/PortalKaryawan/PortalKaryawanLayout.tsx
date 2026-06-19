import { secureLocalStorage } from "../../utils/crypto";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  LogOut,
  Menu,
  Bell,
  LayoutDashboard,
  Calendar,
  Clock,
  FileText,
  X,
  Wallet,
  Briefcase,
  Settings,
  TrendingUp,
  Award,
} from "lucide-react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";

const PortalKaryawanLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = secureLocalStorage.getItem("karyawan_session");
    if (!session) {
      navigate("/office/login");
    } else {
      setUser(JSON.parse(session));
    }
  }, [navigate]);

  if (!user) return null;

  const handleLogout = () => {
    secureLocalStorage.removeItem("karyawan_session");
    navigate("/office/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/karyawan/dashboard", icon: LayoutDashboard },
    { name: "Kehadiran", path: "/karyawan/absensi", icon: Clock },
    { name: "Jadwal", path: "/karyawan/jadwal", icon: Calendar },
    { name: "Cuti & Izin", path: "/karyawan/cuti", icon: FileText },
    { name: "Lembur", path: "/karyawan/lembur", icon: Clock },
    { name: "Slip Gaji", path: "/karyawan/gaji", icon: Wallet },
    { name: "Pelatihan", path: "/karyawan/pelatihan", icon: Award },
    { name: "Kinerja", path: "/karyawan/kinerja", icon: TrendingUp },
    { name: "Berkas", path: "/karyawan/berkas", icon: Briefcase },
    { name: "Pengaturan", path: "/karyawan/pengaturan", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar untuk Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 bg-white shrink-0">
          <div className="flex flex-col">
            <span className="font-black text-lg text-slate-800 tracking-tight">
              PORTAL<span className="text-blue-600">KARYAWAN</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              RS UMLA
            </span>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100 shrink-0">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500 font-medium truncate">
                {user?.jabatan}
              </p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-bold shadow-sm border border-blue-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium border border-transparent"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-3 rounded-xl text-rose-600 hover:bg-rose-50 w-full font-bold transition-colors text-sm border border-transparent hover:border-rose-100"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="truncate">Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shrink-0">
          <div className="px-5 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden p-2 -ml-2 mr-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="hidden md:flex flex-col">
                  <h1 className="text-lg font-black text-slate-800 leading-tight">
                    Halo, {user?.name || "Karyawan"}!
                  </h1>
                  <p className="text-xs font-medium text-slate-500">
                    Semoga hari kerjamu menyenangkan dan produktif.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toast.success("Panel notifikasi (Simulasi)")}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-slate-50/50 p-5 lg:p-8 scroll-smooth">
          <div className="mx-auto max-w-7xl">
            <Outlet context={{ user }} />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default PortalKaryawanLayout;
