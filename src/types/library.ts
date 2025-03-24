
export type BookRequestStatus = "pending" | "approved" | "rejected";

export interface Book {
  id: number;
  title: string;
  author: string;
  department: string;
  publicationYear: string;
  isbn: string;
  copies: number;
  availableCopies: number;
  coverImage: string;
  description: string;
}

export interface BookRequest {
  id: number;
  bookId: number;
  bookTitle: string;
  studentName: string;
  studentId: string;
  requestDate: string;
  status: BookRequestStatus;
}
