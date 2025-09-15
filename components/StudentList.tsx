

import React from 'react';
import { Student, AttendanceStatus } from '../types';
import StudentCard from './StudentCard';

interface StudentListProps {
  students: Student[];
  onUpdateStatus: (studentId: number, status: AttendanceStatus) => void;
  onSelectStudent: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onUpdateStatus, onSelectStudent }) => {
  return (
    <section className="p-6 bg-white rounded-2xl shadow-md">
       <h2 className="text-xl font-bold mb-6 text-slate-700">Student Roster</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {students.map(student => (
          <StudentCard 
            key={student.id} 
            student={student} 
            onUpdateStatus={onUpdateStatus} 
            onSelectStudent={onSelectStudent}
          />
        ))}
      </div>
    </section>
  );
};

export default StudentList;
