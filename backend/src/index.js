const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const apiRoutes = require('./routes/routes.js');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true, parameterLimit: 200000 }))
app.use(session({
  secret: 'cometabook',
  resave: false,
  saveUninitialized: true
}));

app.use(apiRoutes);

// Rota 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Inicialização do servidor
app.listen(process.env.PORT, function() {
  console.log(`Servidor iniciado na porta ${process.env.PORT}`);
});