var myDB = require('../models/user.model');

exports.dangnhap = async (req,res,next)=> {

    if(req.method == 'POST'){
        try {
            let objU = await myDB.userModel.findOne({ username : req.body.username});
            console.log(objU.username);
            if(objU != null){
                if(objU.passwd == req.body.passwd){
                    if(req.body.username == 'admin'){
                        // req.session.userLogin = objU;
                    return res.redirect('/admin/sanpham/home');
                    }else {
                        return res.redirect('/khach/sanpham/home')
                    }
                    
                }else{

                }
            }else {

            }
        } catch (error) {
            
        }
    }

    res.render('adminuser/index');
}

exports.dangky =async (req,res,next) => {
    let msg = '';
    let msg1 = '';
    if(req.method == 'POST'){
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
    res.render('adminuser/dangky', {msg : msg,msg1 : msg1});

}

exports.thongtin =async (req,res,next) => {
    let msg = '';
    let msg1 = '';
    let listUser = await myDB.userModel.find();
    if(req.method == 'POST'){
        let objThongTin = new myDB.userModel();
        objThongTin.id = req.body.id;
        objThongTin.username = req.body.username;
     
      
      
    }
    res.render('adminuser/thongtin', {msg : msg,msg1 : msg1, listUser : listUser});

}
