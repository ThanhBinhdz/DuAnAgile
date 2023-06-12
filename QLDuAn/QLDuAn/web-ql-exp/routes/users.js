var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');
var check_login = require('../middlewares/check_login');
router.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});


router.get('/dangnhap',userCtrl.dangnhap);
router.post('/dangnhap',userCtrl.dangnhap);


router.get('/dangky',userCtrl.dangky);
router.post('/dangky',userCtrl.dangky);

router.get('/thongtin',check_login.yeu_cau_login,userCtrl.thongtin);
router.post('/thongtin',check_login.yeu_cau_login,userCtrl.thongtin);


router.get('/doimk',check_login.yeu_cau_login,userCtrl.doimk);
router.post('/doimk',check_login.yeu_cau_login,userCtrl.doimk);
module.exports = router;
