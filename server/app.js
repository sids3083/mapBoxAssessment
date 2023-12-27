const dotenv = require("dotenv");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

//===================Server Configs===========================
const app = express();
const PORT = 8000;

//===================Middleware===========================
app.use(bodyParser.json());
app.use(cors());

//===================Routes-IMPORTS===========================
const userRouter = require('./src/routes/users.router');  
const postRouter = require('./src/routes/posts.router');
const commentRouter = require('./src/routes/comments.router');

//===================Routes-USES===========================
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);

//===================Static Files===========================
app.use("/uploads", express.static(__dirname + "/uploads"));

//===================Server Start===========================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});















