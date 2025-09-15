import React from 'react';
import StudentList from '../components/StudentList';
import AttendanceSummary from '../components/AttendanceSummary';
import { useAttendance } from '../hooks/useAttendance';
import { Classroom, Student } from '../types';
import { STUDENTS_BY_CLASS } from '../constants';

interface AttendanceTrackerProps {
    classroom: Classroom;
    onBack: () => void;
    onSelectStudent: (student: Student) => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ classroom, onBack, onSelectStudent }) => {
  const initialStudents = STUDENTS_BY_CLASS[classroom.id] || [];
  const { students, updateAttendanceStatus } = useAttendance(initialStudents);

  return (
    <div>
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-800">Attendance: {classroom.name}</h1>
            <button 
                onClick={onBack}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 flex items-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                <span>Back to Dashboard</span>
            </button>
        </div>
        <AttendanceSummary students={students} />
        <StudentList students={students} onUpdateStatus={updateAttendanceStatus} onSelectStudent={onSelectStudent} />
    </div>
  );
};

export default AttendanceTracker;
