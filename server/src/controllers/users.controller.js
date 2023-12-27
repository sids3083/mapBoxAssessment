const db = require('../../db');

// get user by user name
exports.getUserByUsername  = async (req, res) => {

    const username = req.params.username;

    try {

      const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  
      if (result.rows.length > 0) {
        res.json({success:true,message:"User get successfully",data:result.rows[0]});
      } else {
       return res.json({success:false,message:"user not found"});
      }
    } catch (error) {
      res.status(500).send({success:false,message:error.message});
    }
  }

// get all users
exports.getAllUser  = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json({success:true,message:"User get successfully",data:result.rows});
  } catch (error) {
    res.status(500).send({success:false,message:error.message});
  }
}
  
  // Create a new user
  exports.createUser =  async (req, res) => {

    const { username } = req.body;
    try {
      const result = await db.query('INSERT INTO users (username) VALUES ($1) RETURNING *', [
        username,
      ]);
      res.json({success:true,message:"User created successfully",data:result.rows[0]});
    } catch (error) {
      res.status(500).send({success:false,message:error.message});
      res.status(500).send({success:false,message:error.message});  
    }
  };

  