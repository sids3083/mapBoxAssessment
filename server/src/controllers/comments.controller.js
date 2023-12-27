const db = require('../../db');


// get all posts by user id
exports.getCommentsByPostId  = async (req, res) => {
    
    const postId = req.params.id;
    
    try {
      const result = await db.query('SELECT * FROM commentData WHERE post_id = $1', [postId]);
  
      if (result.rows.length > 0) {

        res.json({success:true,message:"Blogs get successfully",data:result.rows.reverse()});
        
      } else {
        res.status(404).json({success:false,message:"Comments Not found for this comment"});
      }
    } catch (error) {
      res.status(500).send({success:false,message:error.message});
    }
  }
  
  // Create a new comment
  exports.createComments =  async (req, res) => {

    const { content,user_id,post_id } = req.body;

    try {
        const result = await db.query('INSERT INTO commentData(content, user_id, post_id) VALUES($1, $2, $3) RETURNING *', [content,user_id,post_id]);

        return res.json({ success:true,message:"comment created successfully", data:result.rows[0] });

    } catch (error) {
      res.status(500).json({ success:false,error:error.message, });
    }

  };

  