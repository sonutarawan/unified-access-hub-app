
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Buyer from "./pages/dashboard/Buyer";
import Seller from "./pages/dashboard/Seller";
import Admin from "./pages/dashboard/Admin";
import Products from "./pages/dashboard/seller/Products";

// Layout Components
import BuyerLayout from "./components/layout/BuyerLayout";
import SellerLayout from "./components/layout/SellerLayout";
import AdminLayout from "./components/layout/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Role-specific authenticated routes */}
            <Route path="/dashboard/buyer" element={<BuyerLayout />}>
              <Route index element={<Buyer />} />
              <Route path="categories" element={<div className="p-4">Categories Page</div>} />
              <Route path="orders" element={<div className="p-4">Orders Page</div>} />
              <Route path="profile" element={<div className="p-4">Profile Page</div>} />
            </Route>
            
            <Route path="/dashboard/seller" element={<SellerLayout />}>
              <Route index element={<Seller />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<div className="p-4">Orders Management</div>} />
              <Route path="profile" element={<div className="p-4">Profile Settings</div>} />
            </Route>
            
            <Route path="/dashboard/admin" element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path="users" element={<div className="p-4">User Management</div>} />
              <Route path="products" element={<div className="p-4">Product Review</div>} />
              <Route path="reports" element={<div className="p-4">Analytics & Reports</div>} />
              <Route path="settings" element={<div className="p-4">Platform Settings</div>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
