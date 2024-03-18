const multer = require("multer")
const path = require("path")

const photoStorage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null,path.join(__dirname,"../file"))
    },
    filename : function(req,file,cb){
        if(file){
            cb(null, file.originalname)
        }else{
            cb(null,false)
        }
    }
})

const photoUplaod = multer({
    storage : photoStorage,
})

module.exports = photoUplaod