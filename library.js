// library.js
import { books } from "./book.js";
import { members } from "./member.js";

/**
 * Borrow a book
 * @param {string} memberId 
 * @param {string} bookId 
 */
export function borrowBook(memberId, bookId) {
  const book = books.find((b) => b.id === bookId);
  if (!book) throw new Error("Book not found");
  if (book.copies < 1) throw new Error("No copies available");

  const member = members.find((m) => m.id === memberId);
  if (!member) throw new Error("Member not found");

  const alreadyBorrowed = member.borrowedBooks.find((b) => b.bookId === bookId);
  if (alreadyBorrowed) throw new Error("Member already borrowed this book");

  // Add borrowed book to member
  member.borrowedBooks.push({
    bookId: book.id,
    borrowedAt: new Date().toISOString(),
  });

  // Decrease book copies
  book.copies -= 1;

  return { member, book };
}

/**
 * Return a book
 * @param {string} memberId 
 * @param {string} bookId 
 */
export function returnBook(memberId, bookId) {
  const member = members.find((m) => m.id === memberId);
  if (!member) throw new Error("Member not found");

  const borrowedIndex = member.borrowedBooks.findIndex((b) => b.bookId === bookId);
  if (borrowedIndex === -1) throw new Error("This book was not borrowed by the member");

  const book = books.find((b) => b.id === bookId);
  if (!book) throw new Error("Book not found");

  // Remove from borrowedBooks
  member.borrowedBooks.splice(borrowedIndex, 1);

  // Increase book copies
  book.copies += 1;

  return { member, book };
}
