var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');

router.get('/',userCtrl.dangnhap);
router.post('/',userCtrl.dangnhap);

router.get('/dangky',userCtrl.dangky);
router.post('/dangky',userCtrl.dangky);

router.get('/thongtin',userCtrl.thongtin);
router.post('/thongtin',userCtrl.thongtin);

module.exports = router;
