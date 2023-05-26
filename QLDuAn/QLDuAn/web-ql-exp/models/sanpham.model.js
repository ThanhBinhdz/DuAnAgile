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

let spModel = db.mongoose.model('spModel',spSchema);
let loaiModel = db.mongoose.model('loaiModel',loaiSPSchema);

module.exports = {spModel,loaiModel};