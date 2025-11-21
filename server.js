import express from "express";
import * as Books from "./book.js";
import * as Members from "./member.js";
import * as Library from "./library.js";

const app = express();
app.use(express.json());

// Home
app.get("/", (req, res) => res.send("Welcome to Node.js library"));

// ---------------- Books ----------------
app.get("/books", async (req, res) => res.json(await Books.getAllBooks()));
app.get("/books/:id", async (req, res) => {
  try { res.json(await Books.getBookById(req.params.id)); } 
  catch(e){ res.status(404).json({ error: e.message }) }
});
app.post("/books", async (req, res) => {
  try { res.status(201).json(await Books.addBook(req.body)); } 
  catch(e){ res.status(400).json({ error: e.message }) }
});
app.put("/books/:id", async (req,res)=>{
  try{ res.json(await Books.updateBook(req.params.id, req.body)); } 
  catch(e){ res.status(404).json({ error: e.message }) }
});
app.delete("/books/:id", async (req,res)=>{
  try{ res.json(await Books.deleteBook(req.params.id)); } 
  catch(e){ res.status(404).json({ error: e.message }) }
});
app.get("/books/search/:query", async (req,res)=>{
  res.json(await Books.searchBooks(req.params.query));
});

// ---------------- Members ----------------
app.get("/members", async (req,res)=>res.json(await Members.getAllMembers()));
app.get("/members/:id", async (req,res)=>{
  try{ res.json(await Members.getMemberById(req.params.id)); } 
  catch(e){ res.status(404).json({ error: e.message }) }
});
app.post("/members", async (req,res)=>{
  try{ res.status(201).json(await Members.addMember(req.body)); } 
  catch(e){ res.status(400).json({ error: e.message }) }
});
app.put("/members/:id", async (req,res)=>{
  try{ res.json(await Members.updateMember(req.params.id, req.body)); } 
  catch(e){ res.status(404).json({ error: e.message }) }
});
app.delete("/members/:id", async (req,res)=>{
  try{ res.json(await Members.deleteMember(req.params.id)); } 
  catch(e){ res.status(404).json({ error: e.message }) }
});

// ---------------- Borrow & Return ----------------
app.post("/members/:memberId/borrow/:bookId", async (req,res)=>{
  try{ res.json(await Library.borrowBook(req.params.memberId, req.params.bookId)); } 
  catch(e){ res.status(400).json({ error: e.message }) }
});
app.post("/members/:memberId/return/:bookId", async (req,res)=>{
  try{ res.json(await Library.returnBook(req.params.memberId, req.params.bookId)); } 
  catch(e){ res.status(400).json({ error: e.message }) }
});
app.get("/overdue", async (req,res)=>{
  res.json(await Library.getOverdueBooks());
});

// ---------------- Start Server ----------------
const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
