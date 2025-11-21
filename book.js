// books.js
import { v4 as uuidv4 } from "uuid";

export let books = [
  { id: uuidv4(), title: "Book One", author: "A one", year: 2025, copies: 3 },
  { id: uuidv4(), title: "Book Two", author: "John", year: 2025, copies: 5 },
  { id: uuidv4(), title: "Book Three", author: "Alam", year: 2025, copies: 1 },
];

export function getAllBooks() {
    return books; 
    }

export function getBookById(id) {
  return books.find((b) => b.id === id);
}

export function addBook(book) {
  const newBook = { id: uuidv4(), ...book };
  books.push(newBook);
  return newBook;
}

export function updateBook(id, updatedBook) {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) throw new Error("Book not found");
  books[index] = { ...books[index], ...updatedBook };
  return books[index];
}

export function deleteBook(id) {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) throw new Error("Book not found");
  return books.splice(index, 1)[0];
}
