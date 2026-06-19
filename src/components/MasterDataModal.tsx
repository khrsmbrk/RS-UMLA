import React, { useState } from "react";
import { Search, X, Check } from "lucide-react";
import { useSRMStore } from "../store/srmStore";

interface MasterDataModalProps {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: any) => void;
  title: string;
}

export const MasterDataModal: React.FC<MasterDataModalProps> = ({
  type,
  isOpen,
  onClose,
  onSelect,
  title,
}) => {
  const masterData = useSRMStore((state) => state.masterData);
  const data = masterData[type] || [];
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredData = data.filter((item) => {
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-2xl flex flex-col h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-700 flex items-center gap-2">
            <Search className="w-5 h-5" /> Cari Data {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-slate-200">
          <input
            type="text"
            placeholder="Ketik untuk mencari..."
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-auto p-4">
          {filteredData.length === 0 ? (
            <div className="text-center text-slate-500 italic py-8">
              Data tidak ditemukan. Silakan tambahkan di menu Master Data.
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-700 sticky top-0">
                <tr>
                  <th className="px-4 py-2 border-b border-slate-300 w-12 text-center">
                    Pilih
                  </th>
                  {Object.keys(filteredData[0])
                    .filter((k) => k !== "id")
                    .map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 border-b border-slate-300 uppercase"
                      >
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-200 hover:bg-blue-50 cursor-pointer"
                    onClick={() => onSelect(item)}
                  >
                    <td className="px-4 py-2 border-r border-slate-300 text-center">
                      <button className="bg-blue-100 text-blue-600 p-1 rounded hover:bg-blue-600 hover:text-white transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                    </td>
                    {Object.keys(item)
                      .filter((k) => k !== "id")
                      .map((key) => (
                        <td
                          key={key}
                          className="px-4 py-2 border-r border-slate-300"
                        >
                          {item[key]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-300 hover:bg-slate-400 text-slate-800 px-4 py-2 rounded text-sm font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
