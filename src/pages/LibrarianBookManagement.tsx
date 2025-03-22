
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Book, Edit, Trash2, Search, Plus, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types for books
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
  studentName: string;
  studentId: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

export default function LibrarianBookManagement() {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [bookRequests, setBookRequests] = useState<BookRequest[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  
  // Form states for new/edit book
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookDepartment, setBookDepartment] = useState<Department>("CO");
  const [bookYear, setBookYear] = useState<Year>("FY");
  const [bookCoverUrl, setBookCoverUrl] = useState("");

  useEffect(() => {
    // Fetch books data (mock for now)
    const mockBooks: Book[] = [
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
        available: false,
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
      // ... more books would be loaded from backend in real implementation
    ];
    setBooks(mockBooks);
    setFilteredBooks(mockBooks);

    // Mock book requests
    const mockRequests: BookRequest[] = [
      {
        id: 1,
        bookId: 2,
        bookTitle: "Database Management Systems",
        studentName: "Raj Patel",
        studentId: "ST12345",
        requestDate: "2023-05-15",
        status: "pending"
      },
      {
        id: 2,
        bookId: 3,
        bookTitle: "Web Development Technologies",
        studentName: "Priya Sharma",
        studentId: "ST12346",
        requestDate: "2023-05-16",
        status: "pending"
      }
    ];
    setBookRequests(mockRequests);
  }, []);

  useEffect(() => {
    // Filter books based on search query
    if (searchQuery.trim() === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        book => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  const handleAddBook = () => {
    // In a real application, this would send data to a backend/API
    const newBook: Book = {
      id: books.length + 1,
      title: bookTitle,
      author: bookAuthor,
      description: bookDescription,
      department: bookDepartment,
      year: bookYear,
      available: true,
      coverUrl: bookCoverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    };
    
    setBooks([...books, newBook]);
    setFilteredBooks([...books, newBook]);
    
    toast({
      title: "Book Added",
      description: `"${bookTitle}" has been added to the library.`,
    });
    
    // Reset form
    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setBookDepartment("CO");
    setBookYear("FY");
    setBookCoverUrl("");
    setIsAddBookOpen(false);
  };

  const handleEditBook = () => {
    if (!currentBook) return;
    
    // Update the book in the books array
    const updatedBooks = books.map(book => 
      book.id === currentBook.id 
        ? {
            ...book,
            title: bookTitle,
            author: bookAuthor,
            description: bookDescription,
            department: bookDepartment,
            year: bookYear,
            coverUrl: bookCoverUrl || book.coverUrl
          }
        : book
    );
    
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    
    toast({
      title: "Book Updated",
      description: `"${bookTitle}" has been updated.`,
    });
    
    // Reset form and close dialog
    setCurrentBook(null);
    setIsEditBookOpen(false);
  };

  const handleDeleteBook = (id: number) => {
    // Filter out the book to be deleted
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
    
    toast({
      title: "Book Deleted",
      description: "The book has been removed from the library.",
    });
  };

  const handleEditClick = (book: Book) => {
    setCurrentBook(book);
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setBookDescription(book.description);
    setBookDepartment(book.department);
    setBookYear(book.year);
    setBookCoverUrl(book.coverUrl);
    setIsEditBookOpen(true);
  };

  const handleBookRequestAction = (requestId: number, action: "approve" | "reject") => {
    // Update the request status
    const updatedRequests = bookRequests.map(request => 
      request.id === requestId 
        ? { ...request, status: action === "approve" ? "approved" : "rejected" }
        : request
    );
    
    // If approved, update the book availability
    if (action === "approve") {
      const request = bookRequests.find(r => r.id === requestId);
      if (request) {
        const updatedBooks = books.map(book => 
          book.id === request.bookId 
            ? { ...book, available: false }
            : book
        );
        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
      }
    }
    
    setBookRequests(updatedRequests);
    
    toast({
      title: action === "approve" ? "Request Approved" : "Request Rejected",
      description: action === "approve" 
        ? "The book has been issued to the student." 
        : "The book request has been rejected.",
    });
  };

  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">
            Book Management
          </h2>
          <p className="text-muted-foreground">
            Add, edit, delete books and manage student book requests.
          </p>
        </div>

        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="books">Books Collection</TabsTrigger>
            <TabsTrigger value="requests">Book Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="space-y-4">
            {/* Search and Add Book Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search books by title, author or department..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-button whitespace-nowrap">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Book
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Book</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new book to add to the library.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="title" className="text-right text-sm font-medium col-span-1">
                        Title
                      </label>
                      <Input
                        id="title"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="author" className="text-right text-sm font-medium col-span-1">
                        Author
                      </label>
                      <Input
                        id="author"
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="description" className="text-right text-sm font-medium col-span-1">
                        Description
                      </label>
                      <Textarea
                        id="description"
                        value={bookDescription}
                        onChange={(e) => setBookDescription(e.target.value)}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="department" className="text-right text-sm font-medium col-span-1">
                        Department
                      </label>
                      <Select 
                        value={bookDepartment} 
                        onValueChange={(value) => setBookDepartment(value as Department)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AI ML">AI ML</SelectItem>
                          <SelectItem value="CO">CO</SelectItem>
                          <SelectItem value="EJ">EJ</SelectItem>
                          <SelectItem value="CIVIL">CIVIL</SelectItem>
                          <SelectItem value="ME">ME</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="year" className="text-right text-sm font-medium col-span-1">
                        Year
                      </label>
                      <Select 
                        value={bookYear} 
                        onValueChange={(value) => setBookYear(value as Year)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FY">First Year</SelectItem>
                          <SelectItem value="SY">Second Year</SelectItem>
                          <SelectItem value="TY">Third Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="coverUrl" className="text-right text-sm font-medium col-span-1">
                        Cover URL
                      </label>
                      <Input
                        id="coverUrl"
                        value={bookCoverUrl}
                        onChange={(e) => setBookCoverUrl(e.target.value)}
                        className="col-span-3"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddBookOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="gradient-button" 
                      onClick={handleAddBook}
                      disabled={!bookTitle || !bookAuthor}
                    >
                      Add Book
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Books Table */}
            <Card>
              <CardHeader>
                <CardTitle>Books Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            No books found. Try a different search or add a new book.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBooks.map((book) => (
                          <TableRow key={book.id}>
                            <TableCell className="font-medium flex items-center gap-3">
                              <div className="w-10 h-14 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={book.coverUrl} 
                                  alt={book.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
                                  }}
                                />
                              </div>
                              {book.title}
                            </TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.department}</TableCell>
                            <TableCell>{book.year}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                book.available 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                              }`}>
                                {book.available ? 'Available' : 'Issued'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEditClick(book)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleDeleteBook(book.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Book Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            No pending book requests.
                          </TableCell>
                        </TableRow>
                      ) : (
                        bookRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">{request.bookTitle}</TableCell>
                            <TableCell>{request.studentName}</TableCell>
                            <TableCell>{request.studentId}</TableCell>
                            <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                request.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                  : request.status === 'approved'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                              }`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              {request.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center"
                                    onClick={() => handleBookRequestAction(request.id, "approve")}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center"
                                    onClick={() => handleBookRequestAction(request.id, "reject")}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {request.status !== 'pending' && (
                                <span className="text-sm text-muted-foreground">
                                  No actions available
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Book Dialog */}
        <Dialog open={isEditBookOpen} onOpenChange={setIsEditBookOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Book</DialogTitle>
              <DialogDescription>
                Update the book details and save changes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-title" className="text-right text-sm font-medium col-span-1">
                  Title
                </label>
                <Input
                  id="edit-title"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-author" className="text-right text-sm font-medium col-span-1">
                  Author
                </label>
                <Input
                  id="edit-author"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-description" className="text-right text-sm font-medium col-span-1">
                  Description
                </label>
                <Textarea
                  id="edit-description"
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-department" className="text-right text-sm font-medium col-span-1">
                  Department
                </label>
                <Select 
                  value={bookDepartment} 
                  onValueChange={(value) => setBookDepartment(value as Department)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI ML">AI ML</SelectItem>
                    <SelectItem value="CO">CO</SelectItem>
                    <SelectItem value="EJ">EJ</SelectItem>
                    <SelectItem value="CIVIL">CIVIL</SelectItem>
                    <SelectItem value="ME">ME</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-year" className="text-right text-sm font-medium col-span-1">
                  Year
                </label>
                <Select 
                  value={bookYear} 
                  onValueChange={(value) => setBookYear(value as Year)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FY">First Year</SelectItem>
                    <SelectItem value="SY">Second Year</SelectItem>
                    <SelectItem value="TY">Third Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-coverUrl" className="text-right text-sm font-medium col-span-1">
                  Cover URL
                </label>
                <Input
                  id="edit-coverUrl"
                  value={bookCoverUrl}
                  onChange={(e) => setBookCoverUrl(e.target.value)}
                  className="col-span-3"
                  placeholder="https://..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditBookOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="gradient-button" 
                onClick={handleEditBook}
                disabled={!bookTitle || !bookAuthor}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
