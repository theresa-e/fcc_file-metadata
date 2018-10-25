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
    console.log('File has been uploaded!');
    if (!res.fileName) {
        res.json({Error_Msg: 'Could not upload file, please try again.'})
    } else {
        var fileName = "./uploaded_files/" + req.file.filename;
        console.log(fileName)
        // delete file from database
        console.log('FILENAME: ', fileName)
        fs.unlinkSync(fileName);
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