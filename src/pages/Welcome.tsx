
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoleSelection from "@/components/RoleSelection";

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Welcome to Unified Access Hub
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Your all-in-one platform for buyers, sellers, and administrators
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-8 px-4 md:px-8">
            <RoleSelection />
          </CardContent>
        </Card>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Unified Access Hub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Welcome;
