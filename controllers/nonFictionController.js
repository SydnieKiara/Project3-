const NonFictionBook = require('../models/nonFictionModel');

/**
 * Create a new non-fiction book
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createNonFictionBook = async (req, res) => {
  try {
    const { title, author, field, publicationYear } = req.body;
    const book = new NonFictionBook({ title, author, field, publicationYear });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error creating non-fiction book' });
  }
};

/**
 * Get all non-fiction books
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getAllNonFictionBooks = async (req, res) => {
  try {
    const books = await NonFictionBook.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching non-fiction books' });
  }
};

/**
 * Get a non-fiction book by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getNonFictionBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await NonFictionBook.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Non-fiction book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching non-fiction book' });
  }
};

/**
 * Update a non-fiction book
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const updateNonFictionBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBook = await NonFictionBook.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Non-fiction book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Error updating non-fiction book' });
  }
};

/**
 * Delete a non-fiction book
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const deleteNonFictionBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await NonFictionBook.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Non-fiction book not found' });
    }
    res.status(200).json({ message: 'Non-fiction book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting non-fiction book' });
  }
};

module.exports = {
  createNonFictionBook,
  getAllNonFictionBooks,
  getNonFictionBookById,
  updateNonFictionBook,
  deleteNonFictionBook,
};
