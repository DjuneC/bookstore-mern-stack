import express from "express";
import {PORT, connectDB} from "./config.js"
import mongoose from "mongoose";

const app = express();

//make the server listening to a specific port
app.listen(PORT, () => {
    console.log("Server is up and running at port : " + PORT)
})

//connect to the database
mongoose.connect(connectDB)
.then(()=>{})
.catch(()=>{})