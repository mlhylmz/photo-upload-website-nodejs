const express = require('express');
const nodemon = require('nodemon');

const app = express();

const myLogger = (req, res, next) => {
    console.log('middleware log');
    next();
};

// MIDDLEWARE
app.use(express.static('public'));
app.use(myLogger);


const port = 3000;

// LISTENING
app.listen(port, () => {
    console.log(`Dinleniyor port :${port}`);
});

app.get('/', (req, res) => {
    const photo = {
        id: 1,
        name: 'Photo Name',
        description: 'Photo Desc',
    };
    res.send(photo);
});
