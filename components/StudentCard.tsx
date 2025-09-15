import React from 'react';
import { Student, AttendanceStatus } from '../types';

interface StudentCardProps {
  student: Student;
  onUpdateStatus: (studentId: number, status: AttendanceStatus) => void;
  onSelectStudent: (student: Student) => void;
}

interface ActionButtonProps {
    status: AttendanceStatus;
    currentStatus: AttendanceStatus;
    onClick: (e: React.MouseEvent) => void;
    label: string;
    // Fix: Replaced JSX.Element with React.ReactNode to resolve namespace issue.
    icon: React.ReactNode;
    colorClasses: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ status, currentStatus, onClick, label, icon, colorClasses }) => {
    const isActive = status === currentStatus;
    const activeClasses = 'text-white scale-105 shadow-lg';
    const inactiveClasses = 'bg-slate-100 text-slate-500 hover:bg-slate-200';
    return (
        <button
            onClick={onClick}
            title={label}
            className={`flex-1 p-2 rounded-lg flex justify-center items-center transition-all duration-200 ease-in-out transform hover:scale-105 ${isActive ? `${colorClasses} ${activeClasses}`: inactiveClasses}`}
        >
            {icon}
        </button>
    )
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onUpdateStatus, onSelectStudent }) => {
  const statusClasses = {
    [AttendanceStatus.PRESENT]: 'border-present',
    [AttendanceStatus.ABSENT]: 'border-absent',
    [AttendanceStatus.TARDY]: 'border-tardy',
  };

  const statusBgClasses = {
    [AttendanceStatus.PRESENT]: 'bg-present-light text-present',
    [AttendanceStatus.ABSENT]: 'bg-absent-light text-absent',
    [AttendanceStatus.TARDY]: 'bg-tardy-light text-tardy',
  };
  
  const handleActionClick = (e: React.MouseEvent, status: AttendanceStatus) => {
    e.stopPropagation(); // Prevent card click when changing status
    onUpdateStatus(student.id, status);
  }

  return (
    <div 
        className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 border-b-4 ${statusClasses[student.status]} hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
        onClick={() => onSelectStudent(student)}
    >
      <div className="relative">
        <img className="w-full h-40 object-cover" src={student.photoUrl} alt={student.name} />
        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${statusBgClasses[student.status]}`}>
            {student.status.toUpperCase()}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-slate-800 truncate">{student.name}</h3>
        <div className="mt-4 flex space-x-2">
            <ActionButton 
                status={AttendanceStatus.PRESENT}
                currentStatus={student.status}
                onClick={(e) => handleActionClick(e, AttendanceStatus.PRESENT)}
                label="Present"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                colorClasses="bg-present"
            />
            <ActionButton 
                status={AttendanceStatus.TARDY}
                currentStatus={student.status}
                onClick={(e) => handleActionClick(e, AttendanceStatus.TARDY)}
                label="Tardy"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                colorClasses="bg-tardy"
            />
            <ActionButton 
                status={AttendanceStatus.ABSENT}
                currentStatus={student.status}
                onClick={(e) => handleActionClick(e, AttendanceStatus.ABSENT)}
                label="Absent"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
                colorClasses="bg-absent"
            />
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
