
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ROLE_CONFIG } from "@/lib/auth";

const LoginForm: React.FC = () => {
  const { login, isLoading, selectedRole } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  // Get role-specific color
  const roleColor = selectedRole ? ROLE_CONFIG[selectedRole].color : "primary";
  const roleName = selectedRole ? ROLE_CONFIG[selectedRole].label : "User";

  return (
    <Card className="w-full max-w-md animate-scale-in">
      <CardHeader>
        <CardTitle className={`text-${roleColor}`}>{roleName} Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your {roleName.toLowerCase()} account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a 
                href="#" 
                className="text-xs text-primary hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
          </div>
          
          {/* Demo credentials hint */}
          {selectedRole && (
            <div className="text-xs text-gray-500 mt-1">
              <p>Demo credentials:</p>
              <p>Email: {selectedRole}@example.com</p>
              <p>Password: password</p>
            </div>
          )}
          
          <Button
            type="submit"
            className={`w-full bg-${roleColor} hover:bg-${roleColor}-dark`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate("/signup")}
        >
          Create an account
        </Button>
        
        <Button 
          variant="ghost" 
          className="w-full text-sm"
          onClick={() => navigate("/")}
        >
          ← Back to role selection
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
