import React from 'react';
import { Classroom, User } from '../../types';
import { CLASSROOMS, STUDENTS_BY_CLASS } from '../../constants';

interface TeacherDashboardProps {
  user: User;
  onSelectClass: (classroom: Classroom) => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onSelectClass }) => {
  const myClasses = CLASSROOMS.filter(c => c.teacherId === user.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">My Dashboard</h1>
      <p className="text-slate-500 mb-8">Select a class to manage attendance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClasses.length > 0 ? (
            myClasses.map(c => {
                const studentCount = STUDENTS_BY_CLASS[c.id]?.length || 0;
                return (
                    <button 
                        key={c.id} 
                        onClick={() => onSelectClass(c)}
                        className="p-6 bg-white rounded-2xl shadow-md text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{c.name}</h2>
                        <p className="text-slate-500 mt-2">{studentCount} students</p>
                        <div className="mt-4 text-indigo-600 font-semibold flex items-center space-x-2">
                            <span>Manage Attendance</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </button>
                )
            })
        ) : (
            <p>You have no classes assigned.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
