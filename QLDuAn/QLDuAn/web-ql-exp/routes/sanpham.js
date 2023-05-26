var express = require('express');
var multer = require('multer');
var router = express.Router();
var spCtrl = require('../controllers/sanpham.controller');
var upload = multer({ dest : './tmp'});


router.get('/home',spCtrl.home );
router.post('/home',spCtrl.home );


router.get('/addsp',spCtrl.addsp);
router.post('/addsp',upload.single('image'),spCtrl.addsp);

router.get('/home/:idloai',spCtrl.loctheoLoai);



router.get('/editSP/:idsp',spCtrl.editsp );
router.post('/editSP/:idsp',upload.single('image'),spCtrl.editsp );

router.get('/deleteSP/:idsp',spCtrl.deleteSP);
router.delete('/deleteSP/:idsp',spCtrl.deleteSP);
router.get('/xacnhandeleteSP/:idsp',spCtrl.xacnhandeleteSP);
router.delete('/xacnhandeleteSP/:idsp',spCtrl.xacnhandeleteSP);


router.get('/editLoai/:idloai',spCtrl.editloai );
router.post('/editLoai/:idloai',spCtrl.editloai );
router.get('/deleteLoai/:idloai',spCtrl.deleteLoai);
router.delete('/deleteLoai/:idloai',spCtrl.deleteLoai);
router.get('/xacnhandeleteLoai/:idloai',spCtrl.xacnhandeleteLoai);
router.delete('/xacnhandeleteLoai/:idloai',spCtrl.xacnhandeleteLoai);


module.exports = router;
