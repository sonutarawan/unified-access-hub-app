
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SignupForm from "@/components/auth/SignupForm";
import { ROLE_CONFIG } from "@/lib/auth";

const Signup: React.FC = () => {
  const { selectedRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!selectedRole) {
      navigate("/");
    }
    
    if (isAuthenticated && selectedRole) {
      navigate(ROLE_CONFIG[selectedRole].path);
    }
  }, [selectedRole, isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <SignupForm />
    </div>
  );
};

export default Signup;
