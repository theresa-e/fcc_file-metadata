var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var fileUpload = multer({
    dest: 'uploaded_files/'
});
var app = module.exports = express();
var fs = require('fs');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

// Render index.html upon page load
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/uploadfile', fileUpload.single('file'), (req, res, next) => {
    if (!req.file.filename) {
        res.json({
            Error_Msg: '------- Could not upload file, please try again.'
        })
    } else {
        console.log('------- File has been uploaded!');
        var fileName = "./uploaded_files/" + req.file.filename;
        console.log(fileName)
        // Here we delete file immediately after upload.
        fs.unlinkSync(fileName);
        console.log('-------', 'File has been deleted.')
        return res.json({
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype
        });
    }
})

// Set port to 8000
app.listen(8000, () => {
    console.log('Listening on localhost:8000...')
})