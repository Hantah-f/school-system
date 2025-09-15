import React from 'react';
import { Grade } from '../../types';

interface GradeListProps {
  grades: Grade[];
}

const getLetterGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

const GradeList: React.FC<GradeListProps> = ({ grades }) => {
  if (grades.length === 0) {
    return <p className="text-center text-slate-500 py-8">No grades have been recorded for this student yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Subject
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Score
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Letter Grade
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{grade.subject}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{grade.score}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">{getLetterGrade(grade.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeList;
