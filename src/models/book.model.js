import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema({
  title: String,
  genre: String,
  author: String,
  publicationDate: String,
  image: String,
});

export default mongoose.model("Book", BookSchema);
