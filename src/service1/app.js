var express = require('express');
var winston = require('winston');
var expressWinston = require('express-winston');
var loggerFile = require('./logConfig/logger')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(methodOverride());

// Let's make our express `Router` first.
var router = express.Router();
router.get('/error', function(req, res, next) {
    // here we cause an error in the pipeline so we see express-winston in action.
    return next(new Error("This is an error and it should be logged to the console"));
});

//asurion
var logwriter = new winston.Logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: false,
            handleExceptions: true

        })
    ],
    exitOnError: false
});

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

app.use(loggerFile.logger(logwriter));

// Now we can tell the app to use our routing code:
app.use(router);

// express-winston errorLogger makes sense AFTER the router.
app.use(loggerFile.errorLogger(logwriter, winston));

var server = app.listen(8081, function(){
    console.log("express-winston demo listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;