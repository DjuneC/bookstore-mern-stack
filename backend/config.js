import dotenv from "dotenv";
//load environment variables
dotenv.config();

export const PORT = 5555 || 9000;

export const connectDB = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.wxe42lj.mongodb.net/?retryWrites=true&w=majority`