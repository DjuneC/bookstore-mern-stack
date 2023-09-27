import dotenv from "dotenv";
//load environment variables
dotenv.config();

import express from "express";
import { PORT, connectDB } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import routerBook from "./routes/bookRoutes.js";

const app = express();

//middleware to handle parsed request
app.use(express.json());

//middleware to handle cors policy
//This configuration handle custom cors policy
// app.use(cors({
//   origin: ["http//:127.0.0.1:3000/", "http//:127.0.0.1:5173/"],
//   methods: ["GET", "PATCH", "POST", "DELETE"],
//   allowedHeaders: ['Content-Type']
// }))
app.use(cors())

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