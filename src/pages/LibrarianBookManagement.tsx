
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { Book, BookRequest, BookRequestStatus } from '@/types/library';
import { exportToExcel } from '@/utils/exportUtils';
import { BookManagementTabs } from '@/components/librarian/BookManagementTabs';
import { AddBookDialog } from '@/components/librarian/AddBookDialog';
import { EditBookDialog } from '@/components/librarian/EditBookDialog';
import { DeleteBookDialog } from '@/components/librarian/DeleteBookDialog';

export default function LibrarianBookManagement() {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookRequests, setBookRequests] = useState<BookRequest[]>([]);

  // New book form state
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    department: '',
    publicationYear: '',
    isbn: '',
    copies: 1,
    availableCopies: 1,
    coverImage: '',
    description: '',
  });

  // Mock data initialization
  useEffect(() => {
    // Sample book data
    const sampleBooks: Book[] = [
      {
        id: 1,
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        department: 'Computer',
        publicationYear: '2009',
        isbn: '978-0262033848',
        copies: 5,
        availableCopies: 3,
        coverImage: 'https://m.media-amazon.com/images/I/41T0iBxY8FL._SX440_BO1,204,203,200_.jpg',
        description: 'This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms.',
      },
      {
        id: 2,
        title: 'Artificial Intelligence: A Modern Approach',
        author: 'Stuart Russell, Peter Norvig',
        department: 'AIML',
        publicationYear: '2020',
        isbn: '978-0134610993',
        copies: 3,
        availableCopies: 1,
        coverImage: 'https://m.media-amazon.com/images/I/51xwccJOOCL._SX440_BO1,204,203,200_.jpg',
        description: 'The most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence.',
      },
      {
        id: 3,
        title: 'Digital Design and Computer Architecture',
        author: 'David Harris, Sarah Harris',
        department: 'Electronics',
        publicationYear: '2015',
        isbn: '978-0128000564',
        copies: 4,
        availableCopies: 4,
        coverImage: 'https://m.media-amazon.com/images/I/51RKh3TE8QL._SX440_BO1,204,203,200_.jpg',
        description: 'Digital Design and Computer Architecture takes a unique and modern approach to digital design.',
      },
      {
        id: 4,
        title: 'Mechanics of Materials',
        author: 'Ferdinand Beer, E. Russell Johnston Jr.',
        department: 'Mechanical',
        publicationYear: '2019',
        isbn: '978-1260113273',
        copies: 2,
        availableCopies: 0,
        coverImage: 'https://m.media-amazon.com/images/I/51KaUGP2-rL._SX430_BO1,204,203,200_.jpg',
        description: 'The uncontested leader for the teaching of solid mechanics.',
      },
      {
        id: 5,
        title: 'Fundamentals of Building Construction',
        author: 'Edward Allen, Joseph Iano',
        department: 'Civil',
        publicationYear: '2013',
        isbn: '978-1118138915',
        copies: 3,
        availableCopies: 2,
        coverImage: 'https://m.media-amazon.com/images/I/41l4pSwPNZL._SX430_BO1,204,203,200_.jpg',
        description: 'An illustrated guide to building construction fundamentals for students and professionals.',
      },
    ];

    // Sample book request data
    const sampleBookRequests: BookRequest[] = [
      {
        id: 1,
        bookId: 1,
        bookTitle: 'Introduction to Algorithms',
        studentName: 'Raj Patel',
        studentId: 'S12345',
        requestDate: '2025-03-18',
        status: 'pending',
      },
      {
        id: 2,
        bookId: 2,
        bookTitle: 'Artificial Intelligence: A Modern Approach',
        studentName: 'Priya Sharma',
        studentId: 'S23456',
        requestDate: '2025-03-17',
        status: 'pending',
      },
      {
        id: 3,
        bookId: 4,
        bookTitle: 'Mechanics of Materials',
        studentName: 'Ankit Kumar',
        studentId: 'S34567',
        requestDate: '2025-03-16',
        status: 'approved',
      },
    ];

    setBooks(sampleBooks);
    setFilteredBooks(sampleBooks);
    setBookRequests(sampleBookRequests);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery) {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  // Add new book
  const handleAddBook = () => {
    // Validate required fields
    if (!newBook.title || !newBook.author || !newBook.department || !newBook.publicationYear) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const bookId = books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
    const addedBook = {
      id: bookId,
      ...newBook,
    };

    setBooks([...books, addedBook]);
    setFilteredBooks([...filteredBooks, addedBook]);
    setIsAddDialogOpen(false);

    toast({
      title: 'Book Added',
      description: `${newBook.title} has been added to the library.`,
    });

    sonnerToast.success('Book Added Successfully', {
      description: `${newBook.title} has been added to the library collection.`
    });

    // Reset form
    setNewBook({
      title: '',
      author: '',
      department: '',
      publicationYear: '',
      isbn: '',
      copies: 1,
      availableCopies: 1,
      coverImage: '',
      description: '',
    });
  };

  // Edit book
  const handleEditBook = () => {
    if (!selectedBook) return;

    // Validate required fields
    if (!selectedBook.title || !selectedBook.author || !selectedBook.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id ? selectedBook : book
    );

    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      !searchQuery
    ));
    setIsEditDialogOpen(false);

    toast({
      title: 'Book Updated',
      description: `${selectedBook.title} has been updated.`,
    });

    sonnerToast.success('Book Updated Successfully', {
      description: `${selectedBook.title} has been updated in the library collection.`
    });
  };

  // Delete book
  const handleDeleteBook = () => {
    if (!selectedBook) return;

    const updatedBooks = books.filter((book) => book.id !== selectedBook.id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks.filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      !searchQuery
    ));
    setIsDeleteDialogOpen(false);

    // Check if any requests are associated with this book and update them
    const associatedRequests = bookRequests.filter(req => req.bookId === selectedBook.id);
    if (associatedRequests.length > 0) {
      const updatedRequests = bookRequests.map(req => 
        req.bookId === selectedBook.id ? {...req, status: 'rejected' as BookRequestStatus} : req
      );
      setBookRequests(updatedRequests);
    }

    toast({
      title: 'Book Deleted',
      description: `${selectedBook.title} has been removed from the library.`,
    });

    sonnerToast.success('Book Deleted Successfully', {
      description: `${selectedBook.title} has been removed from the library collection.`
    });
  };

  // Approve book request
  const handleApproveRequest = (requestId: number) => {
    const requestToApprove = bookRequests.find(req => req.id === requestId);
    if (!requestToApprove) return;

    // Check if the book has available copies
    const book = books.find(book => book.id === requestToApprove.bookId);
    if (book && book.availableCopies <= 0) {
      toast({
        title: "Cannot Approve Request",
        description: "There are no available copies of this book.",
        variant: "destructive"
      });
      return;
    }

    const updatedRequests = bookRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'approved' as BookRequestStatus } : request
    );

    // Find the book associated with this request
    const request = bookRequests.find((req) => req.id === requestId);
    if (request) {
      // Update available copies
      const updatedBooks = books.map((book) => {
        if (book.id === request.bookId && book.availableCopies > 0) {
          return { ...book, availableCopies: book.availableCopies - 1 };
        }
        return book;
      });
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        !searchQuery
      ));
    }

    setBookRequests(updatedRequests);

    toast({
      title: 'Request Approved',
      description: `Book request has been approved.`,
    });

    sonnerToast.success('Request Approved', {
      description: `The book request has been approved and the student has been notified.`
    });
  };

  // Reject book request
  const handleRejectRequest = (requestId: number) => {
    const updatedRequests = bookRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'rejected' as BookRequestStatus } : request
    );

    setBookRequests(updatedRequests);

    toast({
      title: 'Request Rejected',
      description: `Book request has been rejected.`,
    });

    sonnerToast.success('Request Rejected', {
      description: `The book request has been rejected and the student has been notified.`
    });
  };

  // Export books data
  const handleExportBooks = () => {
    const formattedData = books.map(book => ({
      'Title': book.title,
      'Author': book.author,
      'Department': book.department,
      'Publication Year': book.publicationYear,
      'ISBN': book.isbn,
      'Total Copies': book.copies,
      'Available Copies': book.availableCopies
    }));

    exportToExcel(formattedData, 'Library_Books');

    toast({
      title: 'Export Completed',
      description: 'Books data has been exported to Excel.',
    });
  };

  // Export requests data
  const handleExportRequests = () => {
    const formattedData = bookRequests.map(request => ({
      'Student Name': request.studentName,
      'Student ID': request.studentId,
      'Book Title': request.bookTitle,
      'Request Date': request.requestDate,
      'Status': request.status.charAt(0).toUpperCase() + request.status.slice(1)
    }));

    exportToExcel(formattedData, 'Book_Requests');

    toast({
      title: 'Export Completed',
      description: 'Book requests data has been exported to Excel.',
    });
  };

  const handleEditBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  const handleDeleteBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  };

  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">Book Management</h2>
          <p className="text-muted-foreground">
            Add, edit, and manage the library's book collection and student book requests.
          </p>
        </div>

        <BookManagementTabs
          books={books}
          filteredBooks={filteredBooks}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          bookRequests={bookRequests}
          openAddDialog={() => setIsAddDialogOpen(true)}
          handleEditBook={handleEditBookClick}
          handleDeleteBook={handleDeleteBookClick}
          handleExportBooks={handleExportBooks}
          handleExportRequests={handleExportRequests}
          handleApproveRequest={handleApproveRequest}
          handleRejectRequest={handleRejectRequest}
        />

        {/* Dialogs */}
        <AddBookDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          newBook={newBook}
          setNewBook={setNewBook}
          onAddBook={handleAddBook}
        />

        <EditBookDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          onEditBook={handleEditBook}
        />

        <DeleteBookDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          selectedBook={selectedBook}
          onDeleteBook={handleDeleteBook}
        />
      </div>
    </DashboardLayout>
  );
}
