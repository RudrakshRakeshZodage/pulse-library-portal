
import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "student" | "librarian";
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const studentLinks = [
    { icon: LayoutDashboard, name: "Dashboard", path: "/student-dashboard" },
    { icon: BookOpen, name: "Books", path: "/student-dashboard/books" },
    { icon: Calendar, name: "Seat Reservation", path: "/student-dashboard/reservations" },
    { icon: CreditCard, name: "Payments", path: "/student-dashboard/payments" },
    { icon: Settings, name: "Settings", path: "/student-dashboard/settings" },
  ];

  const librarianLinks = [
    { icon: LayoutDashboard, name: "Dashboard", path: "/librarian-dashboard" },
    { icon: BookOpen, name: "Books Management", path: "/librarian-dashboard/books" },
    { icon: Users, name: "Students", path: "/librarian-dashboard/students" },
    { icon: Calendar, name: "Reservations", path: "/librarian-dashboard/reservations" },
    { icon: CreditCard, name: "Payments", path: "/librarian-dashboard/payments" },
    { icon: Settings, name: "Settings", path: "/librarian-dashboard/settings" },
  ];

  const links = userType === "student" ? studentLinks : librarianLinks;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="px-6 py-3">
            <Logo className="py-2" />
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton asChild active={location.pathname === link.path}>
                    <Link to={link.path} className="flex items-center gap-3 px-3 py-2">
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto">
            <div className="flex flex-col gap-2">
              <ThemeToggle />
              <Button 
                variant="destructive"
                onClick={handleLogout}
                className="w-full mt-2 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 border-b flex items-center px-6 gap-4">
            <SidebarTrigger />
            <h1 className="font-semibold flex-1">
              {links.find(link => location.pathname === link.path)?.name || "Dashboard"}
            </h1>
            <div className="flex items-center gap-2">
              {!isMobile && <ThemeToggle />}
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
