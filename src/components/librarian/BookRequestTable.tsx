
import React from 'react';
import { BookRequest } from '@/types/library';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface BookRequestTableProps {
  requests: BookRequest[];
  onApproveRequest: (requestId: number) => void;
  onRejectRequest: (requestId: number) => void;
}

export const BookRequestTable: React.FC<BookRequestTableProps> = ({
  requests,
  onApproveRequest,
  onRejectRequest,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>Book</TableHead>
          <TableHead>Request Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              No book requests found.
            </TableCell>
          </TableRow>
        ) : (
          requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.studentName}</TableCell>
              <TableCell>{request.studentId}</TableCell>
              <TableCell>{request.bookTitle}</TableCell>
              <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : request.status === 'approved'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {request.status === 'pending' ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      className="gradient-button flex items-center gap-1"
                      onClick={() => onApproveRequest(request.id)}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => onRejectRequest(request.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="text-muted-foreground px-4">-</span>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
