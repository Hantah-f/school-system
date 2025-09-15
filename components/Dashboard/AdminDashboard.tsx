import React from 'react';
import { Classroom, Student, AttendanceStatus } from '../../types';
import { CLASSROOMS, ALL_STUDENTS, USERS } from '../../constants';
import AttendanceSummary from '../AttendanceSummary';

interface AdminDashboardProps {
  onSelectClass: (classroom: Classroom) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSelectClass }) => {
    
  const getTeacherName = (teacherId: number) => {
    return USERS.find(u => u.id === teacherId)?.name || 'Unknown Teacher';
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Administrator Dashboard</h1>
        <p className="text-slate-500">School-wide attendance overview.</p>
      </div>
      
      {/* School-wide summary */}
      <AttendanceSummary students={ALL_STUDENTS} />

      {/* Class List */}
      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-6 text-slate-700">All Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLASSROOMS.map(c => (
                <div key={c.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-slate-800">{c.name}</p>
                        <p className="text-sm text-slate-500">{getTeacherName(c.teacherId)}</p>
                    </div>
                    <button 
                        onClick={() => onSelectClass(c)}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold hover:bg-indigo-200 transition-colors"
                    >
                        View
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
