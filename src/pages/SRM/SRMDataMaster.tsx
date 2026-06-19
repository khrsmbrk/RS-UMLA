import React, { useState } from "react";
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  XCircle,
  Package,
  Activity,
  Stethoscope,
  FileText,
  Syringe,
  Pill,
  AlignLeft,
  Check,
  X,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

const masterConfig: Record<
  string,
  { title: string; icon: any; fields: string[] }
> = {
  "pemeriksaan-fisik": {
    title: "Master Pemeriksaan Fisik",
    icon: Activity,
    fields: ["Nama Pemeriksaan", "Kategori"],
  },
  "pemeriksaan-penunjang": {
    title: "Master Pemeriksaan Penunjang",
    icon: Stethoscope,
    fields: ["Nama Pemeriksaan", "Jenis"],
  },
  diagnosis: {
    title: "Master Diagnosis (ICD-10)",
    icon: FileText,
    fields: ["Kode ICD", "Nama Penyakit"],
  },
  terapi: {
    title: "Master Terapi",
    icon: Syringe,
    fields: ["Nama Terapi", "Kategori"],
  },
  tindakan: {
    title: "Master Tindakan",
    icon: AlignLeft,
    fields: ["Kode Tindakan", "Nama Tindakan", "Tarif"],
  },
  obat: {
    title: "Master Obat",
    icon: Pill,
    fields: ["Kode Obat", "Nama Obat", "Stok", "Harga"],
  },
  "template-diagnosis": {
    title: "Template Diagnosis",
    icon: Package,
    fields: ["Nama Template", "Isi Template"],
  },
};

export default function SRMDataMaster() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const config = type ? masterConfig[type] : null;

  const { masterData, addMasterData, updateMasterData, deleteMasterData } =
    useSRMStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);

  if (!config || !type) {
    return (
      <div className="p-8 text-center text-slate-500">
        Modul master "{type}" tidak ditemukan.
      </div>
    );
  }

  const { title, icon: Icon, fields } = config;

  const currentData = masterData[type] || [];
  const filteredData = currentData.filter((item) =>
    fields.some((field) =>
      String(item[field] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    ),
  );

  const handleOpenModal = (item?: any) => {
    if (item) {
      setFormData(item);
      setIsEditing(true);
      setSelectedId(item.id);
    } else {
      const emptyForm: Record<string, string> = {};
      fields.forEach((f) => (emptyForm[f] = ""));
      setFormData(emptyForm);
      setIsEditing(false);
      setSelectedId(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && selectedId) {
      await updateMasterData(type, selectedId, formData);
    } else {
      await addMasterData(type, formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (window.confirm("Hapus data ini?")) {
      await deleteMasterData(type, selectedId);
      setSelectedId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-300 shadow-sm rounded-sm p-4 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Icon className="w-5 h-5 text-blue-600" /> {title}
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-2 text-slate-400" />
            <input
              type="text"
              placeholder={`Cari ${title}...`}
              className="border border-slate-300 rounded pl-8 pr-2 py-1.5 focus:outline-none focus:border-blue-500 text-xs w-64 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate({ to: "/srm" })}
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-red-600 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <XCircle className="w-4 h-4" /> KELUAR
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-slate-300 rounded-sm mb-4">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 sticky top-0 shadow-sm">
            <tr>
              <th className="px-4 py-2 border-r border-slate-300 w-12 text-center">
                NO
              </th>
              {fields.map((field, idx) => (
                <th key={idx} className="px-4 py-2 border-r border-slate-300">
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={fields.length + 1}
                  className="px-4 py-8 text-center text-slate-500 italic"
                >
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-slate-200 hover:bg-blue-50 cursor-pointer ${selectedId === item.id ? "bg-blue-100" : ""}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <td className="px-4 py-2 border-r border-slate-300 text-center">
                    {index + 1}
                  </td>
                  {fields.map((field, idx) => (
                    <td
                      key={idx}
                      className="px-4 py-2 border-r border-slate-300"
                    >
                      {item[field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-start gap-2 border-t border-slate-200 pt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onClick={() => handleOpenModal()}
        >
          <Plus className="w-4 h-4" /> TAMBAH BARU
        </button>
        <button
          className={`px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm ${selectedId ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-slate-100 border border-slate-200 text-slate-400 opacity-50 cursor-not-allowed"}`}
          disabled={!selectedId}
          onClick={() =>
            handleOpenModal(currentData.find((d) => d.id === selectedId))
          }
        >
          <Edit className="w-4 h-4" /> EDIT
        </button>
        <button
          className={`px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm ${selectedId ? "bg-red-600 hover:bg-red-700 text-white" : "bg-slate-100 border border-slate-200 text-slate-400 opacity-50 cursor-not-allowed"}`}
          disabled={!selectedId}
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4" /> HAPUS
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-md flex flex-col">
            <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-slate-50">
              <h2 className="font-bold text-slate-700">
                {isEditing ? "Edit Data" : "Tambah Data"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-4 flex flex-col gap-3">
              {fields.map((field) => (
                <div key={field}>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {field}
                  </label>
                  {field.toLowerCase().includes("isi") ||
                  field.toLowerCase().includes("deskripsi") ? (
                    <textarea
                      required
                      className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm h-24 focus:outline-none focus:border-blue-500"
                      value={formData[field] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                    />
                  ) : (
                    <input
                      type={
                        field.toLowerCase() === "tarif" ||
                        field.toLowerCase() === "harga" ||
                        field.toLowerCase() === "stok"
                          ? "number"
                          : "text"
                      }
                      required
                      className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                      value={formData[field] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm"
                >
                  <Check className="w-4 h-4" /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
