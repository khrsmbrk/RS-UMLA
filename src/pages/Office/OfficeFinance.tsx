import React, { useState, useMemo } from "react";
import { useNavigate } from '@tanstack/react-router';
import {
  DollarSign,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  FileText,
  Database,
} from "lucide-react";
import { useSRMStore } from "../../store/srmStore";

export default function OfficeFinance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  const visits = useSRMStore((state) => state.visits);
  const patients = useSRMStore((state) => state.patients);

  // Compute metrics from visits
  const totalRevenue = useMemo(() => {
    return visits.reduce((acc, v) => acc + (v.totalBiaya || 0), 0);
  }, [visits]);

  // Generate mock expenses/profits based on revenue roughly
  const totalExpenses = totalRevenue * 0.3;
  const netProfit = totalRevenue - totalExpenses;
  const pendingClaims = totalRevenue * 0.15; // Just a mock representation

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const formatShortCurrency = (value: number) => {
    if (value >= 1e9) return `Rp ${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `Rp ${(value / 1e6).toFixed(1)}M`;
    return formatter.format(value);
  };

  // Generate transaction list based on actual visits (just show top paid visits)
  const transactions = useMemo(() => {
    const sortedVisits = [...visits]
      .filter((v) => v.totalBiaya > 0)
      .sort(
        (a, b) =>
          new Date(b.tanggalKunjungan).getTime() -
          new Date(a.tanggalKunjungan).getTime(),
      );
    return sortedVisits.map((v, i) => {
      const px = patients.find((p) => p.id === v.patientId);
      return {
        detail: `Patient Payment - ${px?.namaLengkap || "Unknown Patient"}`,
        ref: `INV-${v.id}`,
        cat: "Revenue",
        date: new Date(v.tanggalKunjungan).toLocaleDateString(),
        amount: `+ ${formatter.format(v.totalBiaya)}`,
        type: "income",
        status: "Completed",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      };
    });
  }, [visits, patients]);

  // Insert some mock expense and payroll to make the list look realistic
  const allTxs = useMemo(() => {
    const list = [...transactions];
    // Add some random static expenses
    list.splice(1, 0, {
      detail: "Medical Supply Procurement",
      ref: "EXP-2026-901",
      cat: "Expense",
      date: new Date().toLocaleDateString(),
      amount: "- Rp 15.500.000",
      type: "expense",
      status: "Completed",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    });
    list.splice(3, 0, {
      detail: "BPJS Claim Settlement (Partial)",
      ref: "CLM-2026-112",
      cat: "Revenue",
      date: new Date().toLocaleDateString(),
      amount: "+ Rp 45.000.000",
      type: "income",
      status: "Pending",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    });
    return list;
  }, [transactions]);

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage hospital revenue, expenses, and financial tracking
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/srm/kasir" })}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Database className="w-4 h-4 text-teal-100" /> SRM Kasir & Billing
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Revenue
              </h3>
            </div>
            <span className="text-emerald-500 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-black">
              LIVE
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {formatShortCurrency(totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> From SRM
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Total Expenses
              </h3>
            </div>
            <span className="text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-black">
              EST
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {formatShortCurrency(totalExpenses)}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-slate-500 font-medium flex items-center">
                Projected
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">Net Profit</h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {formatShortCurrency(netProfit)}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-emerald-500 font-medium flex items-center">
                Healthy Margin
              </span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" />
              <h3 className="font-medium text-slate-500 text-sm">
                Pending Claims
              </h3>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-800 mt-2">
              {formatShortCurrency(pendingClaims)}
            </div>
            <div className="flex items-center gap-1 text-xs mt-2">
              <span className="text-amber-500 font-medium flex items-center">
                BPJS & Insurance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[500px]">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              "Overview",
              "Invoices",
              "Expenses",
              "Insurance Claims",
              "Payroll",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-200/50"
                    : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-xs">
                <th className="pb-3 px-4 font-medium">Transaction Details</th>
                <th className="pb-3 px-4 font-medium">Category</th>
                <th className="pb-3 px-4 font-medium">Date</th>
                <th className="pb-3 px-4 font-medium">Amount</th>
                <th className="pb-3 px-4 font-medium text-center">Status</th>
                <th className="pb-3 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {allTxs.map((tx, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">{tx.detail}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{tx.ref}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-600 font-medium">{tx.cat}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{tx.date}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`font-bold ${tx.type === "income" ? "text-emerald-600" : "text-slate-700"}`}
                    >
                      {tx.amount}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-md border text-[11px] font-bold ${tx.color}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mx-auto transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {allTxs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-500 italic"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
          <p className="text-xs text-slate-500">Showing recent transactions</p>
        </div>
      </div>
    </div>
  );
}
