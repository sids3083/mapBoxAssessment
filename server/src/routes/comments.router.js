const express = require('express');
const router = express.Router();
const {getCommentsByPostId,createComments} = require('../controllers/comments.controller')
const multer = require('multer');



// GET /comments by post id
router.get('/comments/:id', getCommentsByPostId)

// POST /comment create
router.post('/comment', createComments )


module.exports = router;