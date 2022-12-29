const express = require('express');
const fileUpload = require('express-fileupload');
const nodemon = require('nodemon');
const methodOverride = require('method-override');

const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const mongoose = require('mongoose');

const Photo = require('./models/photo');
const { title } = require('process');

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
app.get('/', async (req, res) => {
    const photos = await Photo.find({});
    res.render('index', {
        photos,
    });
});

//PHOTOS
app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo,
    });
});

// EDIT
app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    console.log('edit geldi');
    res.render('edit', {
        photo,
    });
});

// DELETE METHOD
app.delete('/photos/:id', async (req, res) => {
    console.log(req.params.id);
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletePath = __dirname + '/public' + photo.image;
    fs.unlinkSync(deletePath);

    await Photo.findByIdAndRemove(req.params.id);

    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
/* //OLD DATABSE FILE UPLOAD
app.post('/photos', async (req, res) => {
    console.log(req.files);
    //await Photo.create(req.body);
    //res.redirect('/');

    const uploadDir = 'public/uploads';
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir)
    }

    let uploadedImage = req.files.image;
    console.log("req files : " + uploadedImage);
    
    

    let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

    console.log(uploadPath);

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
        });
        
        res.redirect('/');
    });
    
    
});*/

app.post('/photos/:id', async (req, res) => {
    console.log('put geldi: ' + req.params.id);

    const photo = await Photo.findOne({ _id: req.params.id });
    console.log('photo: ' + photo);
    console.log('req body isim: ' + req.body.desc);
    photo.title = req.body.title;
    photo.description = req.body.desc;
    photo.save();

    res.redirect(`/photos/${req.params.id}`);
});
// NEW DATABSE FILE UPLOAD
app.post('/photos', async (req, res) => {
    console.log(req.files);
    //await Photo.create(req.body);
    //res.redirect('/');

    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    console.log('req files : ' + uploadedImage);

    let randomName = Math.random().toString(36).slice(2, 10); // Random Name 8
    randomName = randomName + '.jpg';

    let uploadPath = __dirname + '/public/uploads/' + randomName;

    console.log(uploadPath);

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + randomName,
        });

        res.redirect('/');
    });
});

app.get('/photos', (req, res) => {
    res.render('photo');
});
