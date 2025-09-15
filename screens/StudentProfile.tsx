import React, { useState } from 'react';
import { Student, UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useGrades } from '../hooks/useGrades';
import GradeList from '../components/Grades/GradeList';
import AddGradeModal from '../components/Grades/AddGradeModal';

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onBack }) => {
    const { user } = useAuth();
    const { grades, addGrade } = useGrades(student.id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const canAddGrades = user?.role === UserRole.TEACHER;

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src={student.photoUrl} alt={student.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">{student.name}</h1>
                        <p className="text-slate-500">Student Profile</p>
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200 flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    <span>Back to Roster</span>
                </button>
            </div>

            {/* Grades Section */}
            <div className="p-6 bg-white rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-700">Academic Grades</h2>
                    {canAddGrades && (
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span>Add Grade</span>
                        </button>
                    )}
                </div>
                <GradeList grades={grades} />
            </div>

            {/* Add Grade Modal */}
            {canAddGrades && (
                 <AddGradeModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddGrade={(data) => addGrade({ ...data, classId: student.classId })}
                 />
            )}
        </div>
    );
};

export default StudentProfile;
