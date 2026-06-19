import React, { useState } from "react";
import { EMPLOYEES } from "../data/employees";

const QrAttendanceModule = ({ user }: { user: any }) => {
  const [scanValue, setScanValue] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleScan = () => {
    if (!scanValue) return;

    const employee = EMPLOYEES.find((e) => e.qrId === scanValue.trim());
    if (!employee) {
      setMessage("QR tidak dikenali. Pastikan QR ID sesuai data karyawan.");
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateStr = now.toISOString().slice(0, 10);

    const newLog = {
      id: `${employee.id}-${dateStr}-${timeStr}`,
      employeeId: employee.id,
      name: employee.name,
      jabatan: employee.jabatan,
      divisi: employee.divisi,
      date: dateStr,
      time: timeStr,
      status: "Hadir",
      device: user.name,
    };

    setLogs((prev) => [newLog, ...prev]);
    setMessage(`Absensi tercatat untuk ${employee.name} pada ${timeStr}.`);
    setScanValue("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-2">
        Modul Absensi QR Karyawan
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        Simulasi pencatatan kehadiran menggunakan QR ID karyawan. Di kelas, QR
        dapat digenerate dan dipindai kamera.
      </p>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center mb-4">
        <input
          type="text"
          placeholder="Scan / masukkan QR ID, contoh: QR-RSML-0001"
          value={scanValue}
          onChange={(e) => setScanValue(e.target.value)}
          className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
        />
        <button
          onClick={handleScan}
          className="px-4 py-3 bg-blue-600 text-white text-sm rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Catat Absensi
        </button>
      </div>

      {message && (
        <div className="mb-4 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          {message}
        </div>
      )}

      <h3 className="text-sm font-semibold text-slate-700 mb-3">
        Log Absensi Hari Ini (Simulasi)
      </h3>
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="min-w-full text-xs text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-500">Waktu</th>
              <th className="px-4 py-3 font-medium text-slate-500">Nama</th>
              <th className="px-4 py-3 font-medium text-slate-500">Jabatan</th>
              <th className="px-4 py-3 font-medium text-slate-500">Divisi</th>
              <th className="px-4 py-3 font-medium text-slate-500">Status</th>
              <th className="px-4 py-3 font-medium text-slate-500">Device</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Belum ada data absensi. Lakukan simulasi scan QR ID.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-700">
                    {log.date} · {log.time}
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-medium">
                    {log.name}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{log.jabatan}</td>
                  <td className="px-4 py-3 text-slate-500 capitalize">
                    {log.divisi}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{log.device}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-[10px] text-slate-500 mt-4">
        Dalam implementasi nyata, input QR ID diganti dengan hasil scan kamera
        menggunakan library QR scanner React, lalu disimpan ke database untuk
        rekap absensi.
      </p>
    </div>
  );
};

export default QrAttendanceModule;
