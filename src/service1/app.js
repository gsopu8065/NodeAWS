var express = require('express');
var winston = require('winston');
var winstonRotator = require('winston-daily-rotate-file');
var expressWinston = require('express-winston');
var loggerFile = require('./logConfig/logger')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('file-system');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(methodOverride());

if(!fs.existsSync('/tmp/logs')){
    fs.mkdirSync('/tmp/logs');
}

// Let's make our express `Router` first.
var router = express.Router();
router.get('/hello/error', function(req, res, next) {
    // here we cause an error in the pipeline so we see express-winston in action.
    return next(new Error("This is an error and it should be logged to the console"));
});

const logwriter = new winston.Logger({
    'transports': [new (winston.transports.Console)()]
});
logwriter.add(winstonRotator, {
    'name': 'access-file',
    'level': 'info',
    'filename': '/tmp/logs/apilogs.log',
    'json': true,
    'datePattern': 'yyyy-MM-dd-',
    'prepend': true
});

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

app.use(loggerFile.logger(logwriter));

// Now we can tell the app to use our routing code:
app.use(router);

// express-winston errorLogger makes sense AFTER the router.
app.use(loggerFile.errorLogger(logwriter, winston));

var server = app.listen(8081, function(){
    logwriter.info("server started")
});

module.exports = app;