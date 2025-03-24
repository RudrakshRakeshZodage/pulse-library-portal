
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Download } from 'lucide-react';
import { Book, BookRequest } from '@/types/library';
import { BookTable } from './BookTable';
import { BookRequestTable } from './BookRequestTable';

interface BookManagementTabsProps {
  books: Book[];
  filteredBooks: Book[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookRequests: BookRequest[];
  openAddDialog: () => void;
  handleEditBook: (book: Book) => void;
  handleDeleteBook: (book: Book) => void;
  handleExportBooks: () => void;
  handleExportRequests: () => void;
  handleApproveRequest: (requestId: number) => void;
  handleRejectRequest: (requestId: number) => void;
}

export const BookManagementTabs: React.FC<BookManagementTabsProps> = ({
  books,
  filteredBooks,
  searchQuery,
  setSearchQuery,
  bookRequests,
  openAddDialog,
  handleEditBook,
  handleDeleteBook,
  handleExportBooks,
  handleExportRequests,
  handleApproveRequest,
  handleRejectRequest,
}) => {
  return (
    <Tabs defaultValue="books" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="books">Books Collection</TabsTrigger>
        <TabsTrigger value="requests">Book Requests</TabsTrigger>
      </TabsList>

      <TabsContent value="books" className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books by title, author, or department..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              className="gradient-button flex items-center gap-2"
              onClick={openAddDialog}
            >
              <Plus className="h-4 w-4" />
              Add New Book
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleExportBooks}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <BookTable 
              books={filteredBooks} 
              onEditBook={handleEditBook} 
              onDeleteBook={handleDeleteBook} 
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="requests" className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Student Book Requests</h3>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleExportRequests}
          >
            <Download className="h-4 w-4" />
            Export Requests
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <BookRequestTable 
              requests={bookRequests} 
              onApproveRequest={handleApproveRequest} 
              onRejectRequest={handleRejectRequest} 
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
