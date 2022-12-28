const express = require('express');
const nodemon = require('nodemon');
const path = require('path');
const ejs = require('ejs');

const app = express();

// TEMPLATE ENGINE
app.set("view engine", "ejs")

// MIDDLEWARE
app.use(express.static('public'));

// LISTENING
const port = 3000;
app.listen(port, () => {
    console.log(`Dinleniyor port :${port}`);
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});
app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/about.html'));
});
app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/contact.html'));
});
app.get('/video-page.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/video-page.html'));
});
