
const db = require('../../db');


// get all posts by user id
exports.getPostByUsername = async (req, res) => {
  const username = req.params.username;
  try {

    const result = await db.query(`
      SELECT postData.*
      FROM postData
      JOIN users ON postData.user_id = users.id
      WHERE users.username = $1;
    `, [username]);

    if (result.rows.length > 0) {

      Promise.all(result.rows.map(async (elm) => {
        const comments = await db.query('SELECT * FROM commentData WHERE post_id = $1', [elm.id]);
        elm.comments = comments?.rows?.length || 0;
      })).then(() => {
        return res.json({ success: true, message: "Blogs get successfully", data: result.rows });
      }).catch((error) => {
        return res.status(400).json({
          success: false,
          message: error?.message,
        });
      });

    } else {
      res.status(404).json({ success: false, message: "Blogs Not found for this user" });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

// get post by post id
exports.getPostById = async (req, res) => {
  const postId = req.params.id;
  try {

    const result = await db.query('SELECT * FROM postData WHERE id = $1', [postId]);

    if (result.rows.length > 0) {

      res.json({ success: true, message: "Blogs get successfully", data: result.rows[0] });

    } else {
      res.status(404).json({ success: false, message: "Blogs Not found for this user" });
    }
  } catch (error) {
    res.status(500).send({success:false,message:error.message});
  }
}



// Create a new post
exports.createPost = async (req, res) => {

  const image = req.file.path;

  const { title, user_id, content } = req.body;

  try {
    const result = await db.query('INSERT INTO postData(title, content, user_id, image) VALUES($1, $2, $3 ,$4) RETURNING *', [title, content, user_id, image]);

    return res.json({ success: true, message: "Post created successfully", data: result.rows[0] });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message, });
  }

};

