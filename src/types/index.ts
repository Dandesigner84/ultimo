export type UserRole = 'student' | 'maestro' | 'director' | 'pastor';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  birthDate: string;
  photo?: string;
  church?: string;
  approved: boolean;
  createdAt: string;
}

export interface Student extends User {
  role: 'student';
  instrument: string;
  congregation: string;
  startDate?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  teacherId?: string;
  classId?: string;
}

export interface Maestro extends User {
  role: 'maestro';
  church: string;
  pastorName: string;
  sundayServiceTime: 'morning' | 'evening';
}

export interface Director extends User {
  role: 'director';
}

export interface Pastor extends User {
  role: 'pastor';
}

export interface Class {
  id: string;
  name: string;
  description: string;
  instrument: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  teacherId: string;
  schedule: string;
  maxStudents: number;
  currentStudents: number;
  isOnline: boolean;
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'book' | 'sheet' | 'composer' | 'method';
  description: string;
  imageUrl?: string;
  fileUrl?: string;
  tags: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: 'ebook' | 'method' | 'merchandise' | 'other';
  inStock: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  startDate: string;
  endDate: string;
}

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  scheduledFor: string;
  duration: number;
  instrument: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  meetingUrl?: string;
}

export interface Attendance {
  id: string;
  classId: string;
  studentId: string;
  date: string;
  present: boolean;
  note?: string;
}