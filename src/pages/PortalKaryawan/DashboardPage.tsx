import React from "react";
import { useOutletContext } from "react-router-dom";
import ProfileCard from "../../components/PortalKaryawan/ProfileCard";
import AttendanceModule from "../../components/PortalKaryawan/AttendanceModule";
import ScheduleList from "../../components/PortalKaryawan/ScheduleList";
import OvertimeModule from "../../components/PortalKaryawan/OvertimeModule";
import NotificationList from "../../components/PortalKaryawan/NotificationList";
import InternalCallCard from "../../components/PortalKaryawan/InternalCallCard";
import EmployeeSearch from "../../components/PortalKaryawan/EmployeeSearch";
import DocumentScanPlaceholder from "../../components/PortalKaryawan/DocumentScanPlaceholder";
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Kolom Kiri: Profil & Absensi */}
      <div className="lg:col-span-1 space-y-6">
        <ProfileCard employee={user} />
        <AttendanceModule attendances={ATTENDANCES} employeeId={user.id} />
        <DocumentScanPlaceholder />
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
  );
};

export default DashboardPage;
