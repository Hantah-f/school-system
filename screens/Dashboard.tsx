import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, Classroom, Student } from '../types';
import Header from '../components/Header';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import TeacherDashboard from '../components/Dashboard/TeacherDashboard';
import AttendanceTracker from './AttendanceTracker';
import StudentProfile from './StudentProfile';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedClass, setSelectedClass] = useState<Classroom | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  if (!user) {
    // This should not happen if App.tsx logic is correct, but it's a good safeguard.
    return null; 
  }

  const handleSelectClass = (classroom: Classroom) => {
    setSelectedClass(classroom);
  };

  const handleBackToDashboard = () => {
    setSelectedClass(null);
    setSelectedStudent(null);
  };
  
  const handleSelectStudent = (student: Student) => {
      setSelectedStudent(student);
  }
  
  const handleBackToTracker = () => {
      setSelectedStudent(null);
  }

  const renderContent = () => {
    if (selectedClass && selectedStudent) {
        return <StudentProfile student={selectedStudent} onBack={handleBackToTracker} />;
    }
    if (selectedClass) {
        return <AttendanceTracker classroom={selectedClass} onBack={handleBackToDashboard} onSelectStudent={handleSelectStudent} />;
    }
    // Main dashboard view
    return (
        <>
            {user.role === UserRole.ADMIN && <AdminDashboard onSelectClass={handleSelectClass} />}
            {user.role === UserRole.TEACHER && <TeacherDashboard user={user} onSelectClass={handleSelectClass} />}
        </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onLogout={logout} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Built with ❤️ for modern classrooms.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
