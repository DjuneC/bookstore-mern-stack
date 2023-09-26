import dotenv from "dotenv";
//load environment variables
dotenv.config();

import express from "express";
import { PORT, connectDB } from "./config.js";
import mongoose from "mongoose";
import routerBook from "./routes/bookRoutes.js";

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
    return res.status(200).json({ message : "Welcome to Book Store API v1"})
});

app.use('/api/v1/book', routerBook)