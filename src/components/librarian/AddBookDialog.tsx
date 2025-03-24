
import React from 'react';
import { Book } from '@/types/library';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newBook: Omit<Book, 'id'>;
  setNewBook: React.Dispatch<React.SetStateAction<Omit<Book, 'id'>>>;
  onAddBook: () => void;
}

export const AddBookDialog: React.FC<AddBookDialogProps> = ({
  open,
  onOpenChange,
  newBook,
  setNewBook,
  onAddBook,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Fill in the book details below to add it to the library collection.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={newBook.department}
                onChange={(e) => setNewBook({ ...newBook, department: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicationYear">Publication Year</Label>
              <Input
                id="publicationYear"
                value={newBook.publicationYear}
                onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              value={newBook.isbn}
              onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="copies">Total Copies</Label>
              <Input
                id="copies"
                type="number"
                min="1"
                value={newBook.copies}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    copies: parseInt(e.target.value),
                    availableCopies: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                value={newBook.coverImage}
                onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              className="h-20"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="gradient-button" onClick={onAddBook}>
            Add Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
