const { Router } = require('express');
const pool = require('../models/Db');
const dotenv = require('dotenv');

dotenv.config()

const router = Router();

router.get('/api/allBooks', async (req, res) => {
  try {
    const result = await pool.query('SELECT books.id, title, author, numberpages, synopisis, image, isavailable, genders.id AS idgender, genders.name AS namegender FROM books INNER JOIN genders ON (books.idgender = genders.id) ORDER BY books.id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/api/allUsers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/api/deleteBooks/:id', async (req, res) => {
  id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/api/deleteUsers/:id', async (req, res) => {
  id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/api/addBooks', async (req, res) => {
  title = req.body.namebook;
  idgender = req.body.idgender
  authorname = req.body.authorname
  numberPages = req.body.numberpages
  synopisis = req.body.synopsis
  image = req.body.image
  isavailable = req.body.isavailable

  try {
    const result = await pool.query('INSERT INTO books (title, idgender, author, numberpages, synopisis, image, isavailable) VALUES ($1, $2, $3, $4, $5, $6, $7)', [title, idgender, authorname, numberPages, synopisis, image, isavailable]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/api/register', async (req, res) => {
  nameUser = req.body.userName;
  password = req.body.pass
  idTypeUser = req.body.typeUser
  email = req.body.email

  try {
    const result = await pool.query('INSERT INTO USERS (email, password, idtypeuser, firstname) VALUES ($1, $2, $3, $4)', [email, password, idTypeUser, nameUser]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/api/genders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM genders');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/api/updateBooks', async (req, res) => {
  console.log(req.body.image)
  title = req.body.namebook;
  idgender = req.body.idgender
  authorname = req.body.authorname
  numberPages = req.body.numberpages
  synopisis = req.body.synopsis
  image = req.body.image
  isavailable = req.body.isavailable
  id = req.body.id

  try {
    const result = await pool.query('UPDATE books SET title = $1, idgender = $2, author = $3, numberpages = $4, synopisis = $5, image = $6, isavailable = $7 WHERE id = $8', [title, idgender, authorname, numberPages, synopisis, image, isavailable, id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/api/updateUsers', async (req, res) => {
  console.log(req.body.image)
  userName = req.body.userName
  pass = req.body.pass
  type = req.body.type
  id = req.body.id

  try {
    const result = await pool.query('update users set firstname = $1, password = $2, idtypeuser = $3 where id = $4', [userName, pass, type, id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/api/searchBooks/:search', async (req, res) => {
  let search = req.params.search

  try {
    const result = await pool.query(`SELECT books.id, title, author, numberpages, synopisis, image, isavailable, genders.name AS namegender FROM books INNER JOIN genders ON (books.idgender = genders.id) WHERE LOWER(title) LIKE LOWER('%${search}%') ORDER BY books.id`);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/api/searchUsers/:search', async (req, res) => {
  let search = req.params.search

  try {
    const result = await pool.query(`SELECT * FROM users WHERE LOWER(firstname) LIKE LOWER('%${search}%') ORDER BY id`);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/api/searchByGender/:gender', async (req, res) => {
  let gender = req.params.gender

  try {
    const result = await pool.query(`SELECT * FROM books WHERE idgender = $1`, [gender]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/api/auth', async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

    /*console.log(result.rows.length)
    if (result.rows.length === 1) {
      req.session.user = {
        email: result.rows[0].email,
        password: result.rows[0].password,
        firstname: result.rows[0].firstname,
        iduser: result.rows[0].idtypeuser
    };
    }*/
    res.json(result.rows[0])
  } catch (error) {
    console.log(error)
  }
})

router.get('/api/logout', async (req, res) => {
  req.session.destroy()
})

module.exports = router;