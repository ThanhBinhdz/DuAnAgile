var myDB = require('../models/sanpham.model');
var fs = require('fs');

exports.home = async (req, res, next) => {
    let dieu_Kien = null;

    if (typeof (req.query.tensp) != 'undefined') {
        dieu_Kien = { tensp: new RegExp('.*' + req.query.tensp + '.*') };
    }
    var list = await myDB.spModel.find(dieu_Kien).populate('idloai');

    var listLoai = await myDB.loaiModel.find();
    if (req.method == 'POST') {
        let objLoai = new myDB.loaiModel();
        objLoai.tenloai = req.body.tenloai;
        try {
            await objLoai.save();
            res.redirect('/khach/sanpham/home');
        } catch (error) {
            console.log(error);
        }
    }
   
    res.render('khachsanpham/khachlist', {
        list: list,
        listLoai: listLoai
    });
}
exports.loctheoLoai = async (req,res,next) => {

    var listLoai = await myDB.loaiModel.find();
    let idloai = req.params.idloai;

    let dieu_kien_loc = {idloai : idloai};

     var list = await myDB.spModel.find(dieu_kien_loc).populate('idloai');

    res.render('adminsanpham/home',{list : list , listLoai : listLoai} );

}


