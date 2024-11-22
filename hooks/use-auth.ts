"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: null | {
    id: string;
    name: string;
    email: string;
  };
  token: string | null;
  setAuth: (user: AuthState['user'], token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);