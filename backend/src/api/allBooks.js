const pool = require('../models/Db');

exports.allBooks = async (req, res) => {
  const result = await pool.query('SELECT * FROM genders');
  res.render(console.log(result))
}