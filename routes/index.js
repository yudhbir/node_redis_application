var express = require('express');
var QRCode = require('qrcode');
// var Jimp = require("jimp");
// var fs = require('fs');
// var path = require('path');
// var QreadCode = require('qrcode-reader');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/code', function(req, res) {
    QRCode.toFile('public/images/qr.png', 'http://localhost:3200/code', {
      color: {
        dark: '#FFF',  
        light: '#0000' 
      }
    }, function (err) {
      if (err) throw err
      res.end('done');
    });
});

module.exports = router;
