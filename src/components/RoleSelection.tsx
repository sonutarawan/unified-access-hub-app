
import React from "react";
import { UserRole, ROLE_CONFIG } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingBag, Store, Shield } from "lucide-react";

const RoleSelection: React.FC = () => {
  const { selectRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    if (!role) return;
    
    selectRole(role);
    navigate("/login");
  };

  const roleIcons = {
    buyer: <ShoppingBag className="role-icon text-buyer" />,
    seller: <Store className="role-icon text-seller" />,
    admin: <Shield className="role-icon text-admin" />
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">
        Choose how you want to use our platform
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(ROLE_CONFIG) as Array<keyof typeof ROLE_CONFIG>).map((role) => (
          <div 
            key={role} 
            className={`role-card ${role} staggered-item`}
            onClick={() => handleRoleSelect(role)}
          >
            {roleIcons[role]}
            <h3 className="text-xl font-bold mb-2">{ROLE_CONFIG[role].label}</h3>
            <p className="text-sm text-gray-600 text-center">
              {ROLE_CONFIG[role].description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center animate-fade-in">
        <p className="text-gray-500 mb-4">
          Already have an account? Select your role to continue.
        </p>
        <Button 
          variant="outline" 
          onClick={() => navigate("/login")}
          className="border-primary text-primary hover:bg-primary/5"
        >
          Skip to Login
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;
