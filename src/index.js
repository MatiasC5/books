import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import booksRoutes from "./routes/books.routes.js";

config();

const app = express();

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;
const port = process.env.PORT || 3000;

app.use("/BOOKS", booksRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
