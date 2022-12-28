const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('strictQuery', false);

// DATABASE CONNECT
mongoose.connect('mongodb://127.0.0.1:27017/pgal-test-db');
//mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1')

//Create Schema
const photoSchema = new Schema({
    title: String,
    description: String,
});

const Photo = mongoose.model('Photo', photoSchema);

// Create Photo
/*
Photo.create({
    title: 'Photo Title 1',
    description: 'Photo Description 1',
});
*/

/*Photo.find({}, (err, data) => {
    console.log(data);
});*/

const id = '63ac11af6a4f86a2b19164da';
// Update Photo
/*

Photo.findByIdAndUpdate(
    id,
    {
        title: 'Photo 1 R',
        description: 'Photo 1 Desc R',
    },
    {new:true}, // Güncellendikten sonra datada yeni değer için
    (err, data) => {
        console.log(data);
    }
);
*/

// DELETE DATA
Photo.findByIdAndDelete(id,(err,data)=>{
    console.log('Photo removed');
})




