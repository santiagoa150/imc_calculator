const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session')

const { requestLogin, getUserData } = require('./routes/login/request')

const app = express();
const { Client } = require('pg')

const dbClient = new Client({
    user: 'maysu',
    host: 'localhost',
    database: 'imc',
    password: '',
    port: 5432,
})

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

const isLogged = (session) => {
    return session?.userLoggedId;
}

// ruta para servir los archivos staticos en carpeta assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'routes/home/index.html'))
});

// Login
app.get('/login', (req, res) => {
    if (isLogged(req.session)) {
        res.redirect('/')
    }
    res.sendFile(path.resolve(__dirname, 'routes/login/index.html'))
});
app.get('/login/request', async (req, res, next) => {
    const id = req.query.ID;
    const password = req.query.password;


    // recibe los credenciales (cedula y contrasena) del usuario
    // verifica que existan y sean correctas y autoriza al usuario a
    // continuar a la pagina de perfil.
    const user = await requestLogin(id, password, dbClient);
    if (user) {
        req.session.userLoggedId = user.identification;
        res.redirect('/')
    } else {
        res.redirect('/login?error=notfound')
    }
});
app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
})


// Perfil
app.get('/profile', (req, res) => {
    if (!isLogged(req.session)) {
        res.redirect('/')
    }
    res.sendFile(path.resolve(__dirname, 'routes/profile/index.html'))
});

// Esta ruta obtiene los datos del usuario logeado 
// en la session actual junto con sus datos en caso de existir
// si se necesitan trar mas datos hay que modificar la query que los obtine
app.get('/getData', async (req, res) => {
    // Implmentar funcion para traer los datos del perfil
    const userId = req.session?.userLoggedId;
    console.log(userId)
    const userData = await getUserData(userId, dbClient);
    res.status(200).json(userData ? userData : {});
    //return userData;
    // solicita los datos para mostrar en la pagina.
    // verificando que este logeado antes
});



app.listen(3000, (req, res) => {
    console.log('SERVER RUNNING at', 'http://localhost:3000');
    dbClient.connect(function (err) {
        if (err) throw err;
        console.log("Connected to DB!");
    });
})