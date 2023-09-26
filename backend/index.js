import dotenv from "dotenv";
//load environment variables
dotenv.config();

import express from "express";
import { PORT, connectDB } from "./config.js";
import mongoose from "mongoose";
import Book from "./models/Book.js"

const app = express();

//middlewares
app.use(express.json());

//if db connection successful listen to a port
mongoose
  .connect(connectDB)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log("Server is up and running at port : " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/api/v1', (req, res) => {
    return res.status(200).json({ message : "Everything went through"})
});

app.post('/api/v1/book/create', async (req, res) => {
  const {title, author, publishYear} = req.body;
  
  try {
    const book = new Book (
      {
        title, author, publishYear
      }
    )
    await book.save();
    return res.status(201).json({id: book._id});
  } catch (error) {
    return res.status(500).json({ message : "Failed to create the new book"})
  }
});

app.get('/api/v1/book/all', async (req, res) => {
  try {
    const books = await Book.find({}).populate('author');
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message : "Failed to fetch all books"});
  }
});

app.get('/api/v1/book/search/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const book = await Book.findById(id).populate("author");

    if(!book.author){
      return res.status(400).json({ message : "The book has no associated author"})
    }

    return res.status(200).json(book);
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId'){
      return res.status(404).json({ message: "The specified book wasn't found"});
    }
    return res.status(500).json({"Message": "Failed to fetch book"})
  }
});

app.delete('/api/v1/book/remove/:id', async (req, res) => {
  const {id} = req.params;

  try {
    await Book.findByIdAndDelete(id);
    return res.status(200).json({message: 'The specified book was deleted successfully'})
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId'){
      return res.status(404).json({ message: "The specified book wasn't found"});
    }
    return res.status(500).json({message: "Failed to deleted book"})
  }
});

app.patch('/api/v1/book/update/:id', async (req, res) => {
  const {title, author, publishYear} = req.body;

  try {
    const existingBook = await Book.findById(req.params.id);

    if(!existingBook){
      return res.status(404).json({ message: "The specified book wasn't found"});
    }

    existingBook.title = title;
    existingBook.author = author;
    existingBook.publishYear = publishYear;

    await existingBook.save();
    return res.status(200).json({message: "The specified book has been successfully updated"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Failed to update book"});
  }
})