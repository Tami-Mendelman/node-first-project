
const { v4: uuidv4 } = require('uuid');

let books = [
  { id: '1', title: 'Clean Code' },
  { id: '2', title: 'You Don\'t Know JS' },
  { id: '3', title: 'The Pragmatic Programmer' },
  { id: '4', title: 'Refactoring' },
  { id: '5', title: 'JavaScript: The Good Parts' },
  { id: '6', title: 'Design Patterns' },
  { id: '7', title: 'Eloquent JavaScript' },
  { id: '8', title: 'Node.js Design Patterns' },
  { id: '9', title: 'Head First Design Patterns' },
  { id: '10', title: 'Domain-Driven Design' }
];

function getAllBooks() {
  return books;
}

function getBookById(id) {
  id = String(id);
  return books.find(b => String(b.id) === id) || null;
}

function addBook({ id, title }) {
  if (!title || typeof title !== 'string' || !title.trim()) throw 'TITLE_REQUIRED';

  if (id !== undefined) {
    id = String(id);
    if (books.some(b => String(b.id) === id)) throw 'ID_EXISTS';
  } else {
    id = uuidv4(); 
  }

  const book = { id, title: title.trim() };
  books.push(book);
  return book;
}

function updateBookTitle(id, title) {
  if (!title || typeof title !== 'string' || !title.trim()) throw 'TITLE_REQUIRED';
  id = String(id);
  const b = books.find(b => String(b.id) === id);
  if (!b) return null;
  b.title = title.trim();
  return b;
}

function deleteBookById(id) {
  id = String(id);
  const idx = books.findIndex(b => String(b.id) === id);
  if (idx === -1) return false;
  books.splice(idx, 1);
  return true;
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBookTitle,
  deleteBookById,
};
