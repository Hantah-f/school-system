import { useState, useCallback } from 'react';
import { Student, AttendanceStatus } from '../types';

export const useAttendance = (initialStudents: Student[]) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const updateAttendanceStatus = useCallback((studentId: number, status: AttendanceStatus) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  }, []);

  return { students, updateAttendanceStatus };
};