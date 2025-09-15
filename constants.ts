import { Student, AttendanceStatus, User, UserRole, Classroom, Grade } from './types';

// --- USERS ---
export const USERS: User[] = [
  { id: 1, name: "Ms. Davison", role: UserRole.TEACHER, username: 'teacher' },
  { id: 2, name: "Principal Smith", role: UserRole.ADMIN, username: 'admin' },
];


// --- CLASSROOMS ---
export const CLASSROOMS: Classroom[] = [
    { id: 101, name: "3rd Grade", teacherId: 1 },
    { id: 102, name: "4th Grade Math", teacherId: 1 }, // Ms. Davison teaches two classes
    { id: 201, name: "5th Grade Science", teacherId: 3 }, // Another teacher's class
];

// --- STUDENTS BY CLASS ---
export const STUDENTS_BY_CLASS: { [key: number]: Student[] } = {
  101: [
    { id: 1, name: 'Olivia Chen', photoUrl: 'https://picsum.photos/seed/olivia/200', status: AttendanceStatus.PRESENT, classId: 101 },
    { id: 2, name: 'Benjamin Carter', photoUrl: 'https://picsum.photos/seed/benjamin/200', status: AttendanceStatus.PRESENT, classId: 101 },
    { id: 3, name: 'Sophia Rodriguez', photoUrl: 'https://picsum.photos/seed/sophia/200', status: AttendanceStatus.PRESENT, classId: 101 },
    { id: 4, name: 'Liam Goldberg', photoUrl: 'https://picsum.photos/seed/liam/200', status: AttendanceStatus.ABSENT, classId: 101 },
    { id: 5, name: 'Ava Nguyen', photoUrl: 'https://picsum.photos/seed/ava/200', status: AttendanceStatus.PRESENT, classId: 101 },
    { id: 6, name: 'Noah Patel', photoUrl: 'https://picsum.photos/seed/noah/200', status: AttendanceStatus.TARDY, classId: 101 },
    { id: 7, name: 'Isabella Kim', photoUrl: 'https://picsum.photos/seed/isabella/200', status: AttendanceStatus.PRESENT, classId: 101 },
    { id: 8, name: 'Mason Williams', photoUrl: 'https://picsum.photos/seed/mason/200', status: AttendanceStatus.PRESENT, classId: 101 },
    { id: 9, name: 'Harper Garcia', photoUrl: 'https://picsum.photos/seed/harper/200', status: AttendanceStatus.PRESENT, classId: 101 },
    { id: 10, name: 'Ethan Martinez', photoUrl: 'https://picsum.photos/seed/ethan/200', status: AttendanceStatus.PRESENT, classId: 101 },
    { id: 11, name: 'Mia Johnson', photoUrl: 'https://picsum.photos/seed/mia/200', status: AttendanceStatus.ABSENT, classId: 101 },
    { id: 12, name: 'Alexander Lee', photoUrl: 'https://picsum.photos/seed/alexander/200', status: AttendanceStatus.PRESENT, classId: 101 },
  ],
  102: [
    { id: 13, name: 'Lucas Scott', photoUrl: 'https://picsum.photos/seed/lucas/200', status: AttendanceStatus.PRESENT, classId: 102 },
    { id: 14, name: 'Chloe Hall', photoUrl: 'https://picsum.photos/seed/chloe/200', status: AttendanceStatus.PRESENT, classId: 102 },
    { id: 15, name: 'Henry Green', photoUrl: 'https://picsum.photos/seed/henry/200', status: AttendanceStatus.TARDY, classId: 102 },
    { id: 16, name: 'Zoe Adams', photoUrl: 'https://picsum.photos/seed/zoe/200', status: AttendanceStatus.PRESENT, classId: 102 },
  ],
  201: [
    { id: 17, name: 'Elijah Baker', photoUrl: 'https://picsum.photos/seed/elijah/200', status: AttendanceStatus.PRESENT, classId: 201 },
    { id: 18, name: 'Lily King', photoUrl: 'https://picsum.photos/seed/lily/200', status: AttendanceStatus.ABSENT, classId: 201 },
    { id: 19, name: 'James Wright', photoUrl: 'https://picsum.photos/seed/james/200', status: AttendanceStatus.PRESENT, classId: 201 },
  ]
};

export const ALL_STUDENTS: Student[] = Object.values(STUDENTS_BY_CLASS).flat();

// --- GRADES ---
export const GRADES: Grade[] = [
    // 3rd Grade
    { id: 1, studentId: 1, classId: 101, subject: 'Reading', score: 92 },
    { id: 2, studentId: 1, classId: 101, subject: 'Math', score: 88 },
    { id: 3, studentId: 2, classId: 101, subject: 'Reading', score: 95 },
    { id: 4, studentId: 2, classId: 101, subject: 'Math', score: 91 },
    { id: 5, studentId: 3, classId: 101, subject: 'Math', score: 78 },
    { id: 6, studentId: 6, classId: 101, subject: 'Reading', score: 82 },

    // 4th Grade Math
    { id: 7, studentId: 13, classId: 102, subject: 'Geometry', score: 94 },
    { id: 8, studentId: 14, classId: 102, subject: 'Algebra', score: 85 },
    { id: 9, studentId: 15, classId: 102, subject: 'Geometry', score: 76 },
];
