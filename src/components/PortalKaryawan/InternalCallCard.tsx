import React from "react";
import { PhoneCall } from "lucide-react";
import toast from "react-hot-toast";

const InternalCallCard = () => {
  const extensions = [
    { unit: "IGD", ext: "118" },
    { unit: "Farmasi", ext: "201" },
    { unit: "Laboratorium", ext: "305" },
    { unit: "IT Support", ext: "999" },
  ];

  const handleCall = (ext: string) => {
    toast(`Memanggil ekstensi ${ext}... (Simulasi VoIP SIP Internal)`, {
      icon: "📞",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Panggilan Internal
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Simulasi VoIP SIP untuk komunikasi antar unit.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {extensions.map((item) => (
          <button
            key={item.ext}
            onClick={() => handleCall(item.ext)}
            className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-xl transition-colors group"
          >
            <PhoneCall className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-2" />
            <span className="text-xs font-bold text-slate-700">
              {item.unit}
            </span>
            <span className="text-[10px] text-slate-500">Ext: {item.ext}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InternalCallCard;
