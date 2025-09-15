export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  TARDY = 'Tardy',
}

export interface Student {
  id: number;
  name: string;
  photoUrl: string;
  status: AttendanceStatus;
  classId: number;
}

export enum UserRole {
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
  // In a real app, this would be a hashed password.
  // For this demo, we'll use a simple string.
  username: string; 
}

export interface Classroom {
  id: number;
  name: string;
  teacherId: number;
}

export interface Grade {
  id: number;
  studentId: number;
  classId: number;
  subject: string;
  score: number;
}
