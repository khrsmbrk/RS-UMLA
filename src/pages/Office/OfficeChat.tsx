import React, { useState } from "react";
import {
  MessageSquare,
  Hash,
  Send,
  Paperclip,
  Search,
  Users,
  Phone,
  Video,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";

export default function OfficeChat() {
  const [activeChannel, setActiveChannel] = useState("Grup Jaga Malam IGD");
  const [message, setMessage] = useState("");

  const channels = [
    "Grup Jaga Malam IGD",
    "Update Akreditasi",
    "Pengumuman RS",
    "IPSRS & IT Support",
  ];
  const directMessages = [
    "Dr. Ahmad (Sp.PD)",
    "Ns. Siti (Karu IGD)",
    "Budi (IT)",
  ];

  const messages = [
    {
      sender: "Ns. Siti (Karu IGD)",
      time: "10:45",
      text: "Mengingatkan shift malam nanti ada loading pasien rujukan dari Tuban ya.",
      isSender: false,
    },
    {
      sender: "Budi (IT)",
      time: "10:50",
      text: "Sistem SIMRS akan maintenance jam 02:00 pagi selama 15 menit.",
      isSender: false,
    },
    {
      sender: "Anda",
      time: "10:52",
      text: "Baik, form rekam medis manual sudah disiapkan di nurse station.",
      isSender: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-10 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600" /> Integrated
            Communication
          </h1>
          <p className="text-slate-500 mt-1">
            Platform pesan instan terpusat untuk komunikasi cepat antar unit &
            staf RS.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex h-[75vh] overflow-hidden">
        {/* Sidebar Chat */}
        <div className="w-1/3 lg:w-1/4 border-r border-slate-200 bg-slate-50/50 flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pesan atau kontak..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 px-2">
                Kanal Diskusi (Groups)
              </div>
              <ul className="space-y-1">
                {channels.map((ch, i) => (
                  <li
                    key={i}
                    onClick={() => setActiveChannel(ch)}
                    className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-3 text-sm font-bold transition-all ${activeChannel === ch ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    <Hash
                      className={`w-4 h-4 ${activeChannel === ch ? "text-indigo-500" : "text-slate-400"}`}
                    />{" "}
                    {ch}
                  </li>
                ))}
              </ul>

              <div className="text-xs font-black text-slate-400 uppercase tracking-wider mt-8 mb-3 px-2 flex items-center justify-between">
                Pesan Langsung
                <span className="bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded text-[10px] shadow-sm">
                  3 Baru
                </span>
              </div>
              <ul className="space-y-1">
                {directMessages.map((dm, i) => (
                  <li
                    key={i}
                    onClick={() => setActiveChannel(dm)}
                    className={`px-3 py-2.5 rounded-lg cursor-pointer flex items-center gap-3 text-sm font-bold transition-all ${activeChannel === dm ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 uppercase">
                        {dm.charAt(0)}
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/20"></div>
                    </div>
                    <span className="truncate">{dm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC]">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center z-10 shadow-[0_4px_20px_-15px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-lg shadow-sm border border-indigo-100 shrink-0">
                {activeChannel.startsWith("G") ? (
                  <Hash className="w-6 h-6" />
                ) : (
                  activeChannel.charAt(0)
                )}
              </div>
              <div>
                <div className="font-black text-slate-800 text-lg leading-tight">
                  {activeChannel}
                </div>
                <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>{" "}
                  12 Anggota Aktif
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-slate-200 my-auto mx-1"></div>
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex justify-center my-4">
              <span className="text-xs font-bold text-slate-400 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100 uppercase tracking-wider">
                Hari Ini
              </span>
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.isSender ? "items-end" : "items-start"}`}
              >
                <div
                  className={`flex items-baseline gap-2 mb-1.5 ${m.isSender ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-xs font-black text-slate-500">
                    {m.sender}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {m.time}
                  </span>
                </div>
                <div
                  className={`px-5 py-3 rounded-2xl max-w-[75%] min-w-[120px] text-sm shadow-sm leading-relaxed ${m.isSender ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"}`}
                >
                  {m.text}
                  {m.isSender && (
                    <div className="text-right mt-1 opacity-70 flex justify-end">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200 z-10 shadow-[0_-4px_20px_-15px_rgba(0,0,0,0.1)]">
            <div className="flex items-end gap-2 bg-slate-50 rounded-xl p-2 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors shrink-0 mb-0.5">
                <Paperclip className="w-5 h-5" />
              </button>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), setMessage(""))
                }
                placeholder={`Kirim pesan ke ${activeChannel}...`}
                className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 py-2.5 resize-none placeholder:text-slate-400 min-h-[44px] max-h-[120px]"
                rows={1}
              />
              <button
                onClick={() => setMessage("")}
                className="p-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-transform hover:scale-105 active:scale-95 shrink-0 mb-0.5"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] font-bold text-slate-400 mt-3 text-center uppercase tracking-widest flex justify-center items-center gap-2">
              <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
              Terintegrasi dengan Google Chat Workspace & Firebase
              <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
