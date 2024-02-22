const express = require('express');
const cookieSession = require('cookie-session');
const cors = require("cors");
const path = require('path');

require('dotenv').config()

const router = require('./routes/router');
const services = require('./database/database');

const app = express();

app.use(express.json());
app.use(cors());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

// ruta para servir los archivos staticos en carpeta assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

//Se estable las rutas de las páginas estáticas.
app.use('/', router);
app.use('/', services);

app.listen(process.env.APP_PORT || 3000, (req, res) => {
    console.log('SERVER RUNNING at', 'http://localhost:' + process.env.APP_PORT || 3000);
})