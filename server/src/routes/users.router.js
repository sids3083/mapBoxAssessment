const express = require('express');
const router = express.Router();
const {createUser,getUserByUsername,getAllUser} = require('../controllers/users.controller');

// GET /users
router.get('/users', getAllUser)

// GET /users/:id
router.get('/user/:username', getUserByUsername)

// POST /users
router.post('/user',createUser )


module.exports = router;
