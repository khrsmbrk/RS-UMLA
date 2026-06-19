import React, { useEffect, useState } from "react";
import { useLangStore } from "../store/langStore";
import { t } from "../utils/translations";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Users } from "lucide-react";

const COLORS = [
  "#059669",
  "#3b82f6",
  "#f59e0b",
  "#e11d48",
  "#8b5cf6",
  "#10b981",
  "#0ea5e9",
];
const GENDER_COLORS = ["#3b82f6", "#e11d48"];

const statusPegawaiData = [
  { name: "Pegawai Tetap Persyarikatan", value: 345 },
  { name: "Pegawai Kontrak", value: 180 },
  { name: "Dokter Mitra (Spesialis)", value: 45 },
  { name: "Tenaga Outsourcing", value: 85 },
];

const jenisTenagaData = [
  { name: "Tenaga Medis", value: 65 },
  { name: "Tenaga Keperawatan & Kebidanan", value: 275 },
  { name: "Tenaga Kesehatan Lain", value: 130 },
  { name: "Tenaga Non Kesehatan (Manajemen & Umum)", value: 185 },
];

const pendidikanData = [
  { name: "Spesialis", value: 45 },
  { name: "Profesi", value: 85 },
  { name: "S2/S3", value: 15 },
  { name: "S1/D4", value: 195 },
  { name: "D3", value: 240 },
  { name: "SMA/Sederajat", value: 75 },
];

const genderData = [
  { name: "Laki-laki", value: 215 },
  { name: "Perempuan", value: 440 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-md rounded-lg">
        <p className="font-medium text-slate-800">{label || payload[0].name}</p>
        <p className="text-emerald-700 font-bold">{payload[0].value} Orang</p>
      </div>
    );
  }
  return null;
};

const Table = ({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number }[];
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden mt-4 lg:mt-0">
      <div className="bg-emerald-50 py-3 px-4 border-b border-slate-200">
        <h3 className="font-semibold text-emerald-900 text-center">{title}</h3>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="py-2 px-4 text-left font-medium text-slate-600">
              Kategori
            </th>
            <th className="py-2 px-4 text-right font-medium text-slate-600">
              Jumlah
            </th>
            <th className="py-2 px-4 text-right font-medium text-slate-600">
              Persentase
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-slate-50 transition-colors">
              <td className="py-3 px-4 text-slate-700">{item.name}</td>
              <td className="py-3 px-4 text-right text-slate-700 font-medium">
                {item.value}
              </td>
              <td className="py-3 px-4 text-right text-slate-600">
                {((item.value / total) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
          <tr className="bg-slate-50 font-bold">
            <td className="py-3 px-4 text-slate-800">Total</td>
            <td className="py-3 px-4 text-right text-emerald-700">{total}</td>
            <td className="py-3 px-4 text-right text-slate-800">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default function SDM() {
  const { lang } = useLangStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <section className="bg-emerald-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rsumla-sdm/1920/600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-emerald-800/90"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          {/* Breadcrumb */}
          <nav
            className="flex text-emerald-100 text-sm mb-4 md:mb-6 w-full max-w-6xl"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center hover:text-white transition-colors"
                >
                  {t(lang, "Beranda", "Home")}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-emerald-300">Profil</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-emerald-400 font-medium">
                    Sumber Daya Manusia
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center mt-2 w-full">
            <Users className="w-12 h-12 md:w-16 md:h-16 text-emerald-400 mb-4 md:mb-6" />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t(lang, "Sumber Daya Manusia", "Human Resources")}
            </h1>
            <p className="text-base md:text-lg text-emerald-100 max-w-2xl px-4">
              {t(
                lang,
                "Informasi statistik komposisi Sumber Daya Manusia Rumah Sakit Universitas Muhammadiyah Lamongan.",
                "Statistical information on the composition of Human Resources at Muhammadiyah Lamongan University Hospital.",
              )}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        {/* Status Pegawai */}
        <section>
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPegawaiData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusPegawaiData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Table
              title="Total SDM Berdasarkan Status Pegawai"
              data={statusPegawaiData}
            />
          </div>
        </section>

        {/* Jenis Tenaga */}
        <section>
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="h-[300px] w-full lg:order-last">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jenisTenagaData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={110}
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {jenisTenagaData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Table
              title="Total SDM Berdasarkan Jenis Tenaga"
              data={jenisTenagaData}
            />
          </div>
        </section>

        {/* Pendidikan */}
        <section>
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pendidikanData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <RechartsTooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "#f1f5f9" }}
                  />
                  <Bar dataKey="value" fill="#059669" radius={[4, 4, 0, 0]}>
                    {pendidikanData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Table
              title="Total SDM Berdasarkan Pendidikan"
              data={pendidikanData}
            />
          </div>
        </section>

        {/* Jenis Kelamin */}
        <section>
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="h-[300px] w-full lg:order-last">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Table
              title="Total SDM Berdasarkan Jenis Kelamin"
              data={genderData}
            />
          </div>
        </section>

        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            <strong>Sumber:</strong> Bagian Sumber Daya Manusia RS UMLA (Data
            Simulasi Per{" "}
            {new Date().toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            })}
            )
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
