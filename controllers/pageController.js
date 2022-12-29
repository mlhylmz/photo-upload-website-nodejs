const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getAddPhotoPage = (req, res) => {
    res.render('add');
};

exports.getEditPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    console.log('edit geldi');
    res.render('edit', {
        photo,
    });
};
