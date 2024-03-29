var myDB = require('../models/user.model');

exports.dangnhap = async (req, res, next) => {

    if (req.method == 'POST') {
        try {
            let objU = await myDB.userModel.findOne({ username: req.body.username });
            console.log(objU.username);
            if (objU != null) {
                if (objU.passwd == req.body.passwd) {
                    if (req.body.username == 'admin') {
                        req.session.userLogin = objU;
                        console.log(req.session.userLogin);
                        return res.redirect('/admin/sanpham/home');
                    } else {
                        req.session.userLogin = objU;
                        console.log(req.session.userLogin);
                        return res.redirect('/khach/sanpham/home')
                    }

                } else {

                }
            } else {

            }
        } catch (error) {

        }
    }

    res.render('adminuser/index');
}

exports.dangky = async (req, res, next) => {
    let msg = '';
    let msg1 = '';
    if (req.method == 'POST') {
        let objUser = new myDB.userModel();
        objUser.username = req.body.username;
        objUser.passwd = req.body.passwd;
        try {
            await objUser.save();
            msg = 'Da them thanh cong';
            res.redirect('/');
        } catch (error) {
            msg = 'loi';
            console.log(error);
        }
    }
    res.render('adminuser/dangky', { msg: msg, msg1: msg1 });

}

exports.thongtin = async (req, res, next) => {
    let dieu_Kien = null;

    if (typeof (req.query.username) != 'undefined') {
        dieu_Kien = { username: new RegExp('.*' + req.query.username + '.*') };
    }
    var username = req.session.userLogin.username;
    let msg = '';
    let msg1 = '';
    let listUser = await myDB.userModel.find(dieu_Kien);
   
    res.render('adminuser/thongtin', { msg: msg, msg1: msg1, listUser: listUser, username: username });

}
exports.doimk = async (req,res,next) =>{
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
            let objMK = new myDB.userModel();
            objMK.passwd = req.body.passwd1;
    
            objMK._id = req.session.userLogin._id;
            try {
                await myDB.userModel.findByIdAndUpdate({ _id: req.session.userLogin._id }, objMK);
                msg = "Đổi mật khẩu thành công";
                res.redirect('/')
            } catch (error) {
                msg = "loi"
                console.log(error);
            }
        }
      



    }
    res.render('adminuser/doimk', {msg : msg});
}



exports.deleteTK = async (req, res, next) => {
    let id = req.params.id;
    let list = await myDB.userModel.findById(id);


    res.render('adminuser/xoatk', { list: list });
}
exports.xacnhandeleteTK = async (req, res, next) => {
    let id = req.params.id;
    try {
        await myDB.userModel.findByIdAndDelete(id, req.body);
        return res.redirect('/thongtin');
    } catch (error) {
        console.log(error);
    }
    res.render('adminuser/xoatk');
}

