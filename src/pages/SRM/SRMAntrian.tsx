import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  Megaphone,
  SkipForward,
  RotateCcw,
  Settings,
  Plus,
  Volume2,
  VolumeX,
  MonitorPlay,
  Printer,
  MessageCircle,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

import SRMAntrianTV from "./SRMAntrianTV";

const SRMAntrian = () => {
  const queueState = useSRMStore((state) => state.queueToday);
  const addQueue = useSRMStore((state) => state.addQueue);
  const callNextQueue = useSRMStore((state) => state.callNextQueue);
  const callQueueAgain = useSRMStore((state) => state.callQueueAgain);
  const skipQueue = useSRMStore((state) => state.skipQueue);
  const resetQueue = useSRMStore((state) => state.resetQueue);

  const [newPatientName, setNewPatientName] = useState("");
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [newPatientRM, setNewPatientRM] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
  const [isFullscreenTV, setIsFullscreenTV] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isFullscreenTV) {
    return (
      <div className="fixed inset-0 z-[9999] bg-slate-900 overflow-hidden w-screen h-screen">
        <div className="absolute top-4 right-4 z-[10000] flex gap-2">
          <button
            onClick={() =>
              document.documentElement
                .requestFullscreen()
                .catch((e) => console.log(e))
            }
            className="bg-black/50 hover:bg-black/70 text-white rounded px-3 py-1.5 text-sm font-bold backdrop-blur transition hidden md:block"
          >
            Fullscreen OS
          </button>
          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen().catch((e) => console.log(e));
              }
              setIsFullscreenTV(false);
            }}
            className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-1.5 text-sm font-bold backdrop-blur shadow-lg transition"
          >
            Tutup Layar TV
          </button>
        </div>
        <div className="w-full h-full overflow-hidden">
          <SRMAntrianTV />
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!window.speechSynthesis) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      let idVoices = voices.filter(
        (v) => v.lang === "id-ID" || v.lang === "id_ID",
      );
      if (idVoices.length === 0) idVoices = voices;

      setAvailableVoices(idVoices);

      if (idVoices.length > 0) {
        const googleVoice = idVoices.find(
          (v) => v.name.includes("Google") || v.name.includes("Damayanti"),
        );
        if (googleVoice) {
          setSelectedVoiceURI(googleVoice.voiceURI);
        } else {
          setSelectedVoiceURI(idVoices[0].voiceURI);
        }
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const playTTS = (noAntrian: string | number, nama?: string) => {
    if (!isSoundEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    let text = `Nomor antrian, ${noAntrian}.`;
    if (nama) text += ` Atas nama, ${nama}.`;
    text += ` Silahkan menuju ruang pemeriksaan.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.85;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoiceObj = voices.find(
      (v) => v.voiceURI === selectedVoiceURI,
    );

    if (selectedVoiceObj) {
      utterance.voice = selectedVoiceObj;
    } else {
      const idVoice = voices.find((v) => v.lang === "id-ID");
      if (idVoice) utterance.voice = idVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleAddQueue = () => {
    if (!newPatientName.trim()) return;
    addQueue(newPatientName, newPatientRM);
    setNewPatientName("");
    setNewPatientRM("");
  };

  const printTicket = (item: any) => {
    const printContent = `
      <div style="font-family: monospace; width: 300px; padding: 20px; text-align: center; color: black;">
        <h2 style="margin: 0; font-size: 24px;">KLINIK SEJAHTERA</h2>
        <p style="margin: 5px 0; font-size: 14px;">Tiket Antrian Pasien</p>
        <hr style="border: 1px dashed black; margin: 15px 0" />
        <h1 style="font-size: 64px; margin: 10px 0;">${item.nomor}</h1>
        <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">${item.nama}</p>
        <p style="margin: 5px 0; font-size: 14px;">RM: ${item.patientId || "-"}</p>
        <hr style="border: 1px dashed black; margin: 15px 0" />
        <p style="font-size: 12px;">Waktu: ${new Date(item.waktuDaftar).toLocaleString("id-ID")}</p>
        <p style="font-size: 12px; margin-top: 10px;">Silakan tunggu giliran Anda. Terima kasih.</p>
      </div>
      <script>
        window.onload = function() { window.print(); window.close(); }
      </script>
    `;
    const printWindow = window.open("", "", "width=400,height=600");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  const sendWA = (item: any) => {
    const message = `Halo ${item.nama}, nomor antrian Anda adalah *${item.nomor}*. Silakan bersiap-siap menuju ruang pemeriksaan karena giliran Anda sudah dekat. Terima kasih.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const currentQueueItem = queueState.list.find(
    (q) => q.status === "Sedang Diperiksa",
  );
  const currentQueueNumber = currentQueueItem ? currentQueueItem.nomor : "-";

  const nextQueueItem = queueState.list.find((q) => q.status === "Menunggu");
  const nextQueueNumber = nextQueueItem ? nextQueueItem.nomor : "---";

  const handleCallNext = async () => {
    if (nextQueueItem) {
      playTTS(nextQueueItem.nomor, nextQueueItem.nama);
    }
    await callNextQueue();
  };

  const handleCallAgain = () => {
    if (currentQueueItem) {
      playTTS(currentQueueItem.nomor, currentQueueItem.nama);
      callQueueAgain();
    }
  };

  const waitingCount = queueState.list.filter(
    (q) => q.status === "Menunggu",
  ).length;
  const finishedCount = queueState.list.filter(
    (q) => q.status === "Selesai",
  ).length;
  const totalCount = queueState.list.length;

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col md:flex-row gap-4">
      {/* Left Panel - Queue Display */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 flex flex-col items-center justify-center text-slate-900 shadow-sm h-full">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-6 h-6" />
            <h2 className="text-xl font-bold tracking-wider">ANTRIAN PASIEN</h2>
          </div>
          <div className="flex justify-between w-full text-sm text-slate-500 mb-6">
            <span>
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-blue-600 font-mono text-lg font-bold">
              {currentTime.toLocaleTimeString("id-ID")}
            </span>
          </div>

          {/* Current Queue */}
          <div className="bg-emerald-100 text-emerald-800 w-full rounded-md p-6 flex flex-col items-center justify-center mb-4 shadow-sm border border-emerald-200">
            <span className="text-sm font-medium mb-2 uppercase tracking-wider">
              Nomor Antrian Sekarang
            </span>
            <span className="text-6xl font-bold">{currentQueueNumber}</span>
            {currentQueueItem && (
              <span className="text-lg font-medium mt-2">
                {currentQueueItem.nama}
              </span>
            )}
          </div>

          {/* Next Queue */}
          <div className="bg-blue-100 text-blue-800 w-full rounded-md p-6 flex flex-col items-center justify-center mb-4 shadow-sm border border-blue-200">
            <span className="text-sm font-medium mb-2 uppercase tracking-wider">
              Antrian Berikutnya
            </span>
            <span className="text-4xl font-bold">{nextQueueNumber}</span>
            {nextQueueItem && (
              <span className="text-md font-medium mt-1">
                {nextQueueItem.nama}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-between w-full gap-2 mt-auto">
            <div className="bg-purple-100 text-purple-800 border border-purple-200 flex-1 rounded-md p-4 flex flex-col items-center justify-center shadow-sm">
              <span className="text-xs font-medium mb-1">Total Hari Ini</span>
              <span className="text-2xl font-bold">{totalCount}</span>
            </div>
            <div className="bg-orange-100 text-orange-800 border border-orange-200 flex-1 rounded-md p-4 flex flex-col items-center justify-center shadow-sm">
              <span className="text-xs font-medium mb-1">Menunggu</span>
              <span className="text-2xl font-bold">{waitingCount}</span>
            </div>
            <div className="bg-teal-100 text-teal-800 border border-teal-200 flex-1 rounded-md p-4 flex flex-col items-center justify-center shadow-sm">
              <span className="text-xs font-medium mb-1">Selesai</span>
              <span className="text-2xl font-bold">{finishedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Controls & List */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {/* Controls */}
        <div className="border border-slate-300 rounded-sm p-4 bg-slate-50">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-slate-600" />
              <h3 className="text-sm font-bold text-slate-700">
                Kontrol Antrian
              </h3>
            </div>

            {availableVoices.length > 0 && (
              <select
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="text-xs border border-slate-300 rounded px-2 py-1 text-slate-600 focus:outline-none focus:border-blue-500 max-w-[200px]"
              >
                {availableVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Nama Pasien..."
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="No. RM (opsional)"
              value={newPatientRM}
              onChange={(e) => setNewPatientRM(e.target.value)}
              className="w-1/3 border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddQueue}
              disabled={!newPatientName.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Tambah Antrian
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleCallNext}
              disabled={waitingCount === 0}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 rounded text-sm font-bold flex items-center justify-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <Megaphone className="w-5 h-5" /> Panggil Berikutnya
            </button>
            <button
              onClick={handleCallAgain}
              disabled={!currentQueueItem}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded text-sm font-bold flex items-center justify-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <RotateCcw className="w-5 h-5" /> Panggil Ulang
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => currentQueueItem && skipQueue()}
              disabled={!currentQueueItem}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              <SkipForward className="w-4 h-4" /> Lewati
            </button>
            <button
              onClick={resetQueue}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              <RotateCcw className="w-4 h-4" /> Reset Antrian
            </button>
            <button
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              {isSoundEnabled ? "Suara Aktif" : "Suara Mati"}
            </button>
            <button
              onClick={() => setIsFullscreenTV(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 shadow-sm "
            >
              <MonitorPlay className="w-4 h-4" /> Buka Layar TV
            </button>
          </div>
        </div>

        {/* List */}
        <div className="border border-slate-300 rounded-sm flex-1 flex flex-col bg-white overflow-hidden">
          <div className="bg-slate-100 px-3 py-2 border-b border-slate-300 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-bold text-slate-700">
              Daftar Antrian Hari Ini
            </h3>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-700 text-xs sticky top-0 border-b border-slate-300">
                <tr>
                  <th className="px-3 py-2 font-medium border-r border-slate-300 text-center">
                    No. Antrian
                  </th>
                  <th className="px-3 py-2 font-medium border-r border-slate-300 text-center">
                    No. RM
                  </th>
                  <th className="px-3 py-2 font-medium border-r border-slate-300">
                    Nama Pasien
                  </th>
                  <th className="px-3 py-2 font-medium border-r border-slate-300 text-center">
                    Waktu Daftar
                  </th>
                  <th className="px-3 py-2 font-medium border-r border-slate-300 text-center">
                    Status
                  </th>
                  <th className="px-3 py-2 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {queueState.list.length === 0 ? (
                  <tr className="bg-white border-b border-slate-200">
                    <td
                      colSpan={6}
                      className="px-3 py-8 text-center text-slate-400 italic"
                    >
                      Belum ada antrian hari ini
                    </td>
                  </tr>
                ) : (
                  queueState.list.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b border-slate-200 ${item.status === "Sedang Diperiksa" ? "bg-yellow-50" : item.status === "Selesai" ? "bg-slate-50 text-slate-500" : "bg-white"}`}
                    >
                      <td className="px-3 py-2 text-center border-r border-slate-200 font-bold">
                        {item.nomor}
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        {item.patientId || "-"}
                      </td>
                      <td className="px-3 py-2 border-r border-slate-200 font-medium">
                        {item.nama}
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        {new Date(item.waktuDaftar).toLocaleTimeString(
                          "id-ID",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </td>
                      <td className="px-3 py-2 text-center border-r border-slate-200">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "Menunggu"
                              ? "bg-orange-100 text-orange-700"
                              : item.status === "Sedang Diperiksa"
                                ? "bg-blue-100 text-blue-700"
                                : item.status === "Dilewati"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => printTicket(item)}
                            title="Cetak Tiket"
                            className="bg-slate-100 p-1.5 rounded hover:bg-slate-200 text-slate-700"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => sendWA(item)}
                            title="Kirim Notif WA"
                            className="bg-green-100 p-1.5 rounded hover:bg-green-200 text-green-700"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          {item.status === "Menunggu" && (
                            <button
                              onClick={() => skipQueue()}
                              className="bg-red-100 p-1.5 rounded hover:bg-red-200 text-red-700"
                              title="Lewati"
                            >
                              <SkipForward className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SRMAntrian;
