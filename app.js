const express = require('express');
const fileUpload = require('express-fileupload');
const nodemon = require('nodemon');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const mongoose = require('mongoose');

const Photo = require('./models/photo');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/pgal-test-db');
mongoose.set('strictQuery', false);

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// LISTENING
const port = 3000;
app.listen(port, () => {
    console.log(`Dinleniyor port :${port}`);
});

// ROUTES
app.get('/', async (req, res) => {
    const photos = await Photo.find({});
    res.render('index', {
        photos,
    });
});
app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo,
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/photos', async (req, res) => {
    //console.log(req.files);
    //await Photo.create(req.body);
    //res.redirect('/');

    const uploadDir = 'public/uploads';
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir)
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
        });
        res.redirect('/');
    });
});
app.get('/photos', (req, res) => {
    res.render('photo');
});
