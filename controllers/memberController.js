const Member = require('../models/memberModel');

/**
 * Create a new library member
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createMember = async (req, res) => {
  try {
    const { name, email, membershipDate } = req.body;
    const member = new Member({ name, email, membershipDate });
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ error: 'Error creating library member' });
  }
};

/**
 * Get all library members
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching library members' });
  }
};

/**
 * Get a library member by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ error: 'Library member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching library member' });
  }
};

/**
 * Update a library member
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedMember = await Member.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ error: 'Library member not found' });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: 'Error updating library member' });
  }
};

/**
 * Delete a library member
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ error: 'Library member not found' });
    }
    res.status(200).json({ message: 'Library member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting library member' });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
