
const express = require('express');
const app = express();
const port = 3000;

const bookDb = require('./data/bookDb');

app.use(express.json());

app.get('/books', (req, res) => {
  res.json(bookDb.getAllBooks());
});

app.get('/books/:id', (req, res) => {
  const id = String(req.params.id);
  const book = bookDb.getBookById(id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

app.post('/books', (req, res) => {
  try {
    const { id, title } = req.body || {};
    const created = bookDb.addBook({ id, title });
    res.status(201).json(created);
  } catch (e) {
    const map = {
      TITLE_REQUIRED: [400, 'title is required (string)'],
      ID_EXISTS:      [409, 'id already exists']
    };
    const [code, msg] = map[e] || [500, 'unexpected error'];
    res.status(code).json({ error: msg });
  }
});

app.patch('/books/:id', (req, res) => {
  const id = String(req.params.id);
  const { title } = req.body || {};
  try {
    const updated = bookDb.updateBookTitle(id, title);
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.json(updated);
  } catch (e) {
    const [code, msg] = e === 'TITLE_REQUIRED'
      ? [400, 'title is required (string)']
      : [500, 'unexpected error'];
    res.status(code).json({ error: msg });
  }
});

app.delete('/books/:id', (req, res) => {
  const id = String(req.params.id);
  const ok = bookDb.deleteBookById(id);
  if (!ok) return res.status(404).json({ error: 'Book not found' });
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
