"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  email: string;
}

interface AuthContextType {
  user: DecodedUser | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedUser = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: DecodedUser = jwtDecode(token);
    setUser(decoded);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
