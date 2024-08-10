const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
} = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date();
  console.log(
    `Method: ${req.method} URL: ${
      req.originalUrl
    } Timestamp: ${timestamp.toISOString()}`
  );
  res.status(200).json({ message: 'This is working.' });
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const userId = getById(req.params.id);
  if (userId) {
    const user = req.user;
    res.status(200).json(user);
    next();
  } else {
    res.status(404).json({ message: 'user not found' });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
