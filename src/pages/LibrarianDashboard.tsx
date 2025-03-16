
import { 
  BookOpen, 
  Users, 
  CalendarDays, 
  CreditCard, 
  TrendingUp,
  Bookmark,
  Activity,
  Check,
  X
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function LibrarianDashboard() {
  const { toast } = useToast();

  const handleApprove = (id: number, studentName: string) => {
    toast({
      title: "Reservation Approved",
      description: `You've approved ${studentName}'s reservation`,
    });
  };

  const handleDecline = (id: number, studentName: string) => {
    toast({
      title: "Reservation Declined",
      description: `You've declined ${studentName}'s reservation`,
    });
  };

  const stats = [
    { 
      title: "Total Books", 
      value: "1,254", 
      icon: BookOpen,
      change: "+12 this month",
      positive: true
    },
    { 
      title: "Registered Students", 
      value: "3,427", 
      icon: Users,
      change: "+43 this month",
      positive: true
    },
    { 
      title: "Active Reservations", 
      value: "32", 
      icon: CalendarDays,
      change: "-3 since yesterday",
      positive: false
    },
    { 
      title: "Pending Payments", 
      value: "₹8,540", 
      icon: CreditCard,
      change: "+₹1,200 this week",
      positive: true
    },
  ];

  const pendingReservations = [
    { id: 1, studentName: "Raj Patel", seatNumber: "A15", date: "2025-03-18", time: "10:00 AM - 12:00 PM" },
    { id: 2, studentName: "Priya Sharma", seatNumber: "B22", date: "2025-03-18", time: "2:00 PM - 4:00 PM" },
    { id: 3, studentName: "Ankit Kumar", seatNumber: "C08", date: "2025-03-19", time: "9:00 AM - 11:00 AM" },
  ];

  const departments = [
    { id: "AIML", name: "AI ML", value: 28 },
    { id: "CO", name: "Computer", value: 42 },
    { id: "EJ", name: "Electronics", value: 18 },
    { id: "CIVIL", name: "Civil", value: 15 },
    { id: "ME", name: "Mechanical", value: 22 },
  ];

  const recentActivities = [
    { id: 1, action: "Book Added", details: "Introduction to Robotics", time: "2 hours ago", icon: Bookmark },
    { id: 2, action: "Seat Reserved", details: "Seat A15 by Raj Patel", time: "3 hours ago", icon: CalendarDays },
    { id: 3, action: "Payment Received", details: "₹150 from Priya Sharma", time: "5 hours ago", icon: CreditCard },
    { id: 4, action: "Book Returned", details: "Advanced Algorithms by Ankit Kumar", time: "6 hours ago", icon: BookOpen },
  ];

  const bookUsageData = [
    { month: "Jan", computer: 40, electronics: 24, civil: 18, mechanical: 15, aiml: 35 },
    { month: "Feb", computer: 45, electronics: 28, civil: 20, mechanical: 22, aiml: 38 },
    { month: "Mar", computer: 55, electronics: 32, civil: 22, mechanical: 25, aiml: 42 },
    { month: "Apr", computer: 65, electronics: 35, civil: 25, mechanical: 28, aiml: 48 },
    { month: "May", computer: 70, electronics: 38, civil: 28, mechanical: 30, aiml: 52 },
    { month: "Jun", computer: 80, electronics: 42, civil: 30, mechanical: 32, aiml: 58 },
  ];

  const paymentData = [
    { name: "Week 1", amount: 1500 },
    { name: "Week 2", amount: 2800 },
    { name: "Week 3", amount: 3200 },
    { name: "Week 4", amount: 4500 },
  ];

  const reservationData = [
    { name: "Monday", reservations: 18 },
    { name: "Tuesday", reservations: 25 },
    { name: "Wednesday", reservations: 32 },
    { name: "Thursday", reservations: 28 },
    { name: "Friday", reservations: 35 },
    { name: "Saturday", reservations: 42 },
    { name: "Sunday", reservations: 15 },
  ];

  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">
            Librarian Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage books, students, reservations, and payments from one central location.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.positive ? 'text-green-500' : 'text-red-500'} mt-1`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Book Usage by Department</CardTitle>
              <CardDescription>
                Monthly book checkout statistics by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    computer: { label: "Computer", color: "#2563eb" },
                    electronics: { label: "Electronics", color: "#7c3aed" },
                    civil: { label: "Civil", color: "#059669" },
                    mechanical: { label: "Mechanical", color: "#d97706" },
                    aiml: { label: "AI ML", color: "#dc2626" },
                  }}
                >
                  <AreaChart
                    data={bookUsageData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="computer"
                      stackId="1"
                      stroke="var(--color-computer)"
                      fill="var(--color-computer)"
                    />
                    <Area
                      type="monotone"
                      dataKey="electronics"
                      stackId="1"
                      stroke="var(--color-electronics)"
                      fill="var(--color-electronics)"
                    />
                    <Area
                      type="monotone"
                      dataKey="civil"
                      stackId="1"
                      stroke="var(--color-civil)"
                      fill="var(--color-civil)"
                    />
                    <Area
                      type="monotone"
                      dataKey="mechanical"
                      stackId="1"
                      stroke="var(--color-mechanical)"
                      fill="var(--color-mechanical)"
                    />
                    <Area
                      type="monotone"
                      dataKey="aiml"
                      stackId="1"
                      stroke="var(--color-aiml)"
                      fill="var(--color-aiml)"
                    />
                    <Legend />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Payments</CardTitle>
                <CardDescription>
                  Total payment amounts collected weekly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[140px]">
                  <ChartContainer
                    config={{
                      amount: { label: "Amount (₹)", color: "#16a34a" },
                    }}
                  >
                    <BarChart
                      data={paymentData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="amount"
                        fill="var(--color-amount)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Reservations</CardTitle>
                <CardDescription>
                  Number of seat reservations per day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[140px]">
                  <ChartContainer
                    config={{
                      reservations: { label: "Reservations", color: "#8b5cf6" },
                    }}
                  >
                    <LineChart
                      data={reservationData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="reservations"
                        stroke="var(--color-reservations)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Department Statistics</CardTitle>
              <CardDescription>
                Distribution of students across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((department) => (
                  <div key={department.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <div className={`w-3 h-3 rounded-full bg-gradient-edupulse`} />
                        <p className="text-sm font-medium">
                          {department.name}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {department.value}%
                      </p>
                    </div>
                    <Progress value={department.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest actions in the library system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <div key={activity.id} className="flex gap-3 items-start">
                      <div className="h-8 w-8 rounded-full bg-gradient-edupulse flex items-center justify-center">
                        <ActivityIcon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Seat Reservations</CardTitle>
            <CardDescription>
              Reservations that need your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                <div>Student</div>
                <div>Seat</div>
                <div>Date</div>
                <div>Time</div>
                <div className="text-right">Actions</div>
              </div>
              {pendingReservations.map((reservation) => (
                <div key={reservation.id} className="grid grid-cols-5 gap-4 p-4 items-center">
                  <div>{reservation.studentName}</div>
                  <div>{reservation.seatNumber}</div>
                  <div>{new Date(reservation.date).toLocaleDateString()}</div>
                  <div>{reservation.time}</div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      className="gradient-button flex items-center gap-1"
                      onClick={() => handleApprove(reservation.id, reservation.studentName)}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleDecline(reservation.id, reservation.studentName)}
                    >
                      <X className="h-3.5 w-3.5" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Button className="flex items-center justify-center gap-2 h-auto py-4">
                <BookOpen className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>Add New Book</span>
                  <span className="text-xs font-normal">Catalog a new book</span>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-4">
                <Users className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>Add Student</span>
                  <span className="text-xs font-normal">Register a new student</span>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-4">
                <TrendingUp className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>Run Reports</span>
                  <span className="text-xs font-normal">Generate custom reports</span>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 h-auto py-4">
                <Activity className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span>System Status</span>
                  <span className="text-xs font-normal">Check system health</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
