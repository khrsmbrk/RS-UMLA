import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Save,
  FileText,
  Camera,
  Stethoscope,
  Printer,
  FilePlus,
  XCircle,
  Package,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";
import { MasterDataModal } from "../../components/MasterDataModal";

const SRMRekamMedis = () => {
  const navigate = useNavigate();
  const patients = useSRMStore((state) => state.patients);
  const visits = useSRMStore((state) => state.visits);
  const addVisit = useSRMStore((state) => state.addVisit);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    patients.length > 0 ? patients[0].id : null,
  );

  // Form state
  const [anamnesa, setAnamnesa] = useState("");
  const [pemeriksaanFisik, setPemeriksaanFisik] = useState("");
  const [pemeriksaanPenunjang, setPemeriksaanPenunjang] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [terapi, setTerapi] = useState("");
  const [tindakan, setTindakan] = useState("");
  
  const [biayaFisik, setBiayaFisik] = useState(0);
  const [biayaPenunjang, setBiayaPenunjang] = useState(0);
  const [biayaDiagnosis, setBiayaDiagnosis] = useState(0);
  const [biayaTerapi, setBiayaTerapi] = useState(0);
  const [biayaTindakan, setBiayaTindakan] = useState(0);

  const totalBiaya = biayaFisik + biayaPenunjang + biayaDiagnosis + biayaTerapi + biayaTindakan;

  const [isPrinting, setIsPrinting] = useState(false);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: string;
    targetField: 'pemeriksaanFisik' | 'pemeriksaanPenunjang' | 'diagnosis' | 'terapi' | 'tindakan';
    title: string;
  } | null>(null);

  const filteredPatients = patients.filter(
    (p) =>
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nik.includes(searchTerm) ||
      p.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);
  const patientVisits = visits.filter((v) => v.patientId === selectedPatientId);

  const handleSave = () => {
    if (!selectedPatientId) return;

    addVisit({
      id: `V-${Date.now()}`,
      patientId: selectedPatientId,
      tanggalKunjungan: new Date().toISOString(),
      dokterId: "D-001", // Placeholder
      operatorId: "OP-001", // Placeholder
      anamnesa,
      pemeriksaanFisik,
      pemeriksaanPenunjang,
      diagnosis,
      terapi,
      tindakan,
      status: "Selesai",
      totalBiaya,
    });

    // Reset form after save
    setAnamnesa("");
    setPemeriksaanFisik("");
    setPemeriksaanPenunjang("");
    setDiagnosis("");
    setTerapi("");
    setTindakan("");
    setBiayaFisik(0);
    setBiayaPenunjang(0);
    setBiayaDiagnosis(0);
    setBiayaTerapi(0);
    setBiayaTindakan(0);
    alert("Data rekam medis berhasil disimpan!");
  };

  const handleNew = () => {
    setAnamnesa("");
    setPemeriksaanFisik("");
    setPemeriksaanPenunjang("");
    setDiagnosis("");
    setTerapi("");
    setTindakan("");
    setBiayaFisik(0);
    setBiayaPenunjang(0);
    setBiayaDiagnosis(0);
    setBiayaTerapi(0);
    setBiayaTindakan(0);
  };

  const handlePrintKwitansi = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleModalSelect = (item: any) => {
    if (!modalConfig) return;

    let contentToAppend = '';
    let costToAdd = 0;

    // Build the string to append based on the type of data
    if (modalConfig.type === 'pemeriksaan-fisik') {
      contentToAppend = item['Nama Pemeriksaan'] || '';
    } else if (modalConfig.type === 'pemeriksaan-penunjang') {
      contentToAppend = item['Nama Pemeriksaan'] || '';
    } else if (modalConfig.type === 'diagnosis') {
      contentToAppend = `${item['Kode ICD']} - ${item['Nama Penyakit']}`;
    } else if (modalConfig.type === 'terapi') {
      contentToAppend = item['Nama Terapi'] || '';
    } else if (modalConfig.type === 'tindakan') {
      contentToAppend = item['Nama Tindakan'] || '';
      costToAdd = Number(item['Tarif']) || 0;
    } else if (modalConfig.type === 'obat') {
       contentToAppend = `${item['Nama Obat']}`;
       costToAdd = Number(item['Harga']) || 0;
    } else if (modalConfig.type === 'template-diagnosis') {
       contentToAppend = item['Isi Template'] || '';
    }

    if (contentToAppend) {
      if (modalConfig.targetField === 'pemeriksaanFisik') {
        setPemeriksaanFisik(prev => prev ? `${prev}\n- ${contentToAppend}` : `- ${contentToAppend}`);
      } else if (modalConfig.targetField === 'pemeriksaanPenunjang') {
        setPemeriksaanPenunjang(prev => prev ? `${prev}\n- ${contentToAppend}` : `- ${contentToAppend}`);
      } else if (modalConfig.targetField === 'diagnosis') {
        setDiagnosis(prev => prev ? `${prev}\n- ${contentToAppend}` : `- ${contentToAppend}`);
      } else if (modalConfig.targetField === 'terapi') {
        setTerapi(prev => prev ? `${prev}\n- ${contentToAppend}` : `- ${contentToAppend}`);
        if(costToAdd) setBiayaTerapi(prev => prev + costToAdd);
      } else if (modalConfig.targetField === 'tindakan') {
        setTindakan(prev => prev ? `${prev}\n- ${contentToAppend}` : `- ${contentToAppend}`);
        if(costToAdd) setBiayaTindakan(prev => prev + costToAdd);
      }
    }
    
    setModalConfig(null);
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col md:flex-row gap-4">
      {/* Kwitansi Print Layout (Hidden on screen, visible on print if isPrinting is true) */}
      <div className={`${isPrinting ? 'block' : 'hidden'} print:block print:w-full print:absolute print:top-0 print:left-0 print:bg-white print:z-50 print:p-8 bg-white fixed inset-0 z-50 p-8 overflow-auto`}>
        {selectedPatient && (
          <div className="max-w-3xl mx-auto border border-black p-8 font-sans">
            <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold uppercase">{useSRMStore.getState().settings.header1}</h1>
                <p className="text-sm whitespace-pre-wrap">{useSRMStore.getState().settings.header2}</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold uppercase tracking-widest border border-black p-2 mb-2">Kwitansi</h2>
                <p className="text-sm font-bold">No. Kwitansi: KWT-{Date.now().toString().slice(-6)}</p>
                <p className="text-sm">Tanggal: {new Date().toLocaleDateString('id-ID')}</p>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <table className="w-full">
                  <tbody>
                    <tr><td className="w-32 py-1">Telah Terima Dari</td><td className="w-4">:</td><td className="font-bold border-b border-dotted border-black">{selectedPatient.namaLengkap}</td></tr>
                    <tr><td className="py-1">No. RM</td><td>:</td><td className="font-bold border-b border-dotted border-black">{selectedPatient.id}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm">Uang Sejumlah:</p>
              <div className="bg-slate-100 p-3 italic font-bold border border-black">
                {/* Note: In a real app, you'd use a number-to-words library here */}
                {totalBiaya.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm">Untuk Pembayaran:</p>
              <table className="w-full border-collapse border border-black text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-black px-4 py-2 text-left w-12">No</th>
                    <th className="border border-black px-4 py-2 text-left">Keterangan</th>
                    <th className="border border-black px-4 py-2 text-right w-48">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Simplified breakdown for prototype */}
                  <tr>
                    <td className="border border-black px-4 py-2 text-center">1</td>
                    <td className="border border-black px-4 py-2">Pemeriksaan / Konsultasi Dokter</td>
                    <td className="border border-black px-4 py-2 text-right">Rp {Math.round(totalBiaya * 0.4).toLocaleString('id-ID')}</td>
                  </tr>
                  {tindakan && (
                    <tr>
                      <td className="border border-black px-4 py-2 text-center">2</td>
                      <td className="border border-black px-4 py-2">Tindakan Medis: {tindakan}</td>
                      <td className="border border-black px-4 py-2 text-right">Rp {Math.round(totalBiaya * 0.3).toLocaleString('id-ID')}</td>
                    </tr>
                  )}
                  {terapi && (
                    <tr>
                      <td className="border border-black px-4 py-2 text-center">3</td>
                      <td className="border border-black px-4 py-2">Obat / Farmasi</td>
                      <td className="border border-black px-4 py-2 text-right">Rp {Math.round(totalBiaya * 0.3).toLocaleString('id-ID')}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} className="border border-black px-4 py-2 text-right font-bold">TOTAL:</td>
                    <td className="border border-black px-4 py-2 text-right font-bold">Rp {totalBiaya.toLocaleString('id-ID')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end mt-12 text-sm">
              <div className="text-center w-64">
                <p className="mb-16">Lamongan, {new Date().toLocaleDateString('id-ID')}</p>
                <p className="border-b border-black mb-1">Kasir / Petugas</p>
                <p className="text-xs text-slate-500">(SIM RS UMLA)</p>
              </div>
            </div>
            
            <div className="mt-8 text-center sm:hidden print:hidden border-t pt-4">
               <button onClick={() => setIsPrinting(false)} className="bg-red-500 text-white px-4 py-2 rounded">Tutup Print View (Dev Only)</button>
            </div>
          </div>
        )}
      </div>

      {/* Left Panel - Form */}
      <div className={`w-full md:w-2/3 flex flex-col gap-4 ${isPrinting ? 'hidden print:hidden' : ''}`}>
        {/* Search Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
          <label className="text-sm font-bold text-slate-700 whitespace-nowrap">
            CARI PASIEN :
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Masukkan No.RM/Nik.KTP/Nama..."
            className="flex-1 border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
          <button 
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-2 shadow-sm"
            onClick={() => alert('Pencarian sudah otomatis saat mengetik')}
          >
            <Search className="w-4 h-4" /> Cari
          </button>
          <span className="text-sm text-slate-500">atau</span>
          <button 
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-2 shadow-sm"
            onClick={() => navigate('/srm/pasien')}
          >
            <FilePlus className="w-4 h-4" /> Pendaftaran Pasien Baru
          </button>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm bg-slate-50 p-3 rounded border border-slate-200">
          <div className="flex">
            <span className="w-24 text-slate-500">NRM</span>
            <span className="font-bold">: {selectedPatient?.id || "-"}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-slate-500">Nik KTP</span>
            <span className="font-bold">: {selectedPatient?.nik || "-"}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-slate-500">Tgl. Registrasi</span>
            <span className="font-bold">
              :{" "}
              {selectedPatient
                ? new Date(
                    selectedPatient.tanggalRegistrasi,
                  ).toLocaleDateString("id-ID")
                : "-"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-slate-500">Nama</span>
            <span className="font-bold">
              : {selectedPatient?.namaLengkap || "-"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-slate-500">Tgl. Lahir</span>
            <span className="font-bold">
              : {selectedPatient?.kotaLahir} {selectedPatient?.tanggalLahir}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-slate-500">Kunjungan Ke</span>
            <span className="font-bold">
              : {patientVisits.length} Kali kunjungan
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-slate-500">Alamat</span>
            <span className="font-bold">
              : {selectedPatient?.kotaLahir || "-"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-slate-500">Umur</span>
            <span className="font-bold">
              :{" "}
              {selectedPatient
                ? new Date().getFullYear() -
                  new Date(selectedPatient.tanggalLahir).getFullYear()
                : "-"}{" "}
              Tahun
            </span>
          </div>
          <div className="flex items-center">
            <button 
              className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded text-xs font-medium w-full shadow-sm"
              onClick={() => alert('Fitur Tampilkan Detail Riwayat Kunjungan masih dalam pengembangan')}
            >
              Tampilkan Detail Riwayat Kunjungan
            </button>
          </div>
        </div>

        {/* Medical Record Form */}
        <div className="flex-1 overflow-auto border border-slate-300 rounded-sm p-3 bg-slate-50 flex flex-col gap-3">
          <div className="flex gap-2 items-start">
            <label className="w-48 text-right text-sm font-medium text-slate-700 pt-2">
              ANAMNESA :
            </label>
            <textarea
              value={anamnesa}
              onChange={(e) => setAnamnesa(e.target.value)}
              className="flex-1 border border-slate-300 rounded p-2 text-sm h-24 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex gap-2 items-start">
            <label className="w-48 text-right text-sm font-medium text-slate-700 pt-2">
              PEMERIKSAAN FISIK :
            </label>
            <div className="flex-1 flex flex-col gap-1">
              <textarea
                value={pemeriksaanFisik}
                onChange={(e) => setPemeriksaanFisik(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-sm h-16 focus:outline-none focus:border-blue-500"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button 
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1 rounded text-xs flex items-center gap-1 shadow-sm"
                  onClick={() => setModalConfig({ isOpen: true, type: 'pemeriksaan-fisik', targetField: 'pemeriksaanFisik', title: 'Pemeriksaan Fisik' })}
                >
                  <Search className="w-3 h-3" /> Cari Di Database
                </button>
                <input
                  type="number"
                  value={biayaFisik}
                  onChange={(e) => setBiayaFisik(Number(e.target.value) || 0)}
                  className="w-24 border border-slate-300 rounded px-2 py-1 text-xs text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <label className="w-48 text-right text-sm font-medium text-slate-700 pt-2">
              PEMERIKSAAN PENUNJANG :
            </label>
            <div className="flex-1 flex flex-col gap-1">
              <textarea
                value={pemeriksaanPenunjang}
                onChange={(e) => setPemeriksaanPenunjang(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-sm h-16 focus:outline-none focus:border-blue-500"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button 
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1 rounded text-xs flex items-center gap-1 shadow-sm"
                  onClick={() => setModalConfig({ isOpen: true, type: 'pemeriksaan-penunjang', targetField: 'pemeriksaanPenunjang', title: 'Pemeriksaan Penunjang' })}
                >
                  <Search className="w-3 h-3" /> Cari Di Database
                </button>
                <input
                  type="number"
                  value={biayaPenunjang}
                  onChange={(e) => setBiayaPenunjang(Number(e.target.value) || 0)}
                  className="w-24 border border-slate-300 rounded px-2 py-1 text-xs text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <label className="w-48 text-right text-sm font-medium text-slate-700 pt-2">
              DIAGNOSIS :
            </label>
            <div className="flex-1 flex flex-col gap-1">
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-sm h-16 focus:outline-none focus:border-blue-500"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button 
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1 rounded text-xs flex items-center gap-1 shadow-sm"
                  onClick={() => setModalConfig({ isOpen: true, type: 'diagnosis', targetField: 'diagnosis', title: 'Diagnosis (ICD-10)' })}
                >
                  <Search className="w-3 h-3" /> Cari Di Database
                </button>
                <button 
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1 rounded text-xs flex items-center gap-1 shadow-sm ml-2"
                  onClick={() => setModalConfig({ isOpen: true, type: 'template-diagnosis', targetField: 'diagnosis', title: 'Template Diagnosis' })}
                >
                  <Package className="w-3 h-3" /> Template
                </button>
                <input
                  type="number"
                  value={biayaDiagnosis}
                  onChange={(e) => setBiayaDiagnosis(Number(e.target.value) || 0)}
                  className="w-24 border border-slate-300 rounded px-2 py-1 text-xs text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <label className="w-48 text-right text-sm font-medium text-slate-700 pt-2">
              TERAPI :
            </label>
            <div className="flex-1 flex flex-col gap-1">
              <textarea
                value={terapi}
                onChange={(e) => setTerapi(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-sm h-16 focus:outline-none focus:border-blue-500"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button 
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1 rounded text-xs flex items-center gap-1 shadow-sm"
                  onClick={() => setModalConfig({ isOpen: true, type: 'terapi', targetField: 'terapi', title: 'Terapi' })}
                >
                  <Search className="w-3 h-3" /> Cari Terapi
                </button>
                <button 
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1 rounded text-xs flex items-center gap-1 shadow-sm ml-2"
                  onClick={() => setModalConfig({ isOpen: true, type: 'obat', targetField: 'terapi', title: 'Obat Farmasi' })}
                >
                  <Search className="w-3 h-3" /> Cari Obat Lama
                </button>
                <input
                  type="number"
                  value={biayaTerapi}
                  onChange={(e) => setBiayaTerapi(Number(e.target.value) || 0)}
                  className="w-24 border border-slate-300 rounded px-2 py-1 text-xs text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <label className="w-48 text-right text-sm font-medium text-slate-700 pt-2">
              TINDAKAN :
            </label>
            <div className="flex-1 flex flex-col gap-1">
              <textarea
                value={tindakan}
                onChange={(e) => setTindakan(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-sm h-16 focus:outline-none focus:border-blue-500"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button 
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1 rounded text-xs flex items-center gap-1 shadow-sm"
                  onClick={() => setModalConfig({ isOpen: true, type: 'tindakan', targetField: 'tindakan', title: 'Tindakan' })}
                >
                  <Search className="w-3 h-3" /> Cari Di Database
                </button>
                <input
                  type="number"
                  value={biayaTindakan}
                  onChange={(e) => setBiayaTindakan(Number(e.target.value) || 0)}
                  className="w-24 border border-slate-300 rounded px-2 py-1 text-xs text-right focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-48 text-right text-sm font-medium text-slate-700">
              No Transaksi :
            </label>
            <span className="text-blue-600 font-bold">-</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
          <button
            onClick={handleSave}
            disabled={!selectedPatientId}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" /> SIMPAN
          </button>
          <button 
            onClick={() => alert('Fitur Resep Obat akan membuka modal e-Resep.')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <FileText className="w-4 h-4" /> Resep Obat
          </button>
          <button 
            onClick={() => alert('Fitur Surat akan membuka pilihan surat keterangan sehat/sakit.')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <FileText className="w-4 h-4" /> Surat
          </button>
          <button 
            onClick={() => alert('Fitur Foto akan membuka kamera atau upload file.')}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <Camera className="w-4 h-4" /> Foto
          </button>
          <button 
            onClick={() => alert('Fitur Diagnosis akan membuka pencarian ICD-10.')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <Stethoscope className="w-4 h-4" /> Diagnosis
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" /> CETAK
          </button>
          <button 
            onClick={handlePrintKwitansi}
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" /> CETAK KWI
          </button>
          <button
            onClick={handleNew}
            className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-bold shadow-sm"
          >
            BARU
          </button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700">
              TOTAL BIAYA Rp :
            </span>
            <input
              type="text"
              readOnly
              value={totalBiaya.toLocaleString('id-ID')}
              className="w-24 border border-slate-300 rounded px-2 py-1 text-sm text-right font-bold bg-slate-100 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Patient List */}
      <div className={`w-full md:w-1/3 flex flex-col border border-slate-300 rounded-sm bg-white ${isPrinting ? 'hidden print:hidden' : ''}`}>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 sticky top-0">
              <tr>
                <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">
                  NO
                </th>
                <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">
                  NO RM
                </th>
                <th className="px-2 py-2 font-bold border-r border-slate-300 text-center">
                  NIK KTP
                </th>
                <th className="px-2 py-2 font-bold border-r border-slate-300">
                  NAMA
                </th>
                <th className="px-2 py-2 font-bold">TTL</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-4 text-center text-slate-400 italic"
                  >
                    Tidak ada data pasien
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient, index) => (
                  <tr
                    key={patient.id}
                    onClick={() => setSelectedPatientId(patient.id)}
                    className={`${selectedPatientId === patient.id ? "bg-green-500 text-white" : "bg-white hover:bg-slate-50 text-slate-700"} border-b border-slate-200 cursor-pointer`}
                  >
                    <td className="px-2 py-2 text-center border-r border-slate-300">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 text-center border-r border-slate-300">
                      {patient.id}
                    </td>
                    <td className="px-2 py-2 text-center border-r border-slate-300">
                      {patient.nik}
                    </td>
                    <td className="px-2 py-2 border-r border-slate-300 font-bold">
                      {patient.namaLengkap}
                    </td>
                    <td className="px-2 py-2">
                      {patient.kotaLahir}, {patient.tanggalLahir}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Search & Exit */}
        <div className="bg-slate-50 border-t border-slate-300 p-2 flex items-center gap-2">
          <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
            CARI PASIEN :
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Masukkan No.RM/Nik.KTP/Nama..."
            className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={() => navigate('/srm')}
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-red-600 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm ml-auto"
          >
            <XCircle className="w-3 h-3" /> KELUAR
          </button>
        </div>
      </div>

      {modalConfig && (
        <MasterDataModal
          isOpen={modalConfig.isOpen}
          type={modalConfig.type}
          title={modalConfig.title}
          onClose={() => setModalConfig(null)}
          onSelect={handleModalSelect}
        />
      )}
    </div>
  );
};

export default SRMRekamMedis;
