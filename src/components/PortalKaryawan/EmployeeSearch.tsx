import React, { useState } from "react";
import { Search, User } from "lucide-react";

const EmployeeSearch = ({ employees }: { employees: any[] }) => {
  const [query, setQuery] = useState("");

  const results =
    query.length > 2
      ? employees.filter(
          (e) =>
            e.name.toLowerCase().includes(query.toLowerCase()) ||
            e.unit.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Cari Karyawan</h3>

      <div className="relative mb-4">
        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Cari nama atau unit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {query.length > 2 && (
        <div className="space-y-2">
          {results.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-2">
              Tidak ditemukan.
            </p>
          ) : (
            results.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center p-2 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mr-3">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{emp.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {emp.jabatan} • {emp.unit}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
