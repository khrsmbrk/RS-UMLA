import React from "react";
import { Bell, Calendar, Info, Clock } from "lucide-react";

const NotificationList = ({ notifications }: { notifications: any[] }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "schedule":
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case "overtime":
        return <Clock className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black text-slate-800">Notifikasi</h3>
        <span className="bg-rose-100 text-rose-600 text-[10px] uppercase font-black px-2.5 py-1 rounded-md tracking-widest">
          {notifications.length} Baru
        </span>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-start group hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mr-3 flex-shrink-0 border border-slate-200 group-hover:bg-white group-hover:border-slate-300 transition-colors">
              {getIcon(notif.type)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                {notif.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {notif.body}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                {new Date(notif.createdAt).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
