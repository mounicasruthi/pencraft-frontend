"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthState {
  isLoggedIn: boolean;
  profileImage: string | null;
}

const AuthContext = createContext({
  isLoggedIn: false,
  profileImage: null as string | null,
  setAuth: (authData: AuthState) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    profileImage: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userProfileString = localStorage.getItem("userProfile");

    let userProfile: { profileImage?: string } | null = null;
    if (userProfileString) {
      try {
        userProfile = JSON.parse(userProfileString);
      } catch (err) {
        console.error("Error parsing userProfile from localStorage:", err);
        userProfile = null;
      }
    }

    setAuth({
      isLoggedIn: !!token,
      profileImage: userProfile?.profileImage || null,
    });
  }, []);

  const updateAuth = (authData: AuthState) => {
    setAuth(authData);
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth: updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
