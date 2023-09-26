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

app.get('/', (req, res) => {
    return res.status(200).json({"message":"Everything went through"})
});

app.post('/create-book', async (req, res) => {
  const {title, author, publishYear} = req.body;
  
  try {
    const book = new Book (
      {
        title, author, publishYear
      }
    )
    await book.save();
    return res.status(201).json(book._id);
  } catch (error) {
    return res.status(500).json({'message': 'Failed to create the new book'})
  }
});

app.get('/get-all-books', async (req, res) => {
  try {
    const books = await Book.find({}).populate('author');
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({"message" : "Failed to fetch all books"});
  }
});