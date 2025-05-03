
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Users, ShoppingBag, BarChart, Settings, Shield } from "lucide-react";

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/admin" },
    { icon: Users, label: "Users", path: "/dashboard/admin/users" },
    { icon: ShoppingBag, label: "Products", path: "/dashboard/admin/products" },
    { icon: BarChart, label: "Reports", path: "/dashboard/admin/reports" },
    { icon: Settings, label: "Settings", path: "/dashboard/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm py-4 px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="p-1.5 rounded-md bg-admin/10">
              <Shield className="h-5 w-5 text-admin" />
            </div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
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
      
      {/* Side Navigation */}
      <div className="flex">
        <aside className="hidden md:block w-64 bg-white shadow-md h-[calc(100vh-4rem)] sticky top-16">
          <div className="py-6 px-5">
            <p className="text-xs text-gray-500 font-medium mb-4 uppercase tracking-wider">
              Admin Controls
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-item ${isActive ? "active text-admin bg-admin/10" : "text-gray-600 hover:bg-gray-100"}`
                  }
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center py-2 px-3 ${
                  isActive ? "text-admin" : "text-gray-500"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
