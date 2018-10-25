var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var fileUpload = multer({dest: 'uploadedFiles/'});
var app = module.exports = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/uploadfile', fileUpload.single('file'), (req, res, next) => {
    console.log('File has been uploaded!');
    console.log('request:', req);
    return res.json({
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
    });
})

// Set port to 8000
app.listen(8000, () => {
    console.log('Listening on localhost:8000...')
})