const express = require('express');
const fileUpload = require('express-fileupload');
const nodemon = require('nodemon');
const methodOverride = require('method-override');

const ejs = require('ejs');
const mongoose = require('mongoose');
const { title } = require('process');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

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
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

// LISTENING
const port = 3000;
app.listen(port, () => {
    console.log(`Dinleniyor port :${port}`);
});

// ROUTES
// PhotoController
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getOnePhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
//
//PageController
app.get('/photos/edit/:id', pageController.getEditPage);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPhotoPage);

