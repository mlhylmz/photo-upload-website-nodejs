const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
    const page = req.query.page || 1;
    const photosPerPage = 3;

    let totalPhotos = await Photo.find().countDocuments();

    const photos = await Photo.find({})
        .sort('-dateCreated')
        .skip((page - 1) * photosPerPage)
        .limit(photosPerPage);

    res.render('index', {
        photos: photos,
        current: page,
        pages: Math.ceil(totalPhotos / photosPerPage),
    });
    /*
    const photos = await Photo.find({});
    res.render('index', {
        photos,
    });*/
};

exports.getOnePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo,
    });
};

exports.createPhoto = async (req, res) => {
    console.log(req.files);

    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    console.log('req files : ' + uploadedImage);

    let randomName = Math.random().toString(36).slice(2, 10); // Random Name 8
    randomName = randomName + '.jpg';

    let uploadPath = __dirname + '/../public/uploads/' + randomName;

    console.log(uploadPath);

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + randomName,
        });

        res.redirect('/');
    });
};

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title;
    photo.description = req.body.desc;
    photo.save();
    console.log('log update photo');

    res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
    console.log(req.params.id);
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletePath = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletePath);
    console.log('log delete photo');

    await Photo.findByIdAndRemove(req.params.id);

    res.redirect('/');
};
