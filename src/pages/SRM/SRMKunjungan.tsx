import React, { useState, useMemo } from "react";
import { useNavigate } from '@tanstack/react-router';
import { FileText, RefreshCw, FileSpreadsheet, XCircle } from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

const SRMKunjungan = () => {
  const navigate = useNavigate();
  const { visits, patients, operators } = useSRMStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("Semua");

  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const patient = patients.find((p) => p.id === visit.patientId);
      const operator = operators.find((o) => o.id === visit.operatorId);

      const searchMatch =
        !searchTerm ||
        patient?.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient?.id.toLowerCase().includes(searchTerm.toLowerCase());

      const operatorMatch =
        selectedOperator === "Semua" || operator?.nama === selectedOperator;

      // Basic date filtering (can be improved with proper date parsing)
      const dateMatch =
        (!startDate || visit.tanggalKunjungan >= startDate) &&
        (!endDate || visit.tanggalKunjungan <= endDate);

      return searchMatch && operatorMatch && dateMatch;
    });
  }, [
    visits,
    patients,
    operators,
    searchTerm,
    selectedOperator,
    startDate,
    endDate,
  ]);

  const totalBiaya = filteredVisits.reduce(
    (sum, visit) => sum + (visit.totalBiaya || 0),
    0,
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
        <h1 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
          LAPORAN KUNJUNGAN
        </h1>
      </div>

      {/* Filters & Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 bg-slate-50 p-3 border border-slate-300 rounded-sm">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-slate-700">
              DARI TANGGAL :
            </label>
            <input
              type="date"
              className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 bg-white"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-slate-700">
              S/D TANGGAL :
            </label>
            <input
              type="date"
              className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 bg-white"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-slate-700">
              Operator :
            </label>
            <select
              className="border border-slate-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500 bg-white"
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
            >
              <option value="Semua">Semua</option>
              {operators.map((op) => (
                <option key={op.id} value={op.nama}>
                  {op.nama}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-green-600 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setSelectedOperator("Semua");
              setSearchTerm("");
            }}
          >
            <RefreshCw className="w-4 h-4" /> REFRESH
          </button>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-1 text-sm text-blue-600 font-medium">
          <div className="flex justify-between w-64">
            <span>TOTAL BIAYA PEMERIKSAAN FISIK</span>
            <span>: Rp 0</span>
          </div>
          <div className="flex justify-between w-64">
            <span>TOTAL BIAYA PEMERIKSAAN PENUNJANG</span>
            <span>: Rp 0</span>
          </div>
          <div className="flex justify-between w-64">
            <span>TOTAL BIAYA DIAGNOSIS</span>
            <span>: Rp 0</span>
          </div>
          <div className="flex justify-between w-64">
            <span>TOTAL BIAYA TERAPI</span>
            <span>: Rp 0</span>
          </div>
          <div className="flex justify-between w-64">
            <span>TOTAL BIAYA TINDAKAN</span>
            <span>: Rp 0</span>
          </div>
          <div className="flex justify-between w-64 border-t border-blue-200 pt-1 mt-1 font-bold">
            <span>TOTAL BIAYA</span>
            <span>: {formatCurrency(totalBiaya)}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto border border-slate-300 rounded-sm mb-4">
        <table className="w-full text-xs text-left whitespace-nowrap">
          <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">
                NO
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">
                KODE TRANSAKSI
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">
                TANGGAL
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-center">
                NO.RM
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300">
                NAMA PASIEN
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-right">
                B.PEMERIKSAAN FISIK
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-right">
                B.PEMERIKSAAN PENUNJANG
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-right">
                B.DIAGNOSIS
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-right">
                B.TERAPI
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-right">
                B.TINDAKAN
              </th>
              <th className="px-3 py-2 font-bold border-r border-slate-300 text-right">
                TOTAL BIAYA
              </th>
              <th className="px-3 py-2 font-bold text-center">OPERATOR</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisits.length > 0 ? (
              filteredVisits.map((visit, index) => {
                const patient = patients.find((p) => p.id === visit.patientId);
                const operator = operators.find(
                  (o) => o.id === visit.operatorId,
                );
                return (
                  <tr
                    key={visit.id}
                    className="bg-white border-b border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-3 py-2 border-r border-slate-300 text-center">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-center">
                      {visit.id}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-center">
                      {visit.tanggalKunjungan}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-center">
                      {patient?.id || "-"}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300">
                      {patient?.namaLengkap || "-"}
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-right">
                      Rp 0
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-right">
                      Rp 0
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-right">
                      Rp 0
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-right">
                      Rp 0
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-right">
                      Rp 0
                    </td>
                    <td className="px-3 py-2 border-r border-slate-300 text-right font-medium">
                      {formatCurrency(visit.totalBiaya)}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {operator?.nama || "-"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="bg-white border-b border-slate-200">
                <td
                  colSpan={12}
                  className="px-3 py-8 text-center text-slate-400 italic"
                >
                  Tidak ada data kunjungan pada periode ini
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-4 bg-slate-50 p-3 border border-slate-300 rounded-sm">
        <div className="flex items-center gap-2 flex-1">
          <label className="text-sm font-bold text-slate-700 whitespace-nowrap">
            Cari Pasien :
          </label>
          <input
            type="text"
            placeholder="Masukkan No.RM/Nama..."
            className="w-full max-w-md border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button 
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          onClick={() => {
            const headers = ['No.RM', 'Nama Pasien', 'Tgl. Kunjungan', 'Poliklinik', 'Dokter', 'Status', 'Total Biaya'];
            const csvData = filteredVisits.map(v => {
              const p = patients.find(p => p.id === v.patientId);
              return [
                p?.id || '-',
                p?.namaLengkap || '-',
                v.tanggalKunjungan,
                'Poli Umum', // Placeholder
                v.dokterId,
                v.status,
                v.totalBiaya || 0
              ].join(',');
            });
            const csvContent = [headers.join(','), ...csvData].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `Laporan_Kunjungan_${startDate}_${endDate}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          <FileSpreadsheet className="w-4 h-4 text-green-600" /> Export Ke Excel
        </button>

        <button
          className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-red-600 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          onClick={() => navigate({ to: '/srm' })}
        >
          <XCircle className="w-4 h-4" /> Keluar
        </button>
      </div>
    </div>
  );
};

export default SRMKunjungan;
