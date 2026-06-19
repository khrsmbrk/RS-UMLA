import React, { useState } from "react";
import {
  Video,
  Calendar,
  Search,
  Filter,
  Phone,
  Clock,
  FileText,
  CheckCircle2,
  User,
  Play,
  MessageSquare,
  Activity,
} from "lucide-react";

export default function OfficeTelemedicine() {
  const [activeTab, setActiveTab] = useState("Upcoming Calls");

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Video className="w-6 h-6 text-teal-600" /> Telemedicine Command
            Center
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage virtual consultations, scheduled video calls, and patient
            comms
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Calendar className="w-4 h-4" /> Schedule Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Schedule Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm min-h-[500px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex gap-2">
                {["Upcoming Calls", "Active Now", "Past Records"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeTab === tab
                        ? "bg-teal-50 text-teal-700 shadow-sm"
                        : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Virtual Consultation Cards */}
              {[
                {
                  time: "10:00 AM",
                  duration: "30 min",
                  doctor: "Dr. Sarah Wilson",
                  type: "General Practice",
                  patient: "Michael Chang",
                  status: "Waiting",
                  urgent: false,
                },
                {
                  time: "11:15 AM",
                  duration: "45 min",
                  doctor: "Dr. James Okoye",
                  type: "Cardiology",
                  patient: "Emma Roberts",
                  status: "Scheduled",
                  urgent: true,
                },
                {
                  time: "01:30 PM",
                  duration: "20 min",
                  doctor: "Dr. Linda Chu",
                  type: "Pediatrics",
                  patient: "Baby Liam (via Parent)",
                  status: "Scheduled",
                  urgent: false,
                },
                {
                  time: "02:45 PM",
                  duration: "30 min",
                  doctor: "Dr. Sarah Wilson",
                  type: "General Practice",
                  patient: "David Smith",
                  status: "Scheduled",
                  urgent: false,
                },
              ].map((call, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-slate-200/60 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4 md:mb-0">
                    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-slate-100 min-w-[80px]">
                      <Clock className="w-5 h-5 text-teal-500 mb-1" />
                      <span className="font-bold text-slate-800 text-sm whitespace-nowrap">
                        {call.time}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        {call.patient}
                        {call.urgent && (
                          <span className="bg-rose-100 text-rose-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                            Urgent
                          </span>
                        )}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> {call.doctor}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="font-medium">{call.type}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>{call.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:bg-teal-50 transition-colors flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="flex-1 md:flex-none p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-teal-600 hover:bg-teal-50 transition-colors flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 ${call.status === "Waiting" ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-slate-800 hover:bg-slate-900 text-white"}`}
                    >
                      <Play className="w-4 h-4" /> Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Active Call Status */}
        <div className="space-y-6">
          {/* Active Status */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-10"></div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" /> Today's Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Total
                </p>
                <p className="text-2xl font-black text-slate-800">42</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Completed
                </p>
                <p className="text-2xl font-black text-slate-800 text-teal-600">
                  18
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Avg Wait
                </p>
                <p className="text-2xl font-black text-slate-800">4m</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Uptime
                </p>
                <p className="text-2xl font-black text-slate-800">99.9%</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl shadow-sm text-white">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-teal-400" /> Platform Connectivity
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              All telemedicine relay servers are operating normally.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Video Gateway</span>
                <span className="flex items-center gap-1.5 text-teal-400 font-medium">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>{" "}
                  Healthy
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Prescription Sync</span>
                <span className="flex items-center gap-1.5 text-teal-400 font-medium">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>{" "}
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Chat Relay</span>
                <span className="flex items-center gap-1.5 text-teal-400 font-medium">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>{" "}
                  Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
