import nodemailer from "nodemailer";

function sendEmail(name , email , password){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'deepakupadhyay9644@gmail.com',
            pass: 'edsveriqsoqhelsp'
        }
    });
  
    var mailOptions = {
        from: 'deepakupadhyay9644@gmail.com',
        to: email,
        subject: 'Please verify with OTP',
        html: "<h1>hi "+name+" Welcome to eAuction</h1><p>you have successfully register on our site , your login credentials are attached below</p><h3>Username = "+email+"</h3><h3>Password = "+password+"</h3><h2>Click on the link below to verify your account</h2><a href=http://localhost:3000/verify/"+email+">Click here to verify</a>"
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default sendEmail;