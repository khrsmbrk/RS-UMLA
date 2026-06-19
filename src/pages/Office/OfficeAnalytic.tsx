import React, { useState, useMemo } from "react";
import {
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  ExternalLink,
  Printer,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

export default function OfficeAnalytic() {
  const [activeTab, setActiveTab] = useState("Hospital Performance");

  const visitData = [
    { name: "Jan", Outpatient: 4000, Inpatient: 2400 },
    { name: "Feb", Outpatient: 3000, Inpatient: 1398 },
    { name: "Mar", Outpatient: 2000, Inpatient: 9800 },
    { name: "Apr", Outpatient: 2780, Inpatient: 3908 },
    { name: "May", Outpatient: 1890, Inpatient: 4800 },
    { name: "Jun", Outpatient: 2390, Inpatient: 3800 },
    { name: "Jul", Outpatient: 3490, Inpatient: 4300 },
  ];

  const deptRevenue = [
    { name: "Pharmacy", value: 45 },
    { name: "Laboratory", value: 25 },
    { name: "Radiology", value: 15 },
    { name: "Consultations", value: 15 },
  ];

  const performanceTrends = [
    { day: "Mon", PatientFlow: 120, WaitTime: 14 },
    { day: "Tue", PatientFlow: 150, WaitTime: 18 },
    { day: "Wed", PatientFlow: 180, WaitTime: 22 },
    { day: "Thu", PatientFlow: 140, WaitTime: 15 },
    { day: "Fri", PatientFlow: 200, WaitTime: 25 },
    { day: "Sat", PatientFlow: 250, WaitTime: 30 },
    { day: "Sun", PatientFlow: 90, WaitTime: 10 },
  ];

  const COLORS = ["#0d9488", "#3b82f6", "#6366f1", "#f59e0b"];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="font-sans text-slate-800 max-w-7xl mx-auto space-y-6 pb-12 print:max-w-max print:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Executive Analytics{" "}
            <span className="text-xs font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200 hidden print:inline-block">
              OFFICIAL REPORT
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Hospital performance, patient demographics, and department insights
          </p>
        </div>
        <div className="flex gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-200/60 hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print / PDF
          </button>
          <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col min-h-[600px] print:shadow-none print:border-none print:p-0">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
          <div className="flex gap-2 flex-wrap">
            {[
              "Hospital Performance",
              "Patient Demographics",
              "Revenue Streams",
              "Department Efficiency",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab
                    ? "bg-teal-50 text-teal-700 shadow-sm"
                    : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Charts Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 print:grid-cols-2 print:gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 flex flex-col print:col-span-2">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-slate-800">
                Monthly Patient Visits
              </h3>
              <p className="text-sm text-slate-500">
                Overview of patient volume across Outpatient vs Inpatient care.
              </p>
            </div>
            <div className="flex-1 bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-center min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={visitData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                  />
                  <Bar
                    dataKey="Outpatient"
                    fill="#0d9488"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                  <Bar
                    dataKey="Inpatient"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 mb-4 print:mt-10">
              <h3 className="font-bold text-lg text-slate-800">
                Operational Efficiency Alerts
              </h3>
              <p className="text-sm text-slate-500">
                Wait times relative to overall patient flow this week.
              </p>
            </div>
            <div className="flex-1 bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-center min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceTrends}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <Tooltip
                    cursor={{
                      fill: "#f8fafc",
                      stroke: "#e2e8f0",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="PatientFlow"
                    name="Patient Flow"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="WaitTime"
                    name="Avg Wait (Mins)"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Panel Charts */}
          <div className="space-y-6 flex flex-col print:col-span-2 print:flex-row print:space-y-0 print:gap-6 print:mt-10">
            <div className="flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="font-bold text-slate-800">
                  Bed Occupancy Rate (BOR)
                </h3>
              </div>
              <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-6 print:bg-white print:border-slate-200">
                <div className="flex items-center gap-6 w-full">
                  <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="transparent"
                        stroke="#0d9488"
                        strokeWidth="8"
                        strokeDasharray="276"
                        strokeDashoffset="69"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black text-slate-800">
                        75%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>
                        <span className="text-slate-600 font-medium">
                          Occupied
                        </span>
                      </div>
                      <span className="font-bold text-slate-800 text-base">
                        115
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                        <span className="text-slate-600 font-medium">
                          Available
                        </span>
                      </div>
                      <span className="font-bold text-slate-800 text-base">
                        40
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="font-bold text-slate-800">
                  Revenue by Department
                </h3>
              </div>
              <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 p-6 flex flex-col print:bg-white print:border-slate-200">
                <div className="h-[200px] w-full mb-4 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deptRevenue}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {deptRevenue.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [
                          `${value}%`,
                          "Revenue Share",
                        ]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 mt-auto">
                  {deptRevenue.map((dept, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        ></div>
                        <span className="font-medium text-slate-600">
                          {dept.name}
                        </span>
                      </div>
                      <span className="font-bold text-slate-800">
                        {dept.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for printing */}
      <style>{`
        @media print {
          @page { size: landscape; margin: 1cm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; }
          .recharts-legend-wrapper { display: none !important; } /* Hide interactive legends from print for cleaner look */
        }
      `}</style>
    </div>
  );
}
