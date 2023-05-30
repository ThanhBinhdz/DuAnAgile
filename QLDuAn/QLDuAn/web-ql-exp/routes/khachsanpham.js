var express = require('express');
var multer = require('multer');
var router = express.Router();
var spCtrl = require('../controllers/khachsanpham.controller');
var upload = multer({ dest : './tmp'});

router.get('/home',spCtrl.home );

router.get('/chitietsanpham/:idsp',spCtrl.chitietsanpham );
router.post('/chitietsanpham/:idsp',spCtrl.chitietsanpham );

module.exports = router;
