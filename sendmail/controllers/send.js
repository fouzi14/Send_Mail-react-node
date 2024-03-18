const nodemailer = require("nodemailer");
const xlsx = require('xlsx')
module.exports.test = async(req,res)=>{
    if(!req.files){
        return res.status(404).json({message :  "file not found"})
    }
    attachements = []
    req.files.map(file=>{
       
        attachements.push({filename : file.mimetype.replace("/",'.'),
                           path : `./file/${file.originalname}` })
    })
    console.log(attachements);
    res.status(200).json({message : 'seccuss'})
}


module.exports.send = async(req,res)=>{

    if(!req.files){
        return res.status(404).json({message :  "file not found"})
    }
    let attachements = []
    req.files.map(file=>{
       
        attachements.push({filename : file.mimetype.replace("/",'.'),
                           path : `./file/${file.originalname}` })
    })
    xl = attachements[0]
    console.log('xl',xl);
    let workbook = xlsx.readFile(xl.path)
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]
    console.log(worksheet.B1);
    var clients = []
    for(let cell in worksheet){
        const value = worksheet[cell].v
        if(value){
            console.log(value);
            clients.push(`${value}`)
        }
    }
    console.log(clients);
    attachements.shift()
    console.log(attachements);
    const transporter = nodemailer.createTransport({

       host: "smtp.gmail.com",
       port: 465,
       secure: true,
       auth: {
       user: "fouzi0962@gmail.com",
       pass: "rmll fvmn jmkr ychw",
     },
   });
   clients.map(client=>{

    
    let info ={
        from: 'fouzi0962@gmail.com',
        to: client, 
        subject: req.body.title,
        text: req.body.text,
        attachments : attachements
        
      };
    
    transporter.sendMail(info , (error , info)=>{
        if(error){
            console.log( 'hhhhhhhh' ,error);
        }else{
            res.status(200).json({message : ' send mailer'})
        }
    }) 

   })
}

