import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import booksRoutes from "./routes/books.routes.js";

config();

const app = express();

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect(url, { dbName })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  });
const db = mongoose.connection;

app.use("/BOOKS", booksRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
