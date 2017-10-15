/**
 * Created by srujangopu on 11/16/15.
 */
var express = require('express');

var morgan = require('morgan')

var app = express()

app.use(morgan('combined'))


app.get('/hello2', function (req, res) {

    res.send('Hello World Service2 hello2');

});

app.get('/hello', function (req, res) {

    res.send('Hello World Service2 test');

});

var server = app.listen(8082, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});

module.exports = server;