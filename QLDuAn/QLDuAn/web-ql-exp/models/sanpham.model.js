var db =  require('./db');

const spSchema = new db.mongoose.Schema(
    {
        idloai :  {type : db.mongoose.Schema.Types.ObjectId , ref : 'loaiModel'},
        tensp : {type : String , required : true},
        giatien : {type : Number, required : true},
        image : {type : String, required : true},
        mota : {type : String, required : true},
        categories:[
            {
                type : db.mongoose.Schema.Types.ObjectId,
                ref:"loaiModel"
            }
        ]
        
    },
    {
        collection : 'db_sanpham'
    }
);

const loaiSPSchema = new db.mongoose.Schema(
    {
        tenloai :  {type : String , required : true},
        products:[
            {
                type : db.mongoose.Schema.Types.ObjectId,
                ref:"spModel"
            }
        ]
    },
    {
        collection : 'db_loaisp'
    }
)

const donhangSchema = new db.mongoose.Schema(
    {
        soluong : {type : Number , required : true},
        giamua : {type : Number , required : true},
        ngay_muahang : {type : String , required : true},
        trangthai : {type : String , required : true},
        id_user : {type : db.mongoose.Schema.Types.ObjectId , ref : 'userModel'} ,
        id_sp : {type : db.mongoose.Schema.Types.ObjectId , ref : 'spModel'}
    },
    {
        collection : 'db_donhang'
    }
)

let spModel = db.mongoose.model('spModel',spSchema);
let loaiModel = db.mongoose.model('loaiModel',loaiSPSchema);
let donhangModel = db.mongoose.model('donhangModel',donhangSchema);
module.exports = {spModel,loaiModel,donhangModel};