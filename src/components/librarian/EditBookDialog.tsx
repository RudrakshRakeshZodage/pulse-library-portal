
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

interface EditBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBook: Book | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
  onEditBook: () => void;
}

export const EditBookDialog: React.FC<EditBookDialogProps> = ({
  open,
  onOpenChange,
  selectedBook,
  setSelectedBook,
  onEditBook,
}) => {
  if (!selectedBook) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Edit Book Details</DialogTitle>
          <DialogDescription>
            Update the book information in the library collection.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={selectedBook.title}
                onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-author">Author</Label>
              <Input
                id="edit-author"
                value={selectedBook.author}
                onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-department">Department</Label>
              <Input
                id="edit-department"
                value={selectedBook.department}
                onChange={(e) => setSelectedBook({ ...selectedBook, department: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-publicationYear">Publication Year</Label>
              <Input
                id="edit-publicationYear"
                value={selectedBook.publicationYear}
                onChange={(e) => setSelectedBook({ ...selectedBook, publicationYear: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-isbn">ISBN</Label>
            <Input
              id="edit-isbn"
              value={selectedBook.isbn}
              onChange={(e) => setSelectedBook({ ...selectedBook, isbn: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-copies">Total Copies</Label>
              <Input
                id="edit-copies"
                type="number"
                min="1"
                value={selectedBook.copies}
                onChange={(e) => setSelectedBook({ ...selectedBook, copies: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-availableCopies">Available Copies</Label>
              <Input
                id="edit-availableCopies"
                type="number"
                min="0"
                max={selectedBook.copies}
                value={selectedBook.availableCopies}
                onChange={(e) => setSelectedBook({ ...selectedBook, availableCopies: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-coverImage">Cover Image URL</Label>
            <Input
              id="edit-coverImage"
              value={selectedBook.coverImage}
              onChange={(e) => setSelectedBook({ ...selectedBook, coverImage: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Input
              id="edit-description"
              className="h-20"
              value={selectedBook.description}
              onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onEditBook}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
