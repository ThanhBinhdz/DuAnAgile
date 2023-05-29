var express = require('express');
var multer = require('multer');
var router = express.Router();
var spCtrl = require('../controllers/khachsanpham.controller');
var upload = multer({ dest : './tmp'});

router.get('/home',spCtrl.home );


module.exports = router;
