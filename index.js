const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let books = [
  {
     id: 1,
      title: '1984',
       author: 'George Orwell'
     },
  { 
    id: 2,
     title: 'To Kill a Mockingbird', 
     author: 'Harper Lee' 
    }
];


app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});


app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});


app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  const removedBook = books.splice(index, 1);
  res.json({ message: 'Book deleted.', book: removedBook[0] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
