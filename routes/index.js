let express = require('express');
let router = express.Router();
let request = require('request');
const MAILGUN_CONFIG = require('../config/mailgun.config');

router.post('/send', function (req, res) {
    let apiBaseUrl = MAILGUN_CONFIG.baseURL + MAILGUN_CONFIG.domain;
    let apiKey = MAILGUN_CONFIG.apiKey;
    let from = MAILGUN_CONFIG.fromAddress;
    if (!req || !req.body || !req.body.to || req.body.to.length === 0) {
        res.status(404).send({
            "statusCode": 400,
            "body": 'Bad Request.'
        });
    } else {
        let body = {
            from: from,
            subject: req.body.subject,
            text: req.body.text
        };
        body.to = req.body.to.join(",");
        if (req.body && req.body.cc && Array.isArray(req.body.cc) && req.body.cc.length > 0) {
            body.cc = req.body.cc.join(",");
        }
        if (req.body && req.body.bcc && Array.isArray(req.body.bcc) && req.body.bcc.length > 0) {
            body.bcc = req.body.bcc.join(",");
        }
        let mailgunOpts = {
            url: apiBaseUrl + '/messages',
            headers: {
                Authorization: 'Basic ' + new Buffer('api:' + apiKey).toString('base64')
            },
            form: body
        };
        console.log(JSON.stringify(body));
        request.post(mailgunOpts, function (err, response) {
            res.status(response.statusCode).send(response);
        });
    }
});

router.get('/*', function (req, res, next) {
    res.status(404).send({
        "statusCode": 404,
        "body": 'Page Not Found.'
    })
});

module.exports = router;