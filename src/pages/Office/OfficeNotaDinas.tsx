import React, { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  CheckCircle,
  Clock,
  FilePlus,
  X,
  UploadCloud,
  Send,
  RefreshCcw,
  Mail,
} from "lucide-react";
import { useOfficeStore } from "./store/officeStore";
import { getAccessToken } from "./store/auth";
import toast from "react-hot-toast";

export default function OfficeNotaDinas() {
  const { userRole, notaDinas, addNotaDinas } = useOfficeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Draft Form State
  const [kepada, setKepada] = useState("Direktur Utama");
  const [perihal, setPerihal] = useState("");
  const [isi, setIsi] = useState("");

  const combinedDrafts = [
    {
      id: "ND-001",
      title: "Pengajuan Penambahan SDM Perawat",
      date: "2026-05-24",
      status: "Draft",
      to: "Direktur Utama",
      driveId: null,
    },
    {
      id: "ND-002",
      title: "Permintaan Perbaikan AC Radiologi",
      date: "2026-05-23",
      status: "Pending",
      to: "Wadir Umum & Keuangan",
      driveId: null,
    },
    {
      id: "ND-003",
      title: "Laporan Kegiatan Orientasi Karyawan Baru",
      date: "2026-05-20",
      status: "Disetujui",
      to: "Direktur SDM",
      driveId: null,
    },
    ...notaDinas
  ];
  const [drafts, setDrafts] = useState(combinedDrafts);

  const handleSimpanKeDrive = async () => {
    if (!perihal || !isi) return toast.error("Isi perihal dan isi nota dinas!");

    setIsUploading(true);
    try {
      const token = await getAccessToken();
      if (!token)
        throw new Error(
          "Not authenticated with Google Workspace. Please log out and back in.",
        );

      const metadata = {
        name: `ND_${perihal.replace(/[^a-zA-Z0-9]/g, "_")}.txt`,
        mimeType: "text/plain",
      };

      const fileContent = `NOTA DINAS\n\nKepada: ${kepada}\nDari: User System\nPerihal: ${perihal}\n\nIsi:\n${isi}`;

      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" }),
      );
      form.append("file", new Blob([fileContent], { type: "text/plain" }));

      const res = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        },
      );

      if (!res.ok) throw new Error("Gagal upload ke Google Drive");
      const data = await res.json();

      const newDraft = {
        id: `ND-00${drafts.length + 1}`,
        title: perihal,
        date: new Date().toISOString().split("T")[0],
        status: "Draft",
        to: kepada,
        driveId: data.id,
      };

      setDrafts([newDraft, ...drafts]);
      addNotaDinas(newDraft);
      setIsModalOpen(false);
      setPerihal("");
      setIsi("");
      toast.success(`Berhasil disimpan ke Google Drive dengan ID: ${data.id}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleKirimEmail = async (draftInfo: any) => {
    const confirmed = window.confirm(
      `Kirim notifikasi email untuk Nota Dinas "${draftInfo.title}"?`,
    );
    if (!confirmed) return;

    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");

      const userProfileRes = await fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const userProfile = await userProfileRes.json();

      const toEmail = userProfile.email;
      const subject = `[E-Office] Nota Dinas: ${draftInfo.title}`;
      const message = `Halo,\n\nAnda memiliki Nota Dinas baru untuk diperiksa.\n\nPerihal: ${draftInfo.title}\nTujuan: ${draftInfo.to}\nStatus: Menunggu Persetujuan\n\nSilakan login ke E-Office RS UMLA untuk melihat detail.`;

      const rawMessage = [
        `To: ${toEmail}`,
        "Subject: " + subject,
        "",
        message,
      ].join("\n");

      const encodedMessage = btoa(rawMessage)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      const res = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raw: encodedMessage }),
        },
      );

      if (!res.ok) throw new Error("Gagal mengirim email lewat Gmail");

      setDrafts(
        drafts.map((d) =>
          d.id === draftInfo.id ? { ...d, status: "Pending" } : d,
        ),
      );
      toast.success("Email notifikasi berhasil dikirim melalui Gmail Anda!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" /> Nota Dinas &
            E-Drafting
          </h1>
          <p className="text-slate-500 mt-1">
            Sistem administrasi surat menyurat dengan integrasi penyimpanan
            Google Drive.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" /> Buat Nota Dinas Baru
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">
              Direktori Surat & Nota Dinas
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Daftar arsip nota dinas yang pernah Anda buat atau ajukan.
            </p>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari ID dokumen atau perihal..."
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full sm:w-72"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Informasi Dokumen
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Tujuan Disposisi
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                  Tanggal Buat
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">
                  Status Tracking
                </th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">
                  Aksi Manajemen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {drafts.map((d, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50 group transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-800 tracking-tight">
                      {d.title}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        {d.id}
                      </span>
                      {d.driveId && (
                        <span className="text-indigo-600 font-bold text-[10px] flex items-center gap-1">
                          <UploadCloud className="w-3 h-3" /> Tersimpan (GDrive)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-600">
                    {d.to}
                  </td>
                  <td className="px-6 py-5 text-slate-500 font-mono text-xs">
                    {d.date}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-3 py-1.5 text-xs font-bold rounded-full border inline-flex items-center gap-1.5 ${
                        d.status === "Disetujui"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : d.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {d.status === "Pending" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                      )}
                      {d.status === "Disetujui" && (
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                      )}
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button className="text-slate-600 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-md text-xs font-bold transition-colors">
                      Tinjau
                    </button>
                    {d.status === "Draft" && (
                      <button
                        onClick={() => handleKirimEmail(d)}
                        className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md shadow-sm text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3 h-3" /> Notifikasi Email
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <FilePlus className="w-6 h-6 text-indigo-600" /> Formulir
                E-Drafting Nota Dinas
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                    Ditujukan Kepada
                  </label>
                  <select
                    value={kepada}
                    onChange={(e) => setKepada(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option>Direktur Utama</option>
                    <option>Wakil Direktur Medis</option>
                    <option>Wakil Direktur Administrasi & Keuangan</option>
                    <option>Kepala Bidang Keperawatan</option>
                    <option>Kepala Instalasi Gawat Darurat</option>
                  </select>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm opacity-75">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                    Pengirim (Sistem Otomatis)
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Akun Terautentikasi (User Login)"
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-medium bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                  Subject / Perihal
                </label>
                <input
                  type="text"
                  value={perihal}
                  onChange={(e) => setPerihal(e.target.value)}
                  placeholder="Contoh: Pengajuan Pengadaan Alat Defibrilator IGD..."
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                  Isi Detail Dokumen
                </label>
                <textarea
                  rows={10}
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  className="flex-1 w-full border border-slate-300 rounded-lg p-3 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-none"
                  placeholder="Uraikan isi nota dinas, alasan pengajuan, spesifikasi teknis, atau rincian kegiatan..."
                ></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 border border-slate-300 bg-white text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Batalkan
              </button>
              <button
                onClick={handleSimpanKeDrive}
                disabled={isUploading}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors"
              >
                {isUploading ? (
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                ) : (
                  <UploadCloud className="w-5 h-5" />
                )}
                {isUploading
                  ? "Menyimpan..."
                  : "Simpan & Arsipkan ke Google Drive"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
