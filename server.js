const express = require('express');
let nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const creds = require('./credential.json');
const router = require('./routes/router');
const cookiParser = require("cookie-parser")
require("./db/conn");

let app = express();

 const path = require('path');
 app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(cookiParser());
// app.use(cors());
app.use(router)

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

 /**nodemailer transpoter */
 let transpoter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 587,
   secure: false,
    auth: {
        user: creds.auth.user,
        pass: creds.auth.pass
    }
 })

 app.get('/',  (req, res) => {
    res.send('Hello World')
  })

app.post('/mail', (req, res, next) => {
    var email = req.body.email
    var message = req.body.message
    var subject = req.body.subject
    var name = req.body.name
    var company = req.body.company

    const mailOptions = {
        from: name,
        to: email,
        subject: subject,
        html: `${name} from ${company} <noreplay@${name}.com> <br /> ${message}`
    }

    transpoter.sendMail(mailOptions, (err, data) => {
        if(err){
            res.json({
                status: err
            })
            console.log(err)
        }
        else{
            res.json({
                status: "success"
            })
            console.log("Email Sent"+ data.response)
        }
    })
})
    transpoter.verify(function(err, success) {
        if(err){
            console.log(err)
        }
        else{
            console.log("Server is ready to take email")
        }
    })

 const PORT =process.env.PORT || 8000

 app.listen(PORT, ()=> {
    console.info(`Server started ${PORT}`)
 });

//  const express=require('express');
// const app=express();
// const router = require('./routes/router');
// const cookiParser = require("cookie-parser")
// require("./db/conn");
// const cors=require("cors");
// const PORT=7000;




// app.get('/',(req,res)=>{}
//     res.status(200).json("server started");
// });

// app.use(express.json());
// app.use(cookiParser());
// app.use(cors());
// app.use(router)

// app.listen(PORT,()=>
// {

//     console.log(`server startted running on port ${PORT}`);
// });




// let express = require('express');
// let app = express();
// let nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const creds = require('./credential.json');

// const path = require('path');
// const router = express.Router()

// // Static folder
// app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// let transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", 
//     port: 587,
//     secure: false,
//   // service: 'Gmail',
//   auth: {
//     user: creds.auth.user,
//     pass: creds.auth.pass 
//   },
// });

// app.post('/mail', (req, res, next) => {
//     var email = req.body.email
//     var message = req.body.message
//     var subject = req.body.subject
//     var name = req.body.name
//     var company = req.body.company

    // const mailOptions = {
    //     from :  name,
    //     to : email,
    //     subject: subject,
    //     html: `${name} from ${company} <noreply@${name}.com> <br /><br /> ${message}`
    // }

//     transporter.sendMail(mailOptions, (err, data) => {
//         if(err){
//             res.json({
//                 status:"err"
//             }) 
//             console.log(err)
//             }
//             else {
//                 res.json({
//                     status: "success"
//          })
//          console.log("Email Sent" + data.response)
//         }
//     })
// })

// transporter.verify(function(error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages!");
//     }
//   });

// // serve PORT running here
// const PORT = process.env.PORT || 8080
// app.listen(PORT, () => console.info(`server has started on ${PORT}`))

/*** ------------------------------------ */


/**server listen with port number */
// app.listen(PORT,() => {
//   console.log(`Server started.....`)
// })

/** ------------------------------ */



// const express = require('express');
// const appRoute = require('./routes/route.js')
// // const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 8000;

// app.use(express.json());

// // app.use(bodyParser.json()) // for parsing application/json
// // app.use(bodyParser.urlencoded({ extended: true }))

// /** routes */
// app.use('/api', appRoute);

// /** server listen with port */
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`)
// });