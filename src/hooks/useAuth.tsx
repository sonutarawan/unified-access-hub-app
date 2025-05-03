
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, UserRole, getStoredUser, loginUser, logoutUser, signupUser, ROLE_CONFIG } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  selectedRole: UserRole;
  isLoading: boolean;
  error: string | null;
  selectRole: (role: UserRole) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setSelectedRole(storedUser.role);
    }
    setIsLoading(false);
  }, []);

  const selectRole = (role: UserRole) => {
    setSelectedRole(role);
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const loggedInUser = await loginUser(email, password);
      
      // Verify the user has the selected role
      if (selectedRole && loggedInUser.role !== selectedRole) {
        throw new Error(`This account is not registered as a ${selectedRole}`);
      }
      
      setUser(loggedInUser);
      setSelectedRole(loggedInUser.role);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
      
      // Redirect to the appropriate dashboard
      if (loggedInUser.role) {
        navigate(ROLE_CONFIG[loggedInUser.role].path);
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Login failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await signupUser(name, email, password, selectedRole);
      setUser(newUser);
      
      toast({
        title: "Account created",
        description: `Welcome to our platform, ${newUser.name}!`,
      });
      
      // Redirect to the appropriate dashboard
      navigate(ROLE_CONFIG[selectedRole].path);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Registration failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setSelectedRole(null);
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    selectedRole,
    isLoading,
    error,
    selectRole,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
