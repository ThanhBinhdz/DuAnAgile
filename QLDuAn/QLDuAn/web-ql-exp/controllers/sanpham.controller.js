var myDB = require('../models/sanpham.model');
var fs = require('fs');

exports.home = async (req, res, next) => {
    let dieu_Kien = null;
    let filterByCate = null;
    if (req.query.cate_id) {
        filterByCate = {
            _id: req.query.cate_id,
        };
    }
    
    if (typeof (req.query.tensp) != 'undefined') {
        dieu_Kien = { tensp: new RegExp('.*' + req.query.tensp + '.*') };
    }
    var list = await myDB.spModel.find(dieu_Kien).populate('idloai');

    var listProductByCateId = await myDB.loaiModel
        .findOne(filterByCate)
        .populate("products").lean();


    var listLoai = await myDB.loaiModel.find();
    if (req.method == 'POST') {
        let objLoai = new myDB.loaiModel();
        objLoai.tenloai = req.body.tenloai;
        try {
            await objLoai.save();
            res.redirect('/admin/sanpham/home');
        } catch (error) {
            console.log(error);
        }
    }
   
    res.render('adminsanpham/home', {
        list: list,
        listLoai: listLoai
    });
}
exports.loctheoLoai = async (req,res,next) => {

    var listLoai = await myDB.loaiModel.find();
    let idloai = req.params.idloai;
    
    let dieu_kien_loc = {idloai : idloai};
    if (typeof (req.query.tensp) != 'undefined') {
        dieu_kien_loc = { tensp: new RegExp('.*' + req.query.tensp + '.*') };
    }


   
     var list = await myDB.spModel.find(dieu_kien_loc).populate('idloai');

    res.render('adminsanpham/home',{list : list , listLoai : listLoai} );

}

exports.giatientang = async (req,res,next)=> {

    var listLoai = await myDB.loaiModel.find();



    var list = await myDB.spModel.find().sort( {giatien : 1}).populate('idloai');

    

    res.render('adminsanpham/home', { list : list, listLoai : listLoai});
}
exports.giatiengiam = async (req,res,next)=> {

    var listLoai = await myDB.loaiModel.find();



    var list = await myDB.spModel.find().sort( {giatien : -1}).populate('idloai');

    

    res.render('adminsanpham/home', { list : list, listLoai : listLoai});
}






exports.addsp = async (req, res, next) => {
    var listLoai = await myDB.loaiModel.find();
    if (req.method == 'POST') {
        fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
        let objSP = new myDB.spModel();
        objSP.tensp = req.body.tensp;
        objSP.image = '/uploads/' + req.file.originalname;
        objSP.mota = req.body.mota;
        objSP.giatien = req.body.giatien;
        objSP.idloai = req.body.idloai;
        try {
            await objSP.save();
            res.redirect('/admin/sanpham/home');
        } catch (error) {
            console.log(error);
        }
    }

    res.render('adminsanpham/addsanpham', { listLoai: listLoai });
}
exports.editsp = async (req, res, next) => {
    let listTL = await myDB.loaiModel.find();
    let idsp = req.params.idsp;
    let objSP = await myDB.spModel.findById(idsp);


    if (req.method == 'POST') {
        fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
        let objSP = new myDB.spModel();
        objSP.tensp = req.body.tensp;
        objSP.mota = req.body.mota;
        objSP.giatien = req.body.giatien;
        objSP.idloai = req.body.idloai;
        objSP.image = '/uploads/' + req.file.originalname;

        objSP._id = idsp;

        try {
            await myDB.spModel.findByIdAndUpdate({ _id: idsp }, objSP);
            msg = 'da sua thanh cong';
            res.redirect('/admin/sanpham/home');
        } catch (error) {
            msg = 'loi';
            console.log(error);
        }
    }




    res.render('adminsanpham/edit', { listTL: listTL, objSP: objSP });
}
exports.deleteSP = async (req, res, next) => {
    let idsp = req.params.idsp;
    let list = await myDB.spModel.findById(idsp);
    // binhcc

    res.render('adminsanpham/xoaSP', { list: list });
}
exports.xacnhandeleteSP = async (req, res, next) => {
    let idsp = req.params.idsp;
    try {
        await myDB.spModel.findByIdAndDelete(idsp, req.body);
        return res.redirect('/admin/sanpham/home');
    } catch (error) {
        console.log(error);
    }
    res.render('adminsanpham/home');
}




exports.editloai = async (req, res, next) => {

    let idLoai = req.params.idloai;
    let objLoai = await myDB.loaiModel.findById(idLoai);

    if (req.method == 'POST') {
        let objLoai = new myDB.loaiModel();
        objLoai.tenloai = req.body.tenloai;
        objLoai._id = idLoai;
        try {
            await myDB.loaiModel.findByIdAndUpdate({ _id: idLoai }, objLoai);
            res.redirect('/admin/sanpham/home');
        } catch (error) {

        }
    }


    res.render('adminsanpham/editLoai', { objLoai: objLoai });
}
exports.deleteLoai = async (req, res, next) => {
    let idloai = req.params.idloai;
    let list = await myDB.loaiModel.findById(idloai);


    res.render('adminsanpham/xoaLoai', { list: list });
}
exports.xacnhandeleteLoai = async (req, res, next) => {
    let idloai = req.params.idloai;
    try {
        await myDB.loaiModel.findByIdAndDelete(idloai, req.body);
        return res.redirect('/admin/sanpham/home');
    } catch (error) {
        console.log(error);
    }
    res.render('adminsanpham/home');
}