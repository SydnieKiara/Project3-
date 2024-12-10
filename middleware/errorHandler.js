/**
 * Global error handler
 * @param {Object} err - Error object
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @param {Function} next - Calls the next middleware or controller
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred' });
  };
  
  module.exports = errorHandler;
  