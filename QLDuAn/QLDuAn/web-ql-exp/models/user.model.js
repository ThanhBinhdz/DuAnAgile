var db =  require('./db');

const userSchema = new db.mongoose.Schema(
    {
        username : {type : String , required : true},
        passwd : {type : String , required : true},
        sdt : {type : String, required : false},
        gioitinh : {type : String , required : false},
        hoten : {type : String,required : false},
        diachi : {type : String ,required : false}
    },
    {
        collection : 'db_user'
    }
)
let userModel = db.mongoose.model('userModel',userSchema);
module.exports = {userModel};