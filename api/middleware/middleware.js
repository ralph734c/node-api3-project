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
  const timestamp = new Date().toLocaleString();
  console.log(
    `Method: ${req.method} URL: ${req.originalUrl} Timestamp: ${[timestamp]}`
  );
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const userId = await getById(req.params.id);
    if (userId) {
      req.user = userId;
      next();
    } else {
      res
        .status(404)
        .json({ message: `A user with the ID ${req.params.id} was not found` });
    }
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const userName = req.body.name;
  if (userName) {
    req.name = userName.trim()
    next();
  } else {
    res.status(400).json({ message: 'missing required name field' });
  }
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
