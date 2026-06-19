import { useOutletContext } from '../../utils/OutletContext';
import React from "react";

import ProfileCard from "../../components/PortalKaryawan/ProfileCard";
import AttendanceModule from "../../components/PortalKaryawan/AttendanceModule";
import ScheduleList from "../../components/PortalKaryawan/ScheduleList";
import OvertimeModule from "../../components/PortalKaryawan/OvertimeModule";
import NotificationList from "../../components/PortalKaryawan/NotificationList";
import InternalCallCard from "../../components/PortalKaryawan/InternalCallCard";
import EmployeeSearch from "../../components/PortalKaryawan/EmployeeSearch";
import KPICard from "../../components/PortalKaryawan/KPICard";
import {
  Activity,
  Clock,
  FileText,
  CheckCircle2,
  ChevronRight,
  Wallet,
} from "lucide-react";
import {
  SHIFTS,
  ATTENDANCES,
  OVERTIMES,
  NOTIFICATIONS,
  EMPLOYEES,
} from "../../data/portalData";

const DashboardPage = () => {
  const { user } = useOutletContext<{ user: any }>();
  const userShifts = SHIFTS.filter((s) => s.employeeId === user.id);

  return (
    <div className="space-y-6">
      {/* High impact monitoring banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Bagus
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-800">
              98<span className="text-xl text-slate-400">%</span>
            </p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              Kehadiran (YTD)
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-fuchsia-100 text-fuchsia-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 animate-pulse">
              1 Expired
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-800">12</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              Dokumen Valid
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-800 font-mono tracking-tight">
              14<span className="text-xl text-slate-400 font-sans">j</span> 30
              <span className="text-xl text-slate-400 font-sans">m</span>
            </p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              Lembur Bulan Ini
            </p>
          </div>
        </div>

        <div className="bg-blue-600 p-5 rounded-2xl border border-blue-500 shadow-lg flex flex-col justify-between text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Wallet className="w-24 h-24" />
          </div>
          <div className="flex justify-between items-start relative z-10">
            <div className="p-3 bg-blue-700 text-blue-100 rounded-xl border border-blue-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 relative z-10">
            <p className="text-3xl font-black font-mono tracking-tight text-white mb-1">
              <span className="text-xl text-blue-200">Rp</span> ••• •••
            </p>
            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mt-1 flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors w-max">
              Lihat Estimasi THP <ChevronRight className="w-3 h-3" />
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Profil & Absensi */}
        <div className="lg:col-span-1 space-y-6">
          <ProfileCard employee={user} />
          <KPICard />
          <AttendanceModule attendances={ATTENDANCES} employeeId={user.id} />
        </div>

        {/* Kolom Tengah: Jadwal & Lembur */}
        <div className="lg:col-span-1 space-y-6">
          <ScheduleList shifts={userShifts} />
          <OvertimeModule overtimes={OVERTIMES} employeeId={user.id} />
        </div>

        {/* Kolom Kanan: Notifikasi, Komunikasi & Pencarian */}
        <div className="lg:col-span-1 space-y-6">
          <NotificationList notifications={NOTIFICATIONS} />
          <InternalCallCard />
          <EmployeeSearch employees={EMPLOYEES} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
