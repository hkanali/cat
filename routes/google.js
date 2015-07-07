var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config');

router.get('/oauth2callback', function(req, res, next) {
    if (req.query.code) {
        var googleConf = config.get('google');
        var formData = {
            client_id: googleConf.client_id,
            client_secret: googleConf.client_secret,
            grant_type: 'authorization_code',
            redirect_uri: googleConf.redirect_uri,
            code: req.query.code
        };
        request.post({url: 'https://accounts.google.com/o/oauth2/token', formData: formData}, function(err, httpResponse, body) {
            if (err) console.error(err);
            console.log(JSON.parse(body));
        });
    }
    res.render('index', { title: 'Express' });
});

module.exports = router;
