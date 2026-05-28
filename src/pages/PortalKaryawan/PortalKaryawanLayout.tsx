import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";

const PortalKaryawanLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("karyawan_session");
    if (!session) {
      navigate("/office/login");
    } else {
      setUser(JSON.parse(session));
    }
  }, [navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("karyawan_session");
    navigate("/office/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/karyawan/dashboard", icon: LayoutDashboard },
    { name: "Absensi", path: "/karyawan/absensi", icon: Clock },
    { name: "Jadwal Shift", path: "/karyawan/jadwal", icon: Calendar },
    { name: "Cuti / Izin", path: "/karyawan/cuti", icon: Briefcase },
    { name: "Slip Gaji", path: "/karyawan/slip-gaji", icon: Wallet },
    { name: "Berkas Karyawan", path: "/karyawan/berkas", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar untuk Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 bg-blue-700 shrink-0">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white leading-tight">
              Portal Karyawan
            </span>
            <span className="text-xs text-blue-200 font-medium tracking-wide">
              RS UMLA
            </span>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg border border-blue-200 shrink-0">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500 truncate">{user?.jabatan}</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 w-full font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout Sistem</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm sticky top-0 z-30 shrink-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 -ml-2 mr-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex justify-end items-center space-x-4">
                <button
                  onClick={() =>
                    alert("Membuka panel notifikasi... (Simulasi)")
                  }
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <Outlet context={{ user }} />
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
