/**
 * Created by srujangopu on 11/16/15.
 */
var express = require('express');
var app = express();

app.get('/hello', function (req, res) {

    res.send('Hello World Service2');

});

var server = app.listen(8082, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});

module.exports = server;