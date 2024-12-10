const express = require('express');
const router = express.Router();

// Import controllers
const memberController = require('../controllers/memberController');
const staffController = require('../controllers/staffController');
const fictionBookController = require('../controllers/fictionBookController');
const nonFictionBookController = require('../controllers/nonFictionBookController');
const { validateFictionBookData, validateNonFictionBookData } = require('../middleware/validationMiddleware');

/**
 * Route for creating a new member
 * - POST /members
 * - Requires valid data: name, email, membershipDate
 */
router.post('/members', validateMemberData, memberController.createMember);

/**
 * Route for retrieving all members
 * - GET /members
 */
router.get('/members', memberController.getAllMembers);

/**
 * Route for retrieving a single member by ID
 * - GET /members/:id
 * - Requires a valid ID
 */
router.get('/members/:id', memberController.getMemberById);

/**
 * Route for updating a member's details
 * - PUT /members/:id
 * - Requires valid data and a valid ID
 */
router.put('/members/:id', validateMemberData, memberController.updateMember);

/**
 * Route for deleting a member
 * - DELETE /members/:id
 * - Requires a valid ID
 */
router.delete('/members/:id', memberController.deleteMember);

// Staff routes
/**
 * Route for creating a new staff member
 * - POST /staff
 * - Requires valid data: name, email, position
 */
router.post('/staff', validateStaffData, staffController.createStaff);

/**
 * Route for retrieving all staff members
 * - GET /staff
 */
router.get('/staff', staffController.getAllStaff);

/**
 * Route for retrieving a single staff member by ID
 * - GET /staff/:id
 * - Requires a valid ID
 */
router.get('/staff/:id', staffController.getStaffById);

/**
 * Route for updating a staff member's details
 * - PUT /staff/:id
 * - Requires valid data and a valid ID
 */
router.put('/staff/:id', validateStaffData, staffController.updateStaff);

/**
 * Route for deleting a staff member
 * - DELETE /staff/:id
 * - Requires a valid ID
 */
router.delete('/staff/:id', staffController.deleteStaff);

// Fiction book routes
/**
 * Route for creating a new fiction book
 * - POST /books/fiction
 * - Requires valid data: title, author, genre, publicationYear
 */
router.post('/books/fiction', validateFictionBookData, fictionBookController.createFictionBook);

/**
 * Route for retrieving all fiction books
 * - GET /books/fiction
 */
router.get('/books/fiction', fictionBookController.getAllFictionBooks);

/**
 * Route for retrieving a single fiction book by ID
 * - GET /books/fiction/:id
 * - Requires a valid ID
 */
router.get('/books/fiction/:id', fictionBookController.getFictionBookById);

/**
 * Route for updating a fiction book's details
 * - PUT /books/fiction/:id
 * - Requires valid data and a valid ID
 */
router.put('/books/fiction/:id', validateFictionBookData, fictionBookController.updateFictionBook);

/**
 * Route for deleting a fiction book
 * - DELETE /books/fiction/:id
 * - Requires a valid ID
 */
router.delete('/books/fiction/:id', fictionBookController.deleteFictionBook);

// Non-fiction book routes
/**
 * Route for creating a new non-fiction book
 * - POST /books/non-fiction
 * - Requires valid data: title, author, field, publicationYear
 */
router.post('/books/non-fiction', validateNonFictionBookData, nonFictionBookController.createNonFictionBook);

/**
 * Route for retrieving all non-fiction books
 * - GET /books/non-fiction
 */
router.get('/books/non-fiction', nonFictionBookController.getAllNonFictionBooks);

/**
 * Route for retrieving a single non-fiction book by ID
 * - GET /books/non-fiction/:id
 * - Requires a valid ID
 */
router.get('/books/non-fiction/:id', nonFictionBookController.getNonFictionBookById);

/**
 * Route for updating a non-fiction book's details
 * - PUT /books/non-fiction/:id
 * - Requires valid data and a valid ID
 */
router.put('/books/non-fiction/:id', validateNonFictionBookData, nonFictionBookController.updateNonFictionBook);

/**
 * Route for deleting a non-fiction book
 * - DELETE /books/non-fiction/:id
 * - Requires a valid ID
 */
router.delete('/books/non-fiction/:id', nonFictionBookController.deleteNonFictionBook);

module.exports = router;
