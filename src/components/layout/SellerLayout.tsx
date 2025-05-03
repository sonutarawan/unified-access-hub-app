
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Store, Package, User } from "lucide-react";

const SellerLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/seller" },
    { icon: Store, label: "Products", path: "/dashboard/seller/products" },
    { icon: Package, label: "Orders", path: "/dashboard/seller/orders" },
    { icon: User, label: "Profile", path: "/dashboard/seller/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm py-4 px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Store className="h-6 w-6 text-seller" />
            <h1 className="text-xl font-bold">Seller Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium hidden md:block">{user.name}</span>
            <Button size="sm" variant="ghost" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-12">
          <Outlet />
        </div>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center py-2 px-4 ${
                  isActive ? "text-seller" : "text-gray-500"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      
      {/* Side Navigation for Desktop */}
      <div className="hidden md:block fixed top-20 left-8">
        <div className="bg-white shadow-md rounded-lg p-4 w-48">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-item mb-2 ${isActive ? "active text-seller bg-seller/10" : "text-gray-600 hover:bg-gray-100"}`
              }
            >
              <item.icon className="h-5 w-5 mr-2" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
