const Staff = require('../models/staffModel');

/**
 * Create a new staff member
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const createStaff = async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const staffMember = new Staff({ name, email, position });
    const savedStaff = await staffMember.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(500).json({ error: 'Error creating staff member' });
  }
};

/**
 * Get all staff members
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching staff members' });
  }
};

/**
 * Get a staff member by ID
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffMember = await Staff.findById(id);
    if (!staffMember) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(200).json(staffMember);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching staff member' });
  }
};

/**
 * Update a staff member
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedStaff = await Staff.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ error: 'Error updating staff member' });
  }
};

/**
 * Delete a staff member
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting staff member' });
  }
};

module.exports = {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};
