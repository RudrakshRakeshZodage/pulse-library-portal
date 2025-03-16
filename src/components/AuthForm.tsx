
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, KeyRound, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "@/components/Logo";

interface AuthFormProps {
  type: "login" | "signup";
  userType?: "student" | "librarian";
}

export function AuthForm({ type, userType = "student" }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userType: userType,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate authentication
    if (type === "login") {
      // Mock login logic - in a real app, you'd call an API
      if (formData.email && formData.password) {
        toast({
          title: "Logged in successfully",
          description: `Welcome back ${
            userType === "librarian" ? "librarian" : "to EduPulse"
          }!`,
        });
        
        // Redirect based on user type
        if (userType === "librarian") {
          navigate("/librarian-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      }
    } else {
      // Mock signup logic
      if (formData.email && formData.password) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        });
        navigate("/login");
      } else {
        toast({
          title: "Signup failed",
          description: "Please complete all fields and try again",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader className="space-y-3">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <CardTitle className="text-2xl text-center">
          {type === "login" ? "Library Login" : "Library Enrollment"}
        </CardTitle>
        <CardDescription className="text-center">
          {type === "login"
            ? "Enter your credentials to access the library system"
            : "Create an account to access the library services"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          {type === "login" && (
            <div className="text-right">
              <a
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>
          )}
          <Button type="submit" className="w-full gradient-button">
            {type === "login" ? "Log in" : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href={type === "login" ? "/signup" : "/login"}
            className="font-medium text-primary hover:underline"
          >
            {type === "login" ? "Sign up" : "Log in"}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
