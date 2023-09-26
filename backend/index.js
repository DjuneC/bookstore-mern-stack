import dotenv from "dotenv";
//load environment variables
dotenv.config();

import express from "express";
import { PORT, connectDB } from "./config.js";
import mongoose from "mongoose";

const app = express();

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
