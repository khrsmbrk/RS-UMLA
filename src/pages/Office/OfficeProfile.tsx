import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Calendar,
  FileText,
  Settings,
  Shield,
  Bell,
  ChevronRight,
  Activity,
  Users,
  Clock,
  Stethoscope,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";

export default function OfficeProfile() {
  const { currentUser } = useOfficeStore();

  const mockEmail = currentUser?.name
    ? `${currentUser.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ".")
        .replace(/\.+/g, ".")
        .replace(/^\.|\.$/g, "")}@rsumla.ac.id`
    : "andi.firmansyah@rsudxyz.com";

  return (
    <div className="space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white/40 p-4 rounded-[1.25rem] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.02)] border border-white/50 backdrop-blur-md relative overflow-hidden">
        {/* Cover Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#83b4b8] to-[#4b7a7e] rounded-t-[1.25rem]"></div>

        <div className="relative pt-12 px-2 sm:px-6 flex flex-col md:flex-row gap-6 items-center md:items-end pb-2">
          {/* Avatar Container */}
          <div className="relative shrink-0">
            <img
              src={`https://i.pravatar.cc/150?u=${currentUser?.id || "drandi"}`}
              alt={currentUser?.name || "dr. Andi Firmansyah"}
              className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-white"
            />
            <div className="absolute bottom-1 right-3 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>

          {/* User Basic Info */}
          <div className="flex-1 text-center md:text-left mb-2">
            <h1 className="text-2xl font-bold text-slate-800">
              {currentUser?.name || "dr. Andi Firmansyah"}
            </h1>
            <p className="text-sm font-semibold text-slate-500 mb-2">
              {currentUser?.jabatan ||
                "Dokter Umum Jaga / General Practitioner"}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin className="w-4 h-4 text-slate-400" />
                Lamongan, Indonesia
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Building className="w-4 h-4 text-slate-400" />
                RS UMLA
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mb-2 w-full md:w-auto mt-4 md:mt-0 px-4 md:px-0">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#191e23] hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
            <button className="flex-none flex items-center justify-center w-10 h-10 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all shadow-sm border border-slate-100">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Details */}
        <div className="space-y-4">
          {/* Contact Information */}
          <div className="bg-white/80 p-5 rounded-[1.25rem] shadow-sm backdrop-blur-md">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#83b4b8]" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Email Address
                  </p>
                  <p className="text-xs font-semibold text-slate-700">
                    {mockEmail}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Phone Number
                  </p>
                  <p className="text-xs font-semibold text-slate-700">
                    {currentUser?.kontak || "+62 812-9876-5432"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white/80 p-5 rounded-[1.25rem] shadow-sm backdrop-blur-md">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#83b4b8]" />
              Work Profile
            </h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <p className="text-xs font-medium text-slate-500">
                  Employee ID
                </p>
                <p className="text-xs font-bold text-slate-800">
                  {currentUser?.nip || "DOC-2018-0123"}
                </p>
              </div>
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <p className="text-xs font-medium text-slate-500">Unit</p>
                <p className="text-xs font-bold text-slate-800 text-right">
                  {currentUser?.unit || "Instalasi Gawat Darurat (IGD)"}
                </p>
              </div>
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <p className="text-xs font-medium text-slate-500">
                  Employment Status
                </p>
                <p className="text-xs font-bold text-slate-800">
                  {currentUser?.statusKepegawaian || "Tetap"}
                </p>
              </div>
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-slate-500">Level</p>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] font-bold text-slate-800 capitalize">
                    {currentUser?.level || "Operasional"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/80 p-4 rounded-[1.25rem] shadow-sm backdrop-blur-md flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-800 leading-none mb-1">
                1,402
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase">
                Treated Patients
              </span>
            </div>
            <div className="bg-white/80 p-4 rounded-[1.25rem] shadow-sm backdrop-blur-md flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-2">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-800 leading-none mb-1">
                18
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase">
                Pending Consults
              </span>
            </div>
            <div className="bg-white/80 p-4 rounded-[1.25rem] shadow-sm backdrop-blur-md flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-800 leading-none mb-1">
                36h
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase">
                Shift Hours (Wk)
              </span>
            </div>
            <div className="bg-white/80 p-4 rounded-[1.25rem] shadow-sm backdrop-blur-md flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-800 leading-none mb-1">
                5
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase">
                Upcoming Shifts
              </span>
            </div>
          </div>

          {/* Settings & Permissions */}
          <div className="bg-white/40 p-5 rounded-[1.25rem] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.02)] border border-white/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#83b4b8]" />
                System Roles & Permissions
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: "Clinical / Medical Records (EMR)",
                  desc: "Read and update patient histories, diagnoses, and lab results",
                  active: true,
                },
                {
                  name: "Prescription Module",
                  desc: "Create and submit e-prescriptions to the hospital pharmacy",
                  active: true,
                },
                {
                  name: "Internal Referral",
                  desc: "Refer patients to specialist departments (Surgery, Orthopedics, etc.)",
                  active: true,
                },
                {
                  name: "Financial Records / Billing",
                  desc: "Access to billing and audit reports",
                  active: false,
                },
                {
                  name: "Hospital Administration",
                  desc: "Can approve leaves, payrolls, and schedule changes",
                  active: false,
                },
              ].map((role, i) => (
                <div
                  key={i}
                  className="bg-white/80 p-3 rounded-xl flex items-center justify-between border border-slate-50 shadow-sm"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">
                      {role.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {role.desc}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      role.active
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {role.active ? "Active" : "Restricted"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
