
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Mail, Google } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  type: "login" | "signup";
  userType: "student" | "librarian";
}

export function AuthForm({ type, userType }: AuthFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      
      if (type === "login") {
        toast({
          title: "Login successful",
          description: `Welcome back to EduPulse Library!`,
        });
        
        // Redirect based on user type
        navigate(userType === "student" ? "/student-dashboard" : "/librarian-dashboard");
      } else {
        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
        });
        
        // Redirect to login page after signup
        navigate("/login");
      }
    }, 1500);
  };
  
  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    // Simulate Google auth
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Google authentication",
        description: "Successfully authenticated with Google.",
      });
      
      // Redirect based on user type
      navigate(userType === "student" ? "/student-dashboard" : "/librarian-dashboard");
    }, 1500);
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password reset email sent",
      description: `We've sent a password reset link to ${email}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{type === "login" ? "Login" : "Create an Account"}</CardTitle>
        <CardDescription>
          {type === "login"
            ? `Sign in to your ${userType} account`
            : `Register a new ${userType} account`}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === "signup" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              {userType === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    placeholder="Enter your roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    required
                  />
                </div>
              )}
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === "login" && (
                <Button 
                  type="button" 
                  variant="link" 
                  className="px-0 font-normal text-xs"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Button>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-10 w-10 px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="w-full gradient-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {type === "login" ? "Logging in..." : "Creating account..."}
              </>
            ) : (
              type === "login" ? "Log in" : "Create account"
            )}
          </Button>
          
          <div className="relative my-4 w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleAuth}
            disabled={isLoading}
          >
            <Google className="mr-2 h-4 w-4" />
            Google
          </Button>
          
          <div className="mt-4 text-center text-sm">
            {type === "login" ? (
              <>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
