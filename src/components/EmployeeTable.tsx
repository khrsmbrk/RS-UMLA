import React from "react";

const EmployeeTable = ({ employees }: { employees: any[] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden">
      <h3 className="text-lg font-medium text-slate-900 mb-4">
        Daftar Karyawan
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-500">NIP</th>
              <th className="px-4 py-3 font-medium text-slate-500">Nama</th>
              <th className="px-4 py-3 font-medium text-slate-500">Jabatan</th>
              <th className="px-4 py-3 font-medium text-slate-500">Divisi</th>
              <th className="px-4 py-3 font-medium text-slate-500">Status</th>
              <th className="px-4 py-3 font-medium text-slate-500">
                Lembur (Jam)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-500">{emp.nip}</td>
                <td className="px-4 py-3 text-slate-900 font-medium">
                  {emp.name}
                </td>
                <td className="px-4 py-3 text-slate-500">{emp.jabatan}</td>
                <td className="px-4 py-3 text-slate-500 capitalize">
                  {emp.divisi}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-medium border ${
                      emp.status === "Hadir"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{emp.lembur}</td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Tidak ada data karyawan yang sesuai filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
