import { useState, useCallback } from 'react';
import { Grade } from '../types';
import { GRADES } from '../constants';

export const useGrades = (studentId: number) => {
  // In a real app, this would be an API call.
  // For this demo, we filter the global mock data.
  const [grades, setGrades] = useState<Grade[]>(() => {
    return GRADES.filter(g => g.studentId === studentId);
  });

  const addGrade = useCallback((newGradeData: { subject: string; score: number, classId: number }) => {
    setGrades(prevGrades => {
      const newGrade: Grade = {
        id: Date.now(), // simple unique ID for demo purposes
        studentId,
        ...newGradeData,
      };
      // In a real app, you would also post this to your backend.
      return [...prevGrades, newGrade];
    });
  }, [studentId]);

  return { grades, addGrade };
};
