import express from "express";
import Book from "../models/Book.js"

const routerBook = express.Router();

routerBook.post('/create', async (req, res) => {
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
  
routerBook.get('/all', async (req, res) => {
    try {
      const books = await Book.find({}).populate('author');
      return res.status(200).json(books);
    } catch (error) {
      return res.status(500).json({ message : "Failed to fetch all books"});
    }
  });
  
routerBook.get('/search/:id', async (req, res) => {
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
  
routerBook.delete('/remove/:id', async (req, res) => {
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
  
routerBook.patch('/update/:id', async (req, res) => {
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

export default routerBook;