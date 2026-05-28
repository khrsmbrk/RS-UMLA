import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CalendarPlus, CheckCircle, User, Phone, MapPin, AlertCircle } from 'lucide-react';
import { POLIKLINIK, DOKTER } from '../../data/mockData';
import { useSRMStore } from '../../store/srmStore';
import { useSiteStore } from '../../store/siteStore';

export default function PendaftaranOnline() {
  const { settings } = useSiteStore();
  const navigate = useNavigate();
  const { patients, doctors, addPatient, addQueue, addVisit, queueToday } = useSRMStore();
  
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [queueNumber, setQueueNumber] = useState('');
  const [registeredName, setRegisteredName] = useState('');

  // Form State
  const [patientType, setPatientType] = useState<'baru' | 'lama'>('lama');
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  
  const [poli, setPoli] = useState('');
  const [dokter, setDokter] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (patientType === 'lama' && !nik) {
        setError('Harap isi NIK atau Nomor Rekam Medis.');
        return;
      }
      if (patientType === 'baru' && (!nik || !nama || !noHp || !alamat)) {
        setError('Harap lengkapi semua data diri.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!poli || !dokter || !tanggal || !paymentMethod) {
        setError('Harap lengkapi detail kunjungan.');
        return;
      }
      if (tanggal < today) {
        setError('Tanggal periksa tidak boleh di masa lalu.');
        return;
      }
      
      let currentPatientId = '';
      let currentPatientName = '';

      if (patientType === 'baru') {
        currentPatientId = `PSN${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
        currentPatientName = nama;
        addPatient({
          id: currentPatientId,
          nik: nik,
          namaLengkap: nama,
          pekerjaan: '-',
          kotaLahir: '-',
          tanggalLahir: '1990-01-01',
          jenisKelamin: 'L',
          statusPernikahan: '-',
          riwayatAlergi: '-',
          tanggalRegistrasi: new Date().toISOString().split('T')[0],
          jumlahKunjungan: 0
        });
      } else {
        const existing = patients.find(p => p.nik === nik || p.id === nik);
        if (existing) {
          currentPatientId = existing.id;
          currentPatientName = existing.namaLengkap;
        } else {
          setError('Data pasien tidak ditemukan. Periksa kembali NIK/No. RM Anda.');
          return;
        }
      }

      setRegisteredName(currentPatientName);

      const nextQueueNum = queueToday.totalHariIni + 1;
      setQueueNumber(`A-${nextQueueNum.toString().padStart(3, '0')}`);
      
      addQueue(currentPatientId, currentPatientName);

      const selectedDoc = doctors.find(d => d.nama === dokter);
      const docId = selectedDoc ? selectedDoc.id : 'DR001';

      addVisit({
        id: `VST-${tanggal.replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        patientId: currentPatientId,
        tanggalKunjungan: new Date(tanggal).toISOString(),
        dokterId: docId,
        operatorId: 'ONLINE',
        anamnesa: '-',
        pemeriksaanFisik: '-',
        pemeriksaanPenunjang: '-',
        diagnosis: '-',
        terapi: '-',
        tindakan: `Poli: ${poli}, Pembayaran: ${paymentMethod}`,
        status: 'Menunggu',
        totalBiaya: 0
      });

      // Simulate API Call
      setTimeout(() => {
        setIsSuccess(true);
      }, 800);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white border-b border-slate-200 py-4 px-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-emerald-700">Pendaftaran Online RSUMLA</h1>
            <Link to="/" className="text-sm font-medium text-slate-500 hover:text-emerald-600">Kembali ke Beranda</Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-slate-600 mb-6">
              Terima kasih, <strong>{registeredName}</strong>. Anda telah terdaftar untuk kunjungan ke <strong>{poli}</strong> dengan <strong>{dokter}</strong> pada tanggal <strong>{tanggal}</strong>.
            </p>
            
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl mb-8 text-left">
              <p className="text-emerald-800 font-medium text-sm mb-2">Nomor Antrian Anda:</p>
              <div className="text-4xl font-black text-emerald-700 mb-2">{queueNumber}</div>
              <p className="text-xs text-emerald-600 leading-relaxed">
                Silakan datang 30 menit sebelum jadwal. Tunjukkan nomor antrian ini atau KTP Anda di loket pendaftaran.
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Selesai
              </button>
              <button 
                onClick={() => {
                  setIsSuccess(false);
                  setStep(1);
                  setPoli(''); setDokter(''); setTanggal(''); setPaymentMethod('');
                }}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl transition-colors"
              >
                Daftar Pasien Lain
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-emerald-700">Pendaftaran Online RSUMLA</h1>
            <p className="text-xs text-slate-500">Daftar periksa tanpa antri di rumah sakit</p>
          </div>
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-emerald-600">Batal</Link>
        </div>
      </header>

      <main className="flex-1 py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          
          <div className="mb-10 text-center flex flex-col items-center">
            {settings.logoPendaftaran ? (
              <img src={settings.logoPendaftaran} alt="RS UMLA" className="h-24 object-contain" />
            ) : (
              <>
                <h1 className="text-5xl font-black text-emerald-600 tracking-tighter" style={{ fontFamily: "Unesa, sans-serif" }}>
                  RS UMLA
                </h1>
                <p className="text-[10px] font-semibold text-emerald-600 mt-1.5 tracking-wider uppercase">
                  Rumah Sakit Universitas Muhammadiyah Lamongan
                </p>
              </>
            )}
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
              <span className={`ml-3 text-sm font-medium ${step >= 1 ? 'text-emerald-700' : 'text-slate-500'}`}>Data Pasien</span>
            </div>
            <div className={`w-16 h-1 mx-4 rounded-full ${step >= 2 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
              <span className={`ml-3 text-sm font-medium ${step >= 2 ? 'text-emerald-700' : 'text-slate-500'}`}>Pilih Jadwal</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8">
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleNextStep}>
                
                {/* STEP 1: Data Pasien */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-1">Informasi Pasien</h2>
                      <p className="text-sm text-slate-500 mb-6">Apakah Anda sudah pernah berobat di RS UMLA sebelumnya?</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition-all ${patientType === 'lama' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-200'}`}>
                          <input type="radio" name="patientType" value="lama" checked={patientType === 'lama'} onChange={() => setPatientType('lama')} className="sr-only" />
                          <User className={`w-8 h-8 mb-2 ${patientType === 'lama' ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className={`font-bold ${patientType === 'lama' ? 'text-emerald-700' : 'text-slate-700'}`}>Pasien Lama</span>
                          <span className="text-xs text-slate-500 mt-1">Sudah punya No. RM</span>
                        </label>
                        <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition-all ${patientType === 'baru' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-200'}`}>
                          <input type="radio" name="patientType" value="baru" checked={patientType === 'baru'} onChange={() => setPatientType('baru')} className="sr-only" />
                          <User className={`w-8 h-8 mb-2 ${patientType === 'baru' ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className={`font-bold ${patientType === 'baru' ? 'text-emerald-700' : 'text-slate-700'}`}>Pasien Baru</span>
                          <span className="text-xs text-slate-500 mt-1">Belum pernah berobat</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">NIK / No. KTP <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          value={nik} 
                          onChange={(e) => setNik(e.target.value)}
                          placeholder="Masukkan 16 digit NIK"
                          className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>

                      {patientType === 'baru' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              value={nama} 
                              onChange={(e) => setNama(e.target.value)}
                              placeholder="Sesuai KTP"
                              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">No. WhatsApp <span className="text-red-500">*</span></label>
                              <div className="relative">
                                <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input 
                                  type="tel" 
                                  value={noHp} 
                                  onChange={(e) => setNoHp(e.target.value)}
                                  placeholder="0812xxxx"
                                  className="w-full border border-slate-300 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap <span className="text-red-500">*</span></label>
                              <div className="relative">
                                <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                                <textarea 
                                  value={alamat} 
                                  onChange={(e) => setAlamat(e.target.value)}
                                  placeholder="Alamat domisili"
                                  rows={2}
                                  className="w-full border border-slate-300 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                      <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center">
                        Lanjut Pilih Jadwal
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Pilih Jadwal */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-1">Detail Kunjungan</h2>
                      <p className="text-sm text-slate-500 mb-6">Pilih poliklinik, dokter, dan waktu kunjungan Anda.</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Poliklinik Tujuan <span className="text-red-500">*</span></label>
                        <select 
                          value={poli} 
                          onChange={(e) => { setPoli(e.target.value); setDokter(''); }}
                          className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                        >
                          <option value="">-- Pilih Poliklinik --</option>
                          {POLIKLINIK.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Dokter Spesialis <span className="text-red-500">*</span></label>
                        <select 
                          value={dokter} 
                          onChange={(e) => setDokter(e.target.value)}
                          disabled={!poli}
                          className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white disabled:bg-slate-50 disabled:text-slate-400"
                        >
                          <option value="">-- Pilih Dokter --</option>
                          {poli && DOKTER[poli]?.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Periksa <span className="text-red-500">*</span></label>
                          <input 
                            type="date" 
                            value={tanggal} 
                            min={today}
                            onChange={(e) => setTanggal(e.target.value)}
                            className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Metode Pembayaran <span className="text-red-500">*</span></label>
                          <select 
                            value={paymentMethod} 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                          >
                            <option value="">-- Pilih Pembayaran --</option>
                            <option value="umum">Umum / Pribadi</option>
                            <option value="bpjs">BPJS Kesehatan</option>
                            <option value="asuransi">Asuransi Lainnya</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2 transition-colors"
                      >
                        Kembali
                      </button>
                      <button 
                        type="submit" 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center shadow-lg shadow-emerald-200"
                      >
                        <CalendarPlus className="w-5 h-5 mr-2" />
                        Selesaikan Pendaftaran
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Butuh bantuan? Hubungi Call Center kami di <span className="font-bold text-emerald-700">0812-3456-7890</span></p>
          </div>

        </div>
      </main>
    </div>
  );
}
