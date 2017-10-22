
var app = require('myna-server').app;

app.get('/hello', function (req, res) {
    res.send({ name:'Hello World Service'});

});

app.post('/go', function(req, res) {
    console.log("welcome")
    res.send({ name:'Hello World Service'});
});

//used by upload form
/*
app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!"+JSON.stringify(req.files));
});*/
