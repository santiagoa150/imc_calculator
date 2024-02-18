const express = require('express');
const router = express.Router();
const path = require('path');

const isLogged = (session) => { return session?.userLoggedId; }

/**
 * Ruta principal.
 */
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'home/index.html'))
});

/**
 * Ruta del login.
 */
router.get('/login', (req, res) => {
    if (isLogged(req.session)) {
        res.redirect('/')
    }
    res.sendFile(path.resolve(__dirname, 'login/index.html'))
});

router.get('/register', (req, res) => {
    if (isLogged(req.session)) {
        res.redirect('/')
    }
    res.sendFile(path.resolve(__dirname, 'register/index.html'))
})

/**
 * Ruta del perfíl.
 */
router.get('/profile', (req, res) => {
    if (!isLogged(req.session)) {
        res.redirect('/')
    }
    res.sendFile(path.resolve(__dirname, 'profile/index.html'))
});

/**
 * Ruta para cerrar sesión.
 */
router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
})

module.exports = router;