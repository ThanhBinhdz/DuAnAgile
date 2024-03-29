var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');
var check_login = require('../middlewares/check_login');
router.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});
router.get('/',userCtrl.dangnhap);
router.post('/',userCtrl.dangnhap);

router.get('/dangky',userCtrl.dangky);
router.post('/dangky',userCtrl.dangky);

router.get('/thongtin',check_login.yeu_cau_login,userCtrl.thongtin);
router.post('/thongtin',check_login.yeu_cau_login,userCtrl.thongtin);


router.get('/doimk',check_login.yeu_cau_login,userCtrl.doimk);
router.post('/doimk',check_login.yeu_cau_login,userCtrl.doimk);


router.get('/delete/:id',check_login.yeu_cau_login,userCtrl.deleteTK);
router.delete('/delete/:id',check_login.yeu_cau_login,userCtrl.deleteTK);
router.get('/xacnhandelete/:id',check_login.yeu_cau_login,userCtrl.xacnhandeleteTK);
router.delete('/xacnhandelete/:id',check_login.yeu_cau_login,userCtrl.xacnhandeleteTK);

module.exports = router;
