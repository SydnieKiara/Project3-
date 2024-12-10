/**
 * Middleware to validate book data for fiction books
 */
const validateFictionBookData = [
  check('title').notEmpty().withMessage('Title is required'),
  check('author').notEmpty().withMessage('Author is required'),
  check('genre').notEmpty().withMessage('Genre is required'),
  check('publicationYear')
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Publication year must be between 1900 and the current year'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

/**
 * Middleware to validate book data for non-fiction books
 */
const validateNonFictionBookData = [
  check('title').notEmpty().withMessage('Title is required'),
  check('author').notEmpty().withMessage('Author is required'),
  check('field').notEmpty().withMessage('Field of study is required'),
  check('publicationYear')
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Publication year must be between 1900 and the current year'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateFictionBookData,
  validateNonFictionBookData,
};
