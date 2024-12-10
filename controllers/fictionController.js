const FictionBook = require('../models/fictionModel');

/**
 * Create a new fiction book
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createFictionBook = async (req, res) => {
  try {
    const { title, author, genre, publicationYear } = req.body;
    const book = new FictionBook({ title, author, genre, publicationYear });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error creating fiction book' });
  }
};

/**
 * Get all fiction books
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getAllFictionBooks = async (req, res) => {
  try {
    const books = await FictionBook.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fiction books' });
  }
};

/**
 * Get a fiction book by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getFictionBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await FictionBook.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Fiction book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fiction book' });
  }
};

/**
 * Update a fiction book
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const updateFictionBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBook = await FictionBook.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Fiction book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error updating fiction book' });
  }
};

/**
 * Delete a fiction book
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const deleteFictionBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await FictionBook.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Fiction book not found' });
    }
    res.status(200).json({ message: 'Fiction book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting fiction book' });
  }
};

module.exports = {
  createFictionBook,
  getAllFictionBooks,
  getFictionBookById,
  updateFictionBook,
  deleteFictionBook,
};
