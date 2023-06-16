var express = require('express');
var multer = require('multer');
var router = express.Router();
var spCtrl = require('../controllers/sanpham.controller');
var upload = multer({ dest : './tmp'});
var check_login = require('../middlewares/check_login');
router.use ( (req,res,next)=>{
    console.log('middleware');
    next();
});

router.get('/home',check_login.yeu_cau_login,spCtrl.home );
router.post('/home',check_login.yeu_cau_login,spCtrl.home );
router.get('/tang',check_login.yeu_cau_login,spCtrl.giatientang);
router.get('/giam',check_login.yeu_cau_login,spCtrl.giatiengiam);

router.get('/addsp',check_login.yeu_cau_login,spCtrl.addsp);
router.post('/addsp',check_login.yeu_cau_login,upload.single('image'),spCtrl.addsp);

router.get('/home/:idloai',check_login.yeu_cau_login,spCtrl.loctheoLoai);

router.get('/editSP/:idsp',check_login.yeu_cau_login,spCtrl.editsp );
router.post('/editSP/:idsp',check_login.yeu_cau_login,upload.single('image'),spCtrl.editsp );

router.get('/deleteSP/:idsp',check_login.yeu_cau_login,spCtrl.deleteSP);
router.delete('/deleteSP/:idsp',check_login.yeu_cau_login,spCtrl.deleteSP);
router.get('/xacnhandeleteSP/:idsp',check_login.yeu_cau_login,spCtrl.xacnhandeleteSP);
router.delete('/xacnhandeleteSP/:idsp',check_login.yeu_cau_login,spCtrl.xacnhandeleteSP);


router.get('/editLoai/:idloai',check_login.yeu_cau_login,spCtrl.editloai );
router.post('/editLoai/:idloai',check_login.yeu_cau_login,spCtrl.editloai );
router.get('/deleteLoai/:idloai',check_login.yeu_cau_login,spCtrl.deleteLoai);
router.delete('/deleteLoai/:idloai',check_login.yeu_cau_login,spCtrl.deleteLoai);
router.get('/xacnhandeleteLoai/:idloai',check_login.yeu_cau_login,spCtrl.xacnhandeleteLoai);
router.delete('/xacnhandeleteLoai/:idloai',check_login.yeu_cau_login,spCtrl.xacnhandeleteLoai);

router.get('/donhang',check_login.yeu_cau_login,spCtrl.donhang);

router.get('/doitrangthai/:id',check_login.yeu_cau_login,spCtrl.doitrangthai);
router.post('/doitrangthai/:id',check_login.yeu_cau_login,spCtrl.doitrangthai);
module.exports = router;
