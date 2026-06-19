import React, { useState } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const OvertimeModule = ({
  overtimes,
  employeeId,
}: {
  overtimes: any[];
  employeeId: string;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [localOvertimes, setLocalOvertimes] = useState(
    overtimes.filter((o) => o.employeeId === employeeId),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate retrieving from form elements
    const formData = new FormData(e.target as HTMLFormElement);
    const hours = formData.get("hours");
    const date = formData.get("date");
    const reason = formData.get("reason");

    const newOv = {
      id: `OVT-NEW-${Date.now()}`,
      employeeId,
      date: date ? String(date) : new Date().toISOString().split("T")[0],
      hours: hours ? Number(hours) : 2,
      reason: reason ? String(reason) : "Pekerjaan tambahan (Simulasi)",
      status: "Menunggu",
      approvedBy: null,
    };
    setLocalOvertimes([newOv, ...localOvertimes]);
    setShowForm(false);
    toast.success("Pengajuan lembur berhasil dikirim (Simulasi)");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-black text-slate-800">Lembur</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md font-bold transition-colors ${showForm ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"}`}
        >
          {showForm ? "Batal" : "Ajukan Lembur"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-5 bg-blue-50/50 rounded-xl border border-blue-100 shadow-inner"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                required
                className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                Durasi (Jam)
              </label>
              <input
                type="number"
                name="hours"
                min="1"
                max="12"
                required
                className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
              Alasan Lembur
            </label>
            <textarea
              name="reason"
              required
              rows={2}
              className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
              placeholder="Jelaskan alasan lembur..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm shadow-blue-200 transition-colors"
          >
            Kirim Pengajuan
          </button>
        </form>
      )}

      <div className="space-y-3">
        {localOvertimes.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50 font-medium">
            Belum ada riwayat lembur.
          </p>
        ) : (
          localOvertimes.map((ov) => (
            <div
              key={ov.id}
              className="p-4 border border-slate-200 rounded-xl flex justify-between items-center hover:border-slate-300 transition-colors"
            >
              <div>
                <p className="text-sm font-black text-slate-800">{ov.date}</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  <span className="text-slate-800 font-bold font-mono">
                    {ov.hours}j
                  </span>{" "}
                  • {ov.reason}
                </p>
              </div>
              <div>
                {ov.status === "Disetujui" && (
                  <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Disetujui
                  </span>
                )}
                {ov.status === "Ditolak" && (
                  <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-md shadow-sm">
                    <XCircle className="w-3.5 h-3.5 mr-1" /> Ditolak
                  </span>
                )}
                {ov.status === "Menunggu" && (
                  <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md shadow-sm">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> Menunggu
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OvertimeModule;
