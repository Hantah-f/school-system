import React, { useMemo } from 'react';
import { Student, AttendanceStatus } from '../types';

// Since Recharts is loaded via CDN, we need to access it from the window object.
// const { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } = (window as any).Recharts; // This line is removed

interface SummaryCardProps {
  title: string;
  count: number;
  // Fix: Replaced JSX.Element with React.ReactNode to resolve namespace issue.
  icon: React.ReactNode;
  colorClass: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, icon, colorClass }) => (
  <div className={`p-6 rounded-xl flex items-center space-x-4 ${colorClass}`}>
    <div className="text-white bg-black/10 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-3xl font-bold text-white">{count}</p>
      <p className="text-white/80 font-medium">{title}</p>
    </div>
  </div>
);

const AttendanceSummary: React.FC<{ students: Student[] }> = ({ students }) => {
  const summary = useMemo(() => {
    return students.reduce(
      (acc, student) => {
        acc[student.status]++;
        return acc;
      },
      { [AttendanceStatus.PRESENT]: 0, [AttendanceStatus.ABSENT]: 0, [AttendanceStatus.TARDY]: 0 }
    );
  }, [students]);
  
  const totalStudents = students.length;

  const chartData = [
    { name: 'Present', value: summary[AttendanceStatus.PRESENT] },
    { name: 'Absent', value: summary[AttendanceStatus.ABSENT] },
    { name: 'Tardy', value: summary[AttendanceStatus.TARDY] },
  ];

  const COLORS = {
      'Present': 'hsl(142.1 76.2% 36.3%)',
      'Absent': 'hsl(0 72.2% 50.6%)',
      'Tardy': 'hsl(47.9 95.8% 53.1%)',
  };
  
  // Since Recharts is loaded via CDN, we must access it from the window object
  // at render time to ensure the script has loaded.
  const Recharts = (window as any).Recharts;

  const ChartComponent = () => {
    if (!Recharts) {
        return (
            <div className="h-64 lg:h-auto flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl text-slate-500">
                Loading Chart...
            </div>
        );
    }

    const { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } = Recharts;

    return (
        <div className="h-64 lg:h-auto flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${((value / totalStudents) * 100).toFixed(0)}%`} />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
  };


  return (
    <section className="mb-8 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Daily Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:col-span-2 lg:col-span-3 gap-6">
          <SummaryCard
            title="Present"
            count={summary[AttendanceStatus.PRESENT]}
            colorClass="bg-present"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
          />
          <SummaryCard
            title="Absent"
            count={summary[AttendanceStatus.ABSENT]}
            colorClass="bg-absent"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
          />
          <SummaryCard
            title="Tardy"
            count={summary[AttendanceStatus.TARDY]}
            colorClass="bg-tardy"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>
        <ChartComponent />
      </div>
    </section>
  );
};

export default AttendanceSummary;