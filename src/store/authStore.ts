import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>, password: string, role: UserRole) => Promise<void>;
}

// Mock data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Daniel de Oliveira',
    role: 'director' as UserRole,
    email: 'Dansax2016@gmail.com',
    phone: '11973768373',
    birthDate: '1980-01-01',
    approved: true,
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    name: 'Jonathas Teles',
    role: 'maestro' as UserRole,
    email: 'jonathas@example.com',
    phone: '11957210280',
    birthDate: '1985-01-01',
    church: 'ADVS Central',
    pastorName: 'Pastor João',
    sundayServiceTime: 'morning' as 'morning' | 'evening',
    approved: true,
    createdAt: '2023-01-01',
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the user in our mock data
      const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user && password === '0000') { // Mock password validation
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ error: 'Invalid credentials', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Authentication failed', isLoading: false });
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  register: async (userData, password, role) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, this would send data to a backend
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name || '',
        role,
        email: userData.email || '',
        phone: userData.phone || '',
        birthDate: userData.birthDate || '',
        approved: role === 'student' ? false : true, // Students need approval
        createdAt: new Date().toISOString(),
        ...userData
      };
      
      // For demo purposes, we'll just log the registered user
      console.log('Registered user:', newUser);
      
      // In a real app, you'd likely not auto-login after registration
      // especially for roles that need approval
      if (role !== 'student') {
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
    }
  }
}));