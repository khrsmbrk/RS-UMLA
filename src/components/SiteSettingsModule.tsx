import React, { useState, useRef } from "react";
import { useSiteStore } from "../store/siteStore";
import { Save, Upload, Image as ImageIcon, Type, Palette } from "lucide-react";

export default function SiteSettingsModule() {
  const { settings, updateSettings } = useSiteStore();

  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logoUrl" | "heroImage",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    updateSettings(formData);
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Pengaturan berhasil disimpan!");
      setTimeout(() => setSaveMessage(""), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Pengaturan Website
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Kelola tampilan dan konten halaman utama website RS UMLA.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>

      {saveMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-lg mb-6 flex items-center">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
          {saveMessage}
        </div>
      )}

      {/* Identitas Website */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center">
          <ImageIcon className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-slate-900">Identitas Visual</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Logo Website
            </label>
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt="Logo Preview"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-slate-400 text-xs">No Logo</span>
                )}
              </div>
              <div className="flex-grow">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={logoInputRef}
                  onChange={(e) => handleImageUpload(e, "logoUrl")}
                />
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors mb-2"
                >
                  <Upload className="w-4 h-4 mr-2" /> Unggah Logo Baru
                </button>
                <p className="text-xs text-slate-500">
                  Format yang disarankan: PNG dengan background transparan.
                  Ukuran maksimal 2MB.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Warna Utama (Tema)
            </label>
            <select
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
              className="w-full md:w-1/2 bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="emerald">Emerald (Hijau RS UMLA)</option>
              <option value="blue">Blue (Biru)</option>
              <option value="teal">Teal (Hijau Kebiruan)</option>
              <option value="indigo">Indigo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Konten Hero Section */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center">
          <Type className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-slate-900">
            Konten Beranda (Hero Section)
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gambar Latar Belakang (Background)
            </label>
            <div className="flex flex-col space-y-4">
              {formData.heroImage && (
                <div className="w-full h-48 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative">
                  <img
                    src={formData.heroImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={heroInputRef}
                  onChange={(e) => handleImageUpload(e, "heroImage")}
                />
                <button
                  onClick={() => heroInputRef.current?.click()}
                  className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" /> Unggah Gambar Latar
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  Gambar resolusi tinggi (1920x1080) disarankan untuk hasil
                  terbaik.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">
                Bahasa Indonesia
              </h4>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Judul Utama
                </label>
                <textarea
                  name="heroTitleId"
                  value={formData.heroTitleId}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Sub-judul (Deskripsi)
                </label>
                <textarea
                  name="heroSubtitleId"
                  value={formData.heroSubtitleId}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">
                English
              </h4>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Main Title
                </label>
                <textarea
                  name="heroTitleEn"
                  value={formData.heroTitleEn}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Subtitle (Description)
                </label>
                <textarea
                  name="heroSubtitleEn"
                  value={formData.heroSubtitleEn}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
