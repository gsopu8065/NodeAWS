var app = require('./../app');
var aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'XX',
    accessKeyId: 'XX',
    region: 'us-east-2'
});

var s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'sample8065',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, file.originalname+Date.now().toString())
        }
    })
});




app.get('/hello', function (req, res) {
    res.send({ name:'Hello World Service'});

});

app.post('/go', function(req, res) {
    console.log("welcome")
    res.send({ name:'Hello World Service'});
});

//used by upload form
app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!"+JSON.stringify(req.files));
});