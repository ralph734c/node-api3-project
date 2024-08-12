const express = require('express');

const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS

  try {
    const users = await usersModel.get();
    if (users && users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).send('No users found');
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const userId = req.params.id;
    const user = await usersModel.getById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body;
  try {
    const createdUser = await usersModel.insert(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const userIdToUpdate = req.params.id;
  const updatedUserBody = req.body;
  try {
    const updatedUser = await usersModel.update(
      userIdToUpdate,
      updatedUserBody
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const userIdToDelete = req.params.id;
  try {
    const user = await usersModel.remove(userIdToDelete);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const userPostsById = req.params.id;
  try {
    const thisUsersPosts = await usersModel.getUserPosts(userPostsById);
    res.status(200).json(thisUsersPosts);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;
