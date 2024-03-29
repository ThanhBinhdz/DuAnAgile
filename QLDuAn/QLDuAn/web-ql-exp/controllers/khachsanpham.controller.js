const { log } = require('console');
var myDB = require('../models/sanpham.model');
var myDB1 = require('../models/user.model');
var fs = require('fs');

exports.home = async (req, res, next) => {
    let dieu_Kien = null;

    if (typeof (req.query.tensp) != 'undefined') {
        dieu_Kien = { tensp: new RegExp('.*' + req.query.tensp + '.*') };
    }
    var list = await myDB.spModel.find(dieu_Kien).populate('idloai');
    var demlist = await myDB.spModel.find().count();
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
    console.log(list);
    res.render('khachsanpham/khachlist', {
        list: list,
        listLoai: listLoai,
        demlist: demlist
    });
}
exports.loctheoLoai = async (req,res,next) => {
    
    var listLoai = await myDB.loaiModel.find();
    let idloai = req.params.idloai;
    var demlist = await myDB.spModel.find().count();



    let dieu_kien_loc = {idloai : idloai};
    if (typeof (req.query.tensp) != 'undefined') {
        dieu_kien_loc = { tensp: new RegExp('.*' + req.query.tensp + '.*') };
    }

    var list = await myDB.spModel.find(dieu_kien_loc).populate('idloai');

    res.render('khachsanpham/khachlist',{list : list , listLoai : listLoai , demlist: demlist} );

}

exports.giatientang = async (req,res,next)=> {

    var listLoai = await myDB.loaiModel.find();
    var demlist = await myDB.spModel.find().count();


    var list = await myDB.spModel.find().sort( {giatien : 1}).populate('idloai');

    

    res.render('khachsanpham/khachlist', { list : list, listLoai : listLoai, demlist: demlist});
}


exports.giatiengiam = async (req,res,next)=> {

    var listLoai = await myDB.loaiModel.find();

    var demlist = await myDB.spModel.find().count();

    var list = await myDB.spModel.find().sort( {giatien : -1}).populate('idloai');

    

    res.render('khachsanpham/khachlist', { list : list, listLoai : listLoai, demlist: demlist});
}


exports.chitietsanpham = async (req,res,next) => {

    let idsp = req.params.idsp;
    var listsp = await myDB.spModel.findById(idsp).populate('idloai');
    let listUser = await myDB1.userModel.findOne({ username: req.session.userLogin.username});
    var today = new Date();
    var date = today.getDate()+ '-' + (today.getMonth()+1) + '-' + today.getFullYear();
    let msg = '';
    if (req.method == 'POST') {
        let objDH = new myDB.donhangModel();

        objDH.id_sp = idsp;
        objDH.id_user = listUser._id;
        objDH.soluong = req.body.soluong;
        objDH.giamua = req.body.soluong * (listsp.giatien);
        objDH.ngay_muahang = date;
        objDH.trangthai = 'Đang Xử Lý';
        try {
            await objDH.save();
            msg = 'Đặt hàng thành công'
            
            console.log('Thêm thành công ở đây '+ objDH);
            res.redirect('/khach/sanpham/home');
        } catch (error) {
            console.log(error);
            msg = 'Đặt hàng thất bại ' + error
        }
    }

    
    res.render('khachsanpham/chitietsanpham', {listsp: listsp, msg: msg});

}
exports.thongtinkhach = async (req,res,next)=> {
    var username = req.session.userLogin.username;
    res.render('khachsanpham/thongtinkhach', {username : username});
}
exports.doimkkhach = async (req,res,next) =>{
    let msg = '';
    let msg1 = '';
    if (req.method == 'POST') {
        if(req.body.passwdcu == ""){
            msg = 'Không để trống password cũ';
        }
        else if(req.body.passwd1 == ""){
            msg = 'Không để trống password mới';
        }
        else if(req.body.passwd2 == ""){
            msg = 'Không để trống password mới nhập lại';
        }
        else if(req.body.passwdcu != req.session.userLogin.passwd){
            msg = 'Chưa đúng mật khẩu cũ';
            
        }
        else if (req.body.passwd1 != req.body.passwd2) {
            msg = 'Password không khớp nhau';
            
        }else {
            let objMK = new myDB1.userModel();
            objMK.passwd = req.body.passwd1;
    
            objMK._id = req.session.userLogin._id;
            try {
                await myDB1.userModel.findByIdAndUpdate({ _id: req.session.userLogin._id }, objMK);
                msg = "Đổi mật khẩu thành công";
                res.redirect('/')
            } catch (error) {
                msg = "loi"
                console.log(error);
            }
        }
       



    }
    res.render('khachsanpham/doimkkhach', {msg : msg});
}

exports.donhang = async(req, res, nest) => {
    let msg
    let listUser = await myDB1.userModel.findOne({ username: req.session.userLogin.username});
    let listDonhang = await myDB.donhangModel.find({id_user : req.session.userLogin._id} ).populate('id_sp');

    console.log(listDonhang);
    res.render('khachsanpham/donhangkhach', {listDonhang : listDonhang});
}