'use strict'

module.exports.errorLogger = function errorLogger(logwriter, winston) {
    var level = 'error';

    return function (err, req, res, next) {
        try {

            var exceptionMeta = winston.exception.getAllInfo(err);
            exceptionMeta.req = {
                body: bodyToString(req.body),
                method: req.method,
                url: req.originalUrl || req.url,
                originalUrl: req.originalUrl,
                headers: req.headers,
                query: req.query,
                params: req.params,
                hostname: req.hostname,
                ip: req.ip
            };
            exceptionMeta.date = (new Date()).toUTCString();

            logwriter.log(level, exceptionMeta);

        } catch (erm) {
            console.log(JSON.stringify({
                "LoggerError": {
                    "error": erm,
                    "level": "error",
                    "message": "logger.errorLogger"
                }
            }));
        } finally {
            next(err);
        }
    };
};

module.exports.logger = function logger(logwriter) {
    var statusLevels = "info";

    return function (req, res, next) {  
        try {
            console.log("srujan1")
            var end = res.end;
            req._startTime = (new Date());
            res.end = function (responseBody, encoding) {

                res.end = end;
                res.end(responseBody, encoding);

                if (res.statusCode >= 100) {
                    statusLevels = "info";
                }
                if (res.statusCode >= 400) {
                    statusLevels = "warn";
                }
                if (res.statusCode >= 500) {
                    statusLevels = "error";
                }
                var isResponseJson = (res._headers && res._headers['content-type'] && res._headers['content-type'].indexOf('json') >= 0);

                var logData = {
                    date: (new Date()).toUTCString(),

                    res: {
                        body: bodyToString(responseBody),
                        responseTime: (new Date()) - req._startTime,
                        statusCode: res.statusCode,
                        headers: res.headers
                    },


                    req: {
                        body: bodyToString(req.body),
                        method: req.method,
                        url: req.originalUrl || req.url,
                        originalUrl: req.originalUrl,
                        headers: req.headers,
                        query: req.query,
                        params: req.params,
                        hostname: req.hostname,
                        ip: req.ip
                    }
                };

                logwriter.log(statusLevels, logData);
            };
        } catch (err) {
            console.log("srujan3")
            console.log(JSON.stringify({
                "LoggerError": {
                    "error": err,
                    "level": "error",
                    "message": "logger.logger"
                }
            }));
        } finally {
                next();
        }
    };
};

function safeJSONParse(string) {
    try {
        return JSON.parse(string);
    } catch (e) {
        return string;
    }
}

function bodyToString(body) {
    var stringBody = body && body instanceof Buffer ? body.toString() : body;
    return safeJSONParse(stringBody);
}

