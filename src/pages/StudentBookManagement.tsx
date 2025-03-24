import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Book, Search, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast as sonnerToast } from 'sonner';

// Book types
type Department = "AI ML" | "CO" | "EJ" | "CIVIL" | "ME";
type Year = "FY" | "SY" | "TY";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  department: Department;
  year: Year;
  available: boolean;
  coverUrl: string;
}

interface BookRequest {
  id: number;
  bookId: number;
  bookTitle: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

export default function StudentBookManagement() {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [myRequests, setMyRequests] = useState<BookRequest[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    // Fetch books data (using the comprehensive book list from BookListingPage)
    const polytechnicBooks: Book[] = [
      // Computer Engineering (CO) Books
      {
        id: 1,
        title: "Programming in C",
        author: "E. Balagurusamy",
        description: "A comprehensive guide to C programming for polytechnic students",
        department: "CO",
        year: "FY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 2,
        title: "Database Management Systems",
        author: "Dr. S.S. Sane",
        description: "An introduction to database concepts and SQL for computer engineering students",
        department: "CO",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 3,
        title: "Web Development Technologies",
        author: "V.K. Jain",
        description: "HTML, CSS, JavaScript and modern frameworks for web development",
        department: "CO",
        year: "TY",
        available: false,
        coverUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 4,
        title: "Data Structures Using C++",
        author: "D.S. Malik",
        description: "Implementation of advanced data structures in C++ with applications",
        department: "CO",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      
      // Electronics Engineering (EJ) Books
      {
        id: 5,
        title: "Digital Electronics",
        author: "Morris Mano",
        description: "Principles and applications of digital circuits and systems",
        department: "EJ",
        year: "FY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1563770557287-ea346329d7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 6,
        title: "Microprocessors and Microcontrollers",
        author: "Ramesh Gaonkar",
        description: "Architecture and programming of microprocessors with practical applications",
        department: "EJ",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 7,
        title: "Communication Systems",
        author: "Simon Haykin",
        description: "Principles of analog and digital communication with modern techniques",
        department: "EJ",
        year: "TY",
        available: false,
        coverUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      // Add more books from BookListingPage
    ];
    
    setBooks(polytechnicBooks);
    setFilteredBooks(polytechnicBooks);

    // Mock my book requests
    const mockRequests: BookRequest[] = [
      {
        id: 1,
        bookId: 3,
        bookTitle: "Web Development Technologies",
        requestDate: "2023-05-15",
        status: "pending"
      },
      {
        id: 2,
        bookId: 2,
        bookTitle: "Database Management Systems",
        requestDate: "2023-05-10",
        status: "approved"
      }
    ];
    setMyRequests(mockRequests);
  }, []);

  useEffect(() => {
    // Filter books based on search query and filters
    let result = books;

    if (searchQuery) {
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (departmentFilter && departmentFilter !== "all") {
      result = result.filter(book => book.department === departmentFilter);
    }

    if (yearFilter && yearFilter !== "all") {
      result = result.filter(book => book.year === yearFilter);
    }

    setFilteredBooks(result);
  }, [searchQuery, departmentFilter, yearFilter, books]);

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsViewOpen(true);
  };

  const handleRequestBook = (bookId: number, bookTitle: string) => {
    // Prevent double-clicking
    if (isRequesting) return;
    setIsRequesting(true);
    
    // Check if book is already requested
    const alreadyRequested = myRequests.some(
      request => request.bookId === bookId && request.status === "pending"
    );

    if (alreadyRequested) {
      toast({
        title: "Already Requested",
        description: "You've already requested this book and it's pending approval.",
      });
      setIsRequesting(false);
      return;
    }

    // Check if book is available
    const book = books.find(b => b.id === bookId);
    if (!book || !book.available) {
      toast({
        title: "Book Unavailable",
        description: "This book is currently not available for request.",
        variant: "destructive"
      });
      setIsRequesting(false);
      return;
    }

    // Create a new request
    const newRequest: BookRequest = {
      id: Date.now(), // Use timestamp to ensure unique ID
      bookId,
      bookTitle,
      requestDate: new Date().toISOString().split('T')[0],
      status: "pending"
    };

    setMyRequests(prevRequests => [...prevRequests, newRequest]);

    // Mark the book as unavailable immediately for better UX
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId ? { ...book, available: false } : book
      )
    );

    // Update filtered books as well
    setFilteredBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId ? { ...book, available: false } : book
      )
    );

    toast({
      title: "Book Requested",
      description: "Your request has been submitted to the librarian for approval.",
    });

    sonnerToast.success('Book Requested Successfully', {
      description: 'Your request has been submitted to the librarian for approval.'
    });
    
    setIsRequesting(false);
  };

  const handleCancelRequest = (requestId: number) => {
    // Find the request to get the bookId
    const requestToCancel = myRequests.find(request => request.id === requestId);
    
    if (requestToCancel) {
      // Mark the book as available again
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book.id === requestToCancel.bookId ? { ...book, available: true } : book
        )
      );
      
      // Update filtered books as well
      setFilteredBooks(prevBooks => 
        prevBooks.map(book => 
          book.id === requestToCancel.bookId ? { ...book, available: true } : book
        )
      );
    }
    
    // Remove the request
    setMyRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));

    toast({
      title: "Request Cancelled",
      description: "Your book request has been cancelled.",
    });

    sonnerToast.success('Request Cancelled', {
      description: 'Your book request has been cancelled successfully.'
    });
  };

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">
            Library Books
          </h2>
          <p className="text-muted-foreground">
            Browse and request books from the library collection.
          </p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Books</TabsTrigger>
            <TabsTrigger value="myrequests">My Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-4">
            {/* Search and Filter Section */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or author..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="AI ML">AI ML</SelectItem>
                      <SelectItem value="CO">CO</SelectItem>
                      <SelectItem value="EJ">EJ</SelectItem>
                      <SelectItem value="CIVIL">CIVIL</SelectItem>
                      <SelectItem value="ME">ME</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="FY">First Year</SelectItem>
                      <SelectItem value="SY">Second Year</SelectItem>
                      <SelectItem value="TY">Third Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setDepartmentFilter("all");
                    setYearFilter("all");
                  }}>
                    <Filter className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No books found matching your search criteria.
                </div>
              ) : (
                filteredBooks.map((book) => (
                  <Card key={book.id} className="flex flex-col overflow-hidden h-full bg-card">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                      <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${
                        book.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      }`}>
                        {book.available ? 'Available' : 'Issued'}
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 text-sm text-muted-foreground flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {book.department}
                        </span>
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                          {book.year}
                        </span>
                      </div>
                      <p className="line-clamp-2">{book.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewDetails(book)}
                      >
                        Details
                      </Button>
                      <Button 
                        className="flex-1 gradient-button"
                        disabled={!book.available || myRequests.some(
                          r => r.bookId === book.id && r.status === "pending"
                        )}
                        onClick={() => handleRequestBook(book.id, book.title)}
                      >
                        {myRequests.some(r => r.bookId === book.id && r.status === "pending")
                          ? "Requested"
                          : book.available ? "Issue" : "Unavailable"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          {/* My Requests Tab */}
          <TabsContent value="myrequests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Book Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {myRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    You haven't requested any books yet.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {myRequests.map((request) => (
                      <Card key={request.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <h3 className="font-medium">{request.bookTitle}</h3>
                              <p className="text-sm text-muted-foreground">
                                Requested on: {new Date(request.requestDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                              <Badge 
                                className={
                                  request.status === "pending" 
                                    ? "bg-yellow-500"
                                    : request.status === "approved"
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                }
                              >
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                              {request.status === "pending" && (
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelRequest(request.id)}
                                >
                                  Cancel Request
                                </Button>
                              )}
                              {request.status === "approved" && (
                                <div className="text-sm text-muted-foreground">
                                  Return due in 14 days
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Book Details Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedBook && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedBook.title}</DialogTitle>
                  <DialogDescription>
                    By {selectedBook.author}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col md:flex-row gap-6 py-4">
                  <div className="w-full md:w-1/3 aspect-[3/4] rounded-md overflow-hidden">
                    <img 
                      src={selectedBook.coverUrl} 
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex gap-2 mb-4">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {selectedBook.department}
                      </Badge>
                      <Badge variant="secondary">
                        {selectedBook.year}
                      </Badge>
                      <Badge className={selectedBook.available ? "bg-green-500" : "bg-red-500"}>
                        {selectedBook.available ? "Available" : "Issued"}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedBook.description}
                    </p>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Details</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Department:</div>
                        <div>{selectedBook.department}</div>
                        
                        <div className="text-muted-foreground">Year:</div>
                        <div>{selectedBook.year}</div>
                        
                        <div className="text-muted-foreground">Status:</div>
                        <div className={selectedBook.available ? "text-green-500" : "text-red-500"}>
                          {selectedBook.available ? "Available for issue" : "Currently issued"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsViewOpen(false)}
                  >
                    Close
                  </Button>
                  <Button 
                    className="gradient-button"
                    disabled={!selectedBook.available || myRequests.some(
                      r => r.bookId === selectedBook.id && r.status === "pending"
                    )}
                    onClick={() => {
                      handleRequestBook(selectedBook.id, selectedBook.title);
                      setIsViewOpen(false);
                    }}
                  >
                    {myRequests.some(r => r.bookId === selectedBook.id && r.status === "pending")
                      ? "Already Requested"
                      : selectedBook.available ? "Request Book" : "Unavailable"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
