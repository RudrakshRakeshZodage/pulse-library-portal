
import { useState, useEffect } from "react";
import { Book, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Book types and mock data
type Department = "AI ML" | "CO" | "EJ" | "CIVIL" | "ME";
type Year = "FYAN" | "FYCE" | "TYCO" | "SYEJ";

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

export default function BookListingPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");

  useEffect(() => {
    // In a real app, this would be an API call
    const mockBooks: Book[] = [
      {
        id: 1,
        title: "Data Structures and Algorithms",
        author: "Thomas H. Cormen",
        description: "Introduction to algorithms and data structures for computer science students",
        department: "CO",
        year: "FYAN",
        available: true,
        coverUrl: "https://picsum.photos/seed/books1/300/400"
      },
      {
        id: 2,
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell, Peter Norvig",
        description: "Comprehensive introduction to the theory and practice of artificial intelligence",
        department: "AI ML",
        year: "TYCO",
        available: true,
        coverUrl: "https://picsum.photos/seed/books2/300/400"
      },
      {
        id: 3,
        title: "Digital Electronics",
        author: "Morris Mano",
        description: "Digital design principles and practices",
        department: "EJ",
        year: "SYEJ",
        available: false,
        coverUrl: "https://picsum.photos/seed/books3/300/400"
      },
      {
        id: 4,
        title: "Structural Engineering",
        author: "P.C. Varghese",
        description: "Fundamentals of structural engineering and analysis",
        department: "CIVIL",
        year: "FYCE",
        available: true,
        coverUrl: "https://picsum.photos/seed/books4/300/400"
      },
      {
        id: 5,
        title: "Thermodynamics",
        author: "Y.A. Cengel",
        description: "Engineering approach to thermodynamics",
        department: "ME",
        year: "FYAN",
        available: true,
        coverUrl: "https://picsum.photos/seed/books5/300/400"
      }
    ];

    // Generate more books for demonstration
    const generatedBooks: Book[] = [];
    const departments: Department[] = ["AI ML", "CO", "EJ", "CIVIL", "ME"];
    const years: Year[] = ["FYAN", "FYCE", "TYCO", "SYEJ"];
    const titles = [
      "Introduction to Programming", "Database Systems", "Web Development",
      "Machine Learning", "Computer Networks", "Operating Systems",
      "Software Engineering", "Computer Architecture", "Digital Signal Processing",
      "Control Systems", "Power Electronics", "Embedded Systems",
      "Fluid Mechanics", "Strength of Materials", "Engineering Graphics",
      "Material Science", "Manufacturing Processes", "Engineering Mathematics"
    ];
    const authors = [
      "John Smith", "Maria Garcia", "David Brown", "Amit Patel", "Sarah Johnson",
      "James Wilson", "Linda Martinez", "Robert Taylor", "Emily Anderson", "Michael Thomas"
    ];

    for (let i = 6; i <= 30; i++) {
      const randomDept = departments[Math.floor(Math.random() * departments.length)];
      const randomYear = years[Math.floor(Math.random() * years.length)];
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

      generatedBooks.push({
        id: i,
        title: randomTitle,
        author: randomAuthor,
        description: `Comprehensive guide on ${randomTitle.toLowerCase()} for ${randomDept} students`,
        department: randomDept,
        year: randomYear,
        available: Math.random() > 0.3, // 70% chance of being available
        coverUrl: `https://picsum.photos/seed/books${i}/300/400`
      });
    }

    setBooks([...mockBooks, ...generatedBooks]);
    setFilteredBooks([...mockBooks, ...generatedBooks]);
  }, []);

  useEffect(() => {
    let result = books;

    if (searchQuery) {
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (departmentFilter) {
      result = result.filter(book => book.department === departmentFilter);
    }

    if (yearFilter) {
      result = result.filter(book => book.year === yearFilter);
    }

    setFilteredBooks(result);
  }, [searchQuery, departmentFilter, yearFilter, books]);

  const handleIssueBook = (bookId: number) => {
    // In a real app, this would call an API
    toast({
      title: "Request Submitted",
      description: "Your book issue request has been sent to the librarian",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight hero-gradient mb-4">
            MSBTE Library Books
          </h1>
          <p className="text-muted-foreground">
            Browse our collection of books for all departments and years.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
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
                  <SelectItem value="">All Departments</SelectItem>
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
                  <SelectItem value="">All Years</SelectItem>
                  <SelectItem value="FYAN">First Year</SelectItem>
                  <SelectItem value="FYCE">Second Year</SelectItem>
                  <SelectItem value="TYCO">Third Year</SelectItem>
                  <SelectItem value="SYEJ">Final Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setDepartmentFilter("");
                setYearFilter("");
              }}>
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Book Display Tabs */}
        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredBooks.length} Books Found
            </h2>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </div>

          {/* Grid View */}
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="flex flex-col overflow-hidden h-full bg-card">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
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
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      variant={book.available ? "default" : "outline"} 
                      className={book.available ? "w-full gradient-button" : "w-full"}
                      disabled={!book.available}
                      onClick={() => handleIssueBook(book.id)}
                    >
                      {book.available ? "Issue Book" : "Currently Unavailable"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden bg-card">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-[120px] h-[180px] overflow-hidden">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="font-bold">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        <div className={`px-2 py-1 text-xs font-medium self-start rounded-full ${
                          book.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }`}>
                          {book.available ? 'Available' : 'Issued'}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 my-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {book.department}
                        </span>
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                          {book.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex-1 mb-3">{book.description}</p>
                      <Button 
                        variant={book.available ? "default" : "outline"} 
                        className={book.available ? "self-end gradient-button" : "self-end"}
                        size="sm"
                        disabled={!book.available}
                        onClick={() => handleIssueBook(book.id)}
                      >
                        {book.available ? "Issue Book" : "Currently Unavailable"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
