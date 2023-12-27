const express = require('express');
const router = express.Router();
const {getPostByUsername,createPost,getPostById} = require('../controllers/posts.controller')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // File name to save in the destination folder
    },
  });

  const upload = multer({ storage: storage });

// GET /post by user id
router.get('/post/:username', getPostByUsername)
router.get('/post/single/:id', getPostById)

// POST /post create
router.post('/post',upload.single('file') , createPost )


module.exports = router;