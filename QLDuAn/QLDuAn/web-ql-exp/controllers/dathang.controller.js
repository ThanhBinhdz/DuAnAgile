var myDB1 = require('../models/sanpham.model');

exports.trangchu = async (req, res, next) => {
    let dieu_Kien = null;

    if (typeof (req.query.tensp) != 'undefined') {
        dieu_Kien = { tensp: new RegExp('.*' + req.query.tensp + '.*') };
    }
    var list = await myDB1.spModel.find(dieu_Kien).populate('idloai');
    var demlist = await myDB1.spModel.find().count();
    var listLoai = await myDB1.loaiModel.find();
   
    res.render('adminuser/trangchu', {
        list: list,
        listLoai: listLoai,
        demlist: demlist
    });
}
exports.loctheoLoai = async (req,res,next) => {
    
    var listLoai = await myDB1.loaiModel.find();
    let idloai = req.params.idloai;
    var demlist = await myDB1.spModel.find().count();



    let dieu_kien_loc = {idloai : idloai};
    if (typeof (req.query.tensp) != 'undefined') {
        dieu_kien_loc = { tensp: new RegExp('.*' + req.query.tensp + '.*') };
    }

    var list = await myDB1.spModel.find(dieu_kien_loc).populate('idloai');

    res.render('adminuser/trangchu',{list : list , listLoai : listLoai , demlist: demlist} );

}

exports.giatientang = async (req,res,next)=> {

    var listLoai = await myDB1.loaiModel.find();
    var demlist = await myDB1.spModel.find().count();


    var list = await myDB1.spModel.find().sort( {giatien : 1}).populate('idloai');

    

    res.render('adminuser/trangchu', { list : list, listLoai : listLoai, demlist: demlist});
}


exports.giatiengiam = async (req,res,next)=> {

    var listLoai = await myDB1.loaiModel.find();

    var demlist = await myDB1.spModel.find().count();

    var list = await myDB1.spModel.find().sort( {giatien : -1}).populate('idloai');

    

    res.render('adminuser/trangchu', { list : list, listLoai : listLoai, demlist: demlist});
}


exports.chitietsanpham = async (req,res,next) => {

    let idsp = req.params.idsp;
    var listsp = await myDB1.spModel.findById(idsp).populate('idloai');
    let msg = '';

    res.render('adminuser/chitiettrangchu', {listsp: listsp, msg: msg});

}