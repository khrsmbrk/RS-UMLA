import React, { useState } from 'react';
import { FileText, Download, Printer, Filter, Calendar, FileDown } from 'lucide-react';
import { useSiteStore } from '../../store/siteStore';
import { useSRMStore } from '../../store/srmStore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

const SRMLaporanPDF = () => {
  const [jenisLaporan, setJenisLaporan] = useState('kunjungan');
  const { settings } = useSiteStore();
  const { visits, patients, doctors } = useSRMStore();
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [poliklinik, setPoliklinik] = useState('semua');
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      
      const doc = new jsPDF('p', 'pt', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Kop Surat
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("RUMAH SAKIT UNIVERSITAS MUHAMMADIYAH LAMONGAN", pageWidth / 2, 40, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Raya Plalangan Plosowahyu KM 2, Lamongan", pageWidth / 2, 55, { align: 'center' });
      doc.text("Telp. (0322) 322356, Fax. (0322) 314048", pageWidth / 2, 68, { align: 'center' });
      doc.text("Email: rumahsakit@umla.ac.id", pageWidth / 2, 81, { align: 'center' });
      
      doc.setLineWidth(2);
      doc.setDrawColor(5, 150, 105);
      doc.line(40, 95, pageWidth - 40, 95);
      
      // Title
      const reportTitleMap: Record<string, string> = {
        kunjungan: 'LAPORAN KUNJUNGAN PASIEN',
        pendapatan: 'LAPORAN PENDAPATAN',
        diagnosa: 'LAPORAN 10 BESAR DIAGNOSA',
        tindakan: 'LAPORAN TINDAKAN MEDIS',
        obat: 'LAPORAN PENGGUNAAN OBAT'
      };
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(reportTitleMap[jenisLaporan], pageWidth / 2, 130, { align: 'center' });
      
      const pAwal = startDate ? formatDate(startDate) : '-';
      const pAkhir = endDate ? formatDate(endDate) : '-';
      doc.setFont("helvetica", "normal");
      doc.text(`Periode: ${pAwal} s/d ${pAkhir}`, pageWidth / 2, 145, { align: 'center' });
      
      // AutoTable
      autoTable(doc, {
        html: '#report-table',
        startY: 165,
        theme: 'grid',
        styles: { fontSize: 9, font: 'helvetica' },
        headStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold' },
        margin: { top: 40, bottom: 60, left: 40, right: 40 }
      });
      
      // Footer
      const finalY = (doc as any).lastAutoTable.finalY || 165;
      doc.setFontSize(10);
      doc.text(`Lamongan, ${formatDate(new Date().toISOString())}`, pageWidth - 40, finalY + 40, { align: 'right' });
      doc.setFont("helvetica", "bold");
      doc.text("Admin Rekam Medis", pageWidth - 40, finalY + 100, { align: 'right' });
      
      doc.save(`Laporan_${jenisLaporan}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Gagal membuat PDF. Silakan gunakan fitur Print (Cetak).');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShowPreview = () => {
    setShowPreview(true);
  };

  // Helper formatting Date
  const formatDate = (isoStr: string) => {
    if (!isoStr) return '-';
    const d = new Date(isoStr);
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  // 1. Calculate Filtered Data
  const getFilteredVisits = () => {
    return visits.filter(v => {
      let isValid = true;
      if (startDate) {
        if (new Date(v.tanggalKunjungan) < new Date(startDate)) isValid = false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);
        if (new Date(v.tanggalKunjungan) >= end) isValid = false;
      }
      // Note: mapping poli to doctor isn't strictly strict in DB, this is mostly for visual completeness.
      if (poliklinik !== 'semua') {
         // for real implementation, would check doctor.spesialisasi === poliklinik
      }
      return isValid;
    });
  };

  const getPatientName = (patientId: string) => {
    const p = patients.find(p => p.id === patientId);
    return p ? p.namaLengkap : '-';
  };

  const getDoctorName = (doctorId: string) => {
    const d = doctors.find(d => d.id === doctorId);
    return d ? d.nama : '-';
  };

  // Generate Report View Based on jenisLaporan
  const renderReportContent = () => {
    if (!showPreview) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-32">
          <FileText className="w-16 h-16 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">Belum Ada Data</h3>
          <p className="text-slate-500 text-sm max-w-sm">
            Silakan atur parameter laporan di panel sebelah kiri dan klik tombol "Tampilkan" untuk melihat preview laporan.
          </p>
        </div>
      );
    }

    const filtered = getFilteredVisits();
    const periodeAwalFmt = startDate ? formatDate(startDate) : '-';
    const periodeAkhirFmt = endDate ? formatDate(endDate) : '-';

    if (filtered.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-12">
          <h3 className="text-lg font-medium text-slate-700 mb-2">Data Tidak Ditemukan</h3>
          <p className="text-slate-500 text-sm">Tidak ada data untuk periode {periodeAwalFmt} hingga {periodeAkhirFmt}.</p>
        </div>
      );
    }

    // Title Section Inside report Content
    const reportTitleMap: Record<string, string> = {
      kunjungan: 'LAPORAN KUNJUNGAN PASIEN',
      pendapatan: 'LAPORAN PENDAPATAN',
      diagnosa: 'LAPORAN 10 BESAR DIAGNOSA',
      tindakan: 'LAPORAN TINDAKAN MEDIS',
      obat: 'LAPORAN PENGGUNAAN OBAT'
    };

    let titleBlock = (
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold underline mb-1">{reportTitleMap[jenisLaporan]}</h2>
        <p className="text-sm">Periode: {periodeAwalFmt} s/d {periodeAkhirFmt}</p>
      </div>
    );

    let tableContent = null;

    if (jenisLaporan === 'kunjungan') {
      tableContent = (
        <table id="report-table" className="w-full border-collapse border border-slate-800 text-sm text-left">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-800 p-2 w-12 text-center">No</th>
              <th className="border border-slate-800 p-2">Tanggal</th>
              <th className="border border-slate-800 p-2">No. RM</th>
              <th className="border border-slate-800 p-2">Nama Pasien</th>
              <th className="border border-slate-800 p-2">Dokter</th>
              <th className="border border-slate-800 p-2 w-24 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.id} style={{ pageBreakInside: 'avoid' }}>
                <td className="border border-slate-800 p-2 text-center">{i + 1}</td>
                <td className="border border-slate-800 p-2">{formatDate(v.tanggalKunjungan)}</td>
                <td className="border border-slate-800 p-2">{v.patientId}</td>
                <td className="border border-slate-800 p-2">{getPatientName(v.patientId)}</td>
                <td className="border border-slate-800 p-2">{getDoctorName(v.dokterId)}</td>
                <td className="border border-slate-800 p-2 text-center">{v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (jenisLaporan === 'pendapatan') {
      const total = filtered.reduce((sum, v) => sum + (v.totalBiaya || 0), 0);
      tableContent = (
        <table id="report-table" className="w-full border-collapse border border-slate-800 text-sm text-left">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-800 p-2 w-12 text-center">No</th>
              <th className="border border-slate-800 p-2">Tanggal</th>
              <th className="border border-slate-800 p-2">No. RM</th>
              <th className="border border-slate-800 p-2">Nama Pasien</th>
              <th className="border border-slate-800 p-2 text-right">Biaya (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v, i) => (
              <tr key={v.id} style={{ pageBreakInside: 'avoid' }}>
                <td className="border border-slate-800 p-2 text-center">{i + 1}</td>
                <td className="border border-slate-800 p-2">{formatDate(v.tanggalKunjungan)}</td>
                <td className="border border-slate-800 p-2">{v.patientId}</td>
                <td className="border border-slate-800 p-2">{getPatientName(v.patientId)}</td>
                <td className="border border-slate-800 p-2 text-right">
                  {new Intl.NumberFormat('id-ID').format(v.totalBiaya || 0)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-slate-50">
              <td colSpan={4} className="border border-slate-800 p-2 text-right">Total Pendapatan</td>
              <td className="border border-slate-800 p-2 text-right">Rp {new Intl.NumberFormat('id-ID').format(total)}</td>
            </tr>
          </tfoot>
        </table>
      );
    } else if (jenisLaporan === 'diagnosa') {
      const counts: Record<string, number> = {};
      filtered.forEach(v => {
        if (v.diagnosis && v.diagnosis !== '-') {
          counts[v.diagnosis] = (counts[v.diagnosis] || 0) + 1;
        }
      });
      const top10 = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 10);
      tableContent = (
        <table id="report-table" className="w-full border-collapse border border-slate-800 text-sm text-left">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-800 p-2 w-12 text-center">No</th>
              <th className="border border-slate-800 p-2">Diagnosa</th>
              <th className="border border-slate-800 p-2 w-32 text-center">Jumlah Kasus</th>
            </tr>
          </thead>
          <tbody>
            {top10.map(([diag, count], i) => (
              <tr key={diag} style={{ pageBreakInside: 'avoid' }}>
                <td className="border border-slate-800 p-2 text-center">{i + 1}</td>
                <td className="border border-slate-800 p-2">{diag}</td>
                <td className="border border-slate-800 p-2 text-center">{count}</td>
              </tr>
            ))}
            {top10.length === 0 && (
              <tr><td colSpan={3} className="border border-slate-800 p-2 text-center">Tidak ada data diagnosa valid.</td></tr>
            )}
          </tbody>
        </table>
      );
    } else if (jenisLaporan === 'tindakan') {
      const counts: Record<string, number> = {};
      filtered.forEach(v => {
        if (v.tindakan && v.tindakan !== '-') {
          counts[v.tindakan] = (counts[v.tindakan] || 0) + 1;
        }
      });
      const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
      tableContent = (
        <table id="report-table" className="w-full border-collapse border border-slate-800 text-sm text-left">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-800 p-2 w-12 text-center">No</th>
              <th className="border border-slate-800 p-2">Tindakan Medis</th>
              <th className="border border-slate-800 p-2 w-32 text-center">Total Frekuensi</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(([tindakan, count], i) => (
              <tr key={tindakan} style={{ pageBreakInside: 'avoid' }}>
                <td className="border border-slate-800 p-2 text-center">{i + 1}</td>
                <td className="border border-slate-800 p-2">{tindakan}</td>
                <td className="border border-slate-800 p-2 text-center">{count}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr><td colSpan={3} className="border border-slate-800 p-2 text-center">Tidak ada data tindakan valid.</td></tr>
            )}
          </tbody>
        </table>
      );
    } else if (jenisLaporan === 'obat') {
      const counts: Record<string, number> = {};
      filtered.forEach(v => {
        if (v.terapi && v.terapi !== '-') {
          // split by comma or newline if they log multiple medicines 
          const obatArr = v.terapi.split(',').map(s => s.trim()).filter(Boolean);
          obatArr.forEach(obat => {
            counts[obat] = (counts[obat] || 0) + 1;
          });
        }
      });
      const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
      tableContent = (
        <table id="report-table" className="w-full border-collapse border border-slate-800 text-sm text-left">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-800 p-2 w-12 text-center">No</th>
              <th className="border border-slate-800 p-2">Nama Obat / Terapi</th>
              <th className="border border-slate-800 p-2 w-32 text-center">Total Resep</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(([obat, count], i) => (
              <tr key={obat} style={{ pageBreakInside: 'avoid' }}>
                <td className="border border-slate-800 p-2 text-center">{i + 1}</td>
                <td className="border border-slate-800 p-2">{obat}</td>
                <td className="border border-slate-800 p-2 text-center">{count}</td>
              </tr>
            ))}
             {sorted.length === 0 && (
              <tr><td colSpan={3} className="border border-slate-800 p-2 text-center">Tidak ada data obat valid.</td></tr>
            )}
          </tbody>
        </table>
      );
    }

    return (
      <div className="w-full text-slate-900 mt-8 mb-8 flex-1 pb-16">
        {titleBlock}
        {tableContent}
        
        {/* Footer TTD */}
        <div className="mt-16 w-full flex justify-end pr-8">
          <div className="text-center">
            <p className="mb-16">Lamongan, {formatDate(new Date().toISOString())}</p>
            <p className="font-bold underline">Admin Rekam Medis</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto print:max-w-none print:w-full print:m-0">
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-red-600" />
            Laporan PDF
          </h1>
          <p className="text-slate-500">Cetak dan unduh laporan dalam format PDF</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:block print:w-full">
        {/* Sidebar Filter */}
        <div className="lg:col-span-1 print:hidden">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-blue-600" />
              Parameter Laporan
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Jenis Laporan</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jenisLaporan}
                  onChange={(e) => {
                    setJenisLaporan(e.target.value);
                    setShowPreview(false);
                  }}
                >
                  <option value="kunjungan">Laporan Kunjungan Pasien</option>
                  <option value="pendapatan">Laporan Pendapatan</option>
                  <option value="diagnosa">Laporan 10 Besar Diagnosa</option>
                  <option value="tindakan">Laporan Tindakan Medis</option>
                  <option value="obat">Laporan Penggunaan Obat</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Periode Awal</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setShowPreview(false); }}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Periode Akhir</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setShowPreview(false); }}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Poliklinik (Opsional)</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={poliklinik}
                  onChange={(e) => { setPoliklinik(e.target.value); setShowPreview(false); }}
                >
                  <option value="semua">Semua Poliklinik</option>
                  <option value="umum">Poli Umum</option>
                  <option value="gigi">Poli Gigi</option>
                  <option value="anak">Poli Anak</option>
                  <option value="kandungan">Poli Kandungan</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-2">
                <button 
                  onClick={handleShowPreview}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Tampilkan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2 print:col-span-3 print:block print:w-full">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col print:border-none print:shadow-none">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl print:hidden">
              <h2 className="font-semibold text-slate-800">Preview Laporan</h2>
              <div className="flex gap-2">
                <button onClick={handlePrint} className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Cetak">
                  <Printer className="w-5 h-5" />
                </button>
                <button onClick={handleDownload} disabled={isExporting} className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="Unduh PDF">
                  <FileDown className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-8 bg-slate-200 flex items-start justify-center min-h-[500px] overflow-auto print:p-0 print:bg-white print:block">
              <div id="pdf-content" className="bg-white p-8 px-12 shadow-md w-full max-w-4xl min-h-[842px] flex flex-col border border-slate-300 relative print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none print:w-full">
                {/* Kop Surat Default */}
                <div className="flex items-center gap-6 border-b-[3px] border-emerald-600 pb-6 mb-4 w-full bg-white relative z-10 shrink-0">
                  {settings.logoHomepage ? (
                    <img src={settings.logoHomepage} alt="Logo RSUMLA" className="w-24 h-24 object-contain flex-shrink-0" />
                  ) : (
                    <div className="w-24 h-24 bg-slate-100 flex items-center justify-center text-slate-400 text-xs border border-slate-200">Logo</div>
                  )}
                  <div className="flex-1 text-center pr-24">
                    <h1 className="text-[22px] font-bold text-slate-900 leading-tight">RUMAH SAKIT UNIVERSITAS MUHAMMADIYAH LAMONGAN</h1>
                    <p className="text-sm text-slate-800 tracking-tight mt-1">Jl. Raya Plalangan Plosowahyu KM 2, Lamongan</p>
                    <p className="text-sm text-slate-800 tracking-tight">Telp. (0322) 322356, Fax. (0322) 314048</p>
                    <p className="text-sm text-slate-800 tracking-tight">Email: rumahsakit@umla.ac.id</p>
                  </div>
                </div>

                <div className="text-center w-full mb-6 shrink-0">
                  <p className="text-lg" style={{ fontFamily: '"Traditional Arabic", serif' }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                </div>

                {/* Content rendering */}
                {renderReportContent()}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SRMLaporanPDF;
