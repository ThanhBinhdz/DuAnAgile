var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/dathang.controller');
router.get('/',userCtrl.trangchu);
router.post('/',userCtrl.trangchu);

router.get('/tang',userCtrl.giatientang);
router.get('/giam',userCtrl.giatiengiam);
router.get('/:idloai',userCtrl.loctheoLoai);


router.get('/chitietsp/:idsp',userCtrl.chitietsanpham );
router.post('/chitietsp/:idsp',userCtrl.chitietsanpham );

module.exports = router;
