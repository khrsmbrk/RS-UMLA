import React, { useState } from "react";
import { EMPLOYEES } from "../data/employees";
import { buildQrUrl } from "../utils/qr";

const EmployeeQrGenerator = () => {
  const [selectedEmpId, setSelectedEmpId] = useState<string>("");

  const selectedEmployee = EMPLOYEES.find(
    (e) => e.id.toString() === selectedEmpId,
  );

  let qrData = "";
  let qrUrl = "";
  if (selectedEmployee) {
    qrData = JSON.stringify({
      nip: selectedEmployee.nip,
      name: selectedEmployee.name,
      qrId: selectedEmployee.qrId,
    });
    qrUrl = buildQrUrl(qrData);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-2">
        Generate QR Code Karyawan
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        Pilih karyawan untuk membuat QR Code ID Card.
      </p>

      <div className="mb-4">
        <select
          value={selectedEmpId}
          onChange={(e) => setSelectedEmpId(e.target.value)}
          className="w-full md:w-1/2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">-- Pilih Karyawan --</option>
          {EMPLOYEES.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} - {emp.nip}
            </option>
          ))}
        </select>
      </div>

      {selectedEmployee && (
        <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg border border-slate-200 w-full md:w-1/2">
          <div className="bg-white p-4 rounded-lg mb-4">
            <img
              src={qrUrl}
              alt={`QR Code ${selectedEmployee.name}`}
              className="w-48 h-48 object-contain"
            />
          </div>
          <h3 className="text-slate-900 font-bold text-lg">
            {selectedEmployee.name}
          </h3>
          <p className="text-slate-500 text-sm">{selectedEmployee.nip}</p>
          <p className="text-blue-600 text-xs mt-1">
            {selectedEmployee.jabatan}
          </p>

          <a
            href={qrUrl}
            download={`QR_${selectedEmployee.nip}.png`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Unduh QR Code
          </a>
        </div>
      )}
    </div>
  );
};

export default EmployeeQrGenerator;
