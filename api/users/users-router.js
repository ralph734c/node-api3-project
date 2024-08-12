const express = require('express');

const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS

  try {
    const users = await usersModel.get();
    if (users && users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).send('No users found');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const userId = req.params.id;
    const user = await usersModel.getById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body;
  try {
    const createdUser = await usersModel.insert(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
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
    next(error);
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const userIdToDelete = req.params.id;
  try {
    await usersModel.remove(userIdToDelete);
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const userPostsById = req.params.id;
  try {
    const thisUsersPosts = await usersModel.getUserPosts(userPostsById);
    res.status(200).json(thisUsersPosts);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/:id/posts',
  validateUserId,
  validatePost,
  async (req, res, next) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    try {
      const result = await postsModel.insert({
        user_id: req.params.id,
        text: req.text,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.use((error, req, res, next) => {
  // eslint-disable-line
  res.status(error.status || 500).json({
    customMessage: 'Something bad happened in the posts router',
    message: error.message,
    stack: error.stack,
  });
});

// do not forget to export the router

module.exports = router;
