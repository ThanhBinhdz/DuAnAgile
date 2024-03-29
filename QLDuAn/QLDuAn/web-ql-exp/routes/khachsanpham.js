var express = require('express');
var multer = require('multer');
var router = express.Router();
var spCtrl = require('../controllers/khachsanpham.controller');
var upload = multer({ dest : './tmp'});
var check_login = require('../middlewares/check_login');
router.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});
router.get('/home',check_login.yeu_cau_login,spCtrl.home );
router.get('/tang',check_login.yeu_cau_login,spCtrl.giatientang);
router.get('/giam',check_login.yeu_cau_login,spCtrl.giatiengiam);
router.get('/home/:idloai',check_login.yeu_cau_login,spCtrl.loctheoLoai);


router.get('/chitietsanpham/:idsp',check_login.yeu_cau_login,spCtrl.chitietsanpham );
router.post('/chitietsanpham/:idsp',check_login.yeu_cau_login,spCtrl.chitietsanpham );

router.get('/thongtinkhach',check_login.yeu_cau_login,spCtrl.thongtinkhach);
router.post('/thongtinkhach',check_login.yeu_cau_login,spCtrl.thongtinkhach);
router.get('/doimkkhach',check_login.yeu_cau_login,spCtrl.doimkkhach);
router.post('/doimkkhach',check_login.yeu_cau_login,spCtrl.doimkkhach);

router.get('/donhangkhach',check_login.yeu_cau_login,spCtrl.donhang);


module.exports = router;
