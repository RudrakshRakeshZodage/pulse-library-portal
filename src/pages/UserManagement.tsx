
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserCheck, UserX, Filter, Download, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

// Generate mock student data
const departments = ["AI ML", "CO", "EJ", "CIVIL", "ME"];
const years = ["FYAN", "FYCE", "TYAN", "TYCE", "B.TECH"];

const generateMockUsers = (count: number) => {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    const rollNum = Math.floor(Math.random() * 100) + 1;
    
    users.push({
      id: i,
      name: `Student ${i}`,
      email: `student${i}@edupulse.com`,
      department: dept,
      year: year,
      rollNumber: `${dept}${rollNum}`,
      status: Math.random() > 0.15 ? "Active" : "Inactive",
      booksIssued: Math.floor(Math.random() * 5),
      finesPending: Math.random() > 0.7 ? Math.floor(Math.random() * 200) : 0
    });
  }
  return users;
};

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [users, setUsers] = useState(generateMockUsers(300));
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  
  // Apply filters to user list
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = filterDept ? user.department === filterDept : true;
    const matchesYear = filterYear ? user.year === filterYear : true;
    
    return matchesSearch && matchesDept && matchesYear;
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleStatusToggle = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } 
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === "Active" ? "Inactive" : "Active";
    
    toast({
      title: `User ${newStatus}`,
      description: `${user?.name}'s account is now ${newStatus.toLowerCase()}`,
    });
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === displayedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(displayedUsers.map(user => user.id));
    }
  };

  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage student accounts and library access
            </p>
          </div>
          <Button className="gradient-button">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>
              Showing {filteredUsers.length} of {users.length} total students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, email, or roll number..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Department</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setFilterDept("")}>All</DropdownMenuItem>
                    {departments.map(dept => (
                      <DropdownMenuItem key={dept} onClick={() => setFilterDept(dept)}>
                        {dept}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Year</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setFilterYear("")}>All</DropdownMenuItem>
                    {years.map(year => (
                      <DropdownMenuItem key={year} onClick={() => setFilterYear(year)}>
                        {year}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {filterDept || filterYear ? (
              <div className="flex gap-2 mb-4">
                {filterDept && (
                  <div className="bg-muted text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    Department: {filterDept}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 ml-1" 
                      onClick={() => setFilterDept("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {filterYear && (
                  <div className="bg-muted text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    Year: {filterYear}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 ml-1" 
                      onClick={() => setFilterYear("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ) : null}

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={selectedUsers.length === displayedUsers.length && displayedUsers.length > 0}
                        onChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Books Issued</TableHead>
                    <TableHead>Fines Pending</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedUsers.length > 0 ? (
                    displayedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </TableCell>
                        <TableCell>{user.rollNumber}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.year}</TableCell>
                        <TableCell>{user.booksIssued}</TableCell>
                        <TableCell>
                          {user.finesPending > 0 ? (
                            <span className="text-red-500">₹{user.finesPending}</span>
                          ) : (
                            "₹0"
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStatusToggle(user.id)}
                              title={user.status === "Active" ? "Deactivate" : "Activate"}
                            >
                              {user.status === "Active" ? (
                                <UserX className="h-4 w-4 text-red-500" />
                              ) : (
                                <UserCheck className="h-4 w-4 text-green-500" />
                              )}
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Filter className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Delete Account
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        No users found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: pageCount }, (_, i) => i + 1)
                    .filter(pageNum => 
                      pageNum === 1 || 
                      pageNum === pageCount || 
                      Math.abs(pageNum - currentPage) <= 1
                    )
                    .map((pageNum, index, array) => {
                      if (index > 0 && array[index - 1] !== pageNum - 1) {
                        return (
                          <React.Fragment key={`ellipsis-${pageNum}`}>
                            <span className="text-sm text-muted-foreground">...</span>
                            <Button
                              variant={pageNum === currentPage ? "default" : "outline"}
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setCurrentPage(pageNum)}
                            >
                              {pageNum}
                            </Button>
                          </React.Fragment>
                        );
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(p + 1, pageCount))}
                  disabled={currentPage === pageCount}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
