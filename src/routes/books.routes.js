import express from "express";
import Book from "../models/book.model.js";

const router = express.Router();

const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  try {
    book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.book = book;
  next();
};

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { title, author, genre, publicationDate, image } = req?.body;
  if (!title || !author || !genre || !publicationDate || !image) {
    res.status(400).json({
      message:
        "Los campos título, autor, genero y fecha de publicación son obligatorios",
    });
  }

  const book = new Book({
    title,
    author,
    genre,
    publicationDate,
    image,
  });

  try {
    const newBook = await book.save();
    res.status(201).json({
      newBook,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/:id", getBook, async (req, res) => {
  res.json(res.book);
});

router.put("/:id", getBook, async (req, res) => {
  try {
    const book = res.book;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.image = req.body.image || book.image;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.patch("/:id", getBook, async (req, res) => {
  if (
    !req.body.title &&
    !req.body.author &&
    !req.body.genre &&
    !req.body.image
  ) {
    res.status(400).json({
      message: "Al menos un campo debe ser actualizado",
    });
  }

  try {
    const book = res.book;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.image = req.body.image || book.image;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.delete("/:id", getBook, async (req, res) => {
  try {
    const book = res.book;
    await res.book.deleteOne({
      _id: book._id,
    });

    res.json({ message: `Book deleted: ${book.title}` });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
