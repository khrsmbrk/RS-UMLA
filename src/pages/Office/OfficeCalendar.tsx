import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Video,
  Plus,
  CheckCircle,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";
import { getAccessToken, initAuth } from "./store/auth";
import toast from "react-hot-toast";

export default function OfficeCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated with Google Workspace");

      const timeMin = new Date().toISOString();
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&maxResults=10&singleEvents=true&orderBy=startTime`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Gagal mengambil data dari Google Calendar");

      const data = await res.json();
      setEvents(data.items || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let unmounted = false;
    initAuth(
      (user, token) => {
        if (!unmounted) fetchEvents();
      },
      () => {
        if (!unmounted)
          setError(
            "Silakan login dengan Google untuk melihat kalender E-Meeting & MoM.",
          );
      },
    );
    return () => {
      unmounted = true;
    };
  }, []);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");

  const handleCreateEvent = async () => {
    if (!newEventTitle || !newEventDate) return;
    try {
      const token = await getAccessToken();
      if (!token) return;

      const confirmed = window.confirm(
        `Buat meeting baru: "${newEventTitle}" pada tanggal ${newEventDate}?`,
      );
      if (!confirmed) return;

      const event = {
        summary: newEventTitle,
        description: "Meeting / MoM via RS UMLA Office E-System",
        start: { dateTime: new Date(newEventDate).toISOString() },
        end: {
          dateTime: new Date(
            new Date(newEventDate).getTime() + 60 * 60 * 1000,
          ).toISOString(),
        },
      };

      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        },
      );

      if (!res.ok) throw new Error("Gagal membuat event di kalender");

      setNewEventTitle("");
      setNewEventDate("");
      fetchEvents();
      toast.success("Event berhasil ditambahkan ke Google Calendar Anda!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" /> E-Meeting & Kalender
          </h1>
          <p className="text-slate-500 mt-1">
            Terintegrasi langsung dengan Google Calendar Workspace Anda.
          </p>
        </div>
        <button
          onClick={fetchEvents}
          className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg shadow-sm hover:bg-slate-50 flex items-center justify-center gap-2 transition-transform active:scale-95 w-full sm:w-auto text-sm"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />{" "}
          Sinkronisasi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 text-sm font-bold shadow-sm">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" /> {error}
            </div>
          )}

          {loading ? (
            <div className="p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[300px]">
              <RefreshCcw className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-400" />
              <p className="font-bold tracking-wide">Memuat kalender GWS...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                <Calendar className="w-8 h-8 mx-auto text-slate-300" />
              </div>
              <p className="font-bold text-slate-500">
                Tidak ada agenda dalam waktu dekat.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event, i) => {
                const isAllDay = !event.start.dateTime;
                const startDate = new Date(
                  event.start.dateTime || event.start.date,
                );

                return (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col sm:flex-row items-start gap-4 group"
                  >
                    <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {startDate.toLocaleDateString("id-ID", {
                          month: "short",
                        })}
                      </span>
                      <span className="text-2xl font-black leading-none">
                        {startDate.getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-slate-800 text-lg leading-tight mb-2 truncate group-hover:text-blue-700 transition-colors">
                        {event.summary || "(Tanpa Judul)"}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
                          <Clock className="w-3.5 h-3.5" />{" "}
                          {isAllDay
                            ? "Seharian"
                            : startDate.toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                        </span>
                        {event.hangoutLink && (
                          <a
                            href={event.hangoutLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-3 py-1 rounded-md border border-emerald-200 transition-colors shadow-sm"
                          >
                            <Video className="w-3.5 h-3.5" /> Google Meet
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 h-fit sticky top-6">
          <h3 className="font-black text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-widest text-sm border-b border-slate-100 pb-4">
            <Plus className="w-5 h-5 text-blue-600" /> Buat Meeting Baru
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
                Judul Rapat
              </label>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all bg-white"
                placeholder="Cth: Koordinasi Akreditasi Pokja HPK"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">
                Waktu Rapat
              </label>
              <input
                type="datetime-local"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all bg-white"
              />
            </div>
            <button
              onClick={handleCreateEvent}
              disabled={!newEventTitle || !newEventDate || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm mt-2"
            >
              <CheckCircle className="w-5 h-5" /> Simpan ke G-Calendar
            </button>
            <p className="text-[10px] text-slate-400 mt-4 text-center font-bold uppercase tracking-widest leading-relaxed bg-slate-50 p-2 border border-slate-100 rounded-lg">
              Agenda akan otomatis tersinkronisasi dengan Google Calendar
              Workspace GWS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
