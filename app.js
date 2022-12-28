const express = require('express');
const nodemon = require('nodemon');
const path = require('path');
const ejs = require('ejs');

const app = express();

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));

// LISTENING
const port = 3000;
app.listen(port, () => {
    console.log(`Dinleniyor port :${port}`);
});

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.get('/video-page', (req, res) => {
    res.render('video-page');
});
