
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
import { BookOpen } from 'lucide-react';

interface DeleteBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBook: Book | null;
  onDeleteBook: () => void;
}

export const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({
  open,
  onOpenChange,
  selectedBook,
  onDeleteBook,
}) => {
  if (!selectedBook) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this book from the library collection? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 py-4">
          <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded">
            {selectedBook.coverImage ? (
              <img
                src={selectedBook.coverImage}
                alt={selectedBook.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-medium">{selectedBook.title}</h4>
            <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDeleteBook}>
            Delete Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
