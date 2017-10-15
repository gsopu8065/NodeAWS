var app = require('./../app');
app.get('/hello', function (req, res) {

    res.send({ name:'Hello World Service'});

});

app.get('/go', function(req, res) {
    res.send('This is a normal request, it should be logged to the console too');
});