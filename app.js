const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
// Route to add a book
app.post('/books', async (req, res) => {
    try {
      const { title, purchaseTime, returnTime } = req.body;
      const book = await db.books.create({ title, purchaseTime, returnTime });
      res.json(book);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // Route to get all books
  app.get('/books', async (req, res) => {
    try {
      const books = await db.books.findAll();
      res.json(books);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Route to update return time and calculate fine
  app.put('/books/:id', async (req, res) => {
    try {
      const book = await db.books.findByPk(req.params.id);
      if (!book) return res.status(404).send('Book not found');
  
      const { returnTime } = req.body;
      book.returnTime = returnTime;
      const delayHours = Math.max(0, Math.ceil((new Date(returnTime) - new Date(book.purchaseTime)) / 3600000 - 1));
      book.fine = delayHours * 10;
      await book.save();
  
      res.json(book);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // Route to get all returned books
  app.get('/returnedBooks', async (req, res) => {
    const books = await db.books.findAll({
      where: {
        returnTime: {
          [db.Sequelize.Op.ne]: null
        }
      }
    });
    res.json(books);
  });


app.listen(3000, () => {
  console.log(`Server running on 3000`);
  db.sequelize.sync();
});
