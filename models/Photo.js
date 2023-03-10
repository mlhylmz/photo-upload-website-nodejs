const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

//Create Schema
const photoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

const Photo = mongoose.model('Photo', photoSchema) || mongoose.model.Photo;

module.exports = Photo;
