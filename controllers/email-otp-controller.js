import nodemailer from 'nodemailer';
import otp_generator from '../utilities/otp_generator_func.js';
import jwt from 'jsonwebtoken';
import { send_otp_template, verify_otp_file_sending_template } from '../utilities/html_template.js';
import { send_otp_validator_func,otp_data_validator_func } from '../utilities/Validating_func.js';





export const send_otp_func = async (req, res) => {
// const {userEmail,receiverEmail,title}=req.body  
const {userEmail}=req.body  



const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", 
  port: 587,
  secure: false, 
  auth: {
    user:process.env.SMTP_USER ,
    pass:process.env.SMTP_PASSWORD
    
  },
}); 

  

    // ------validations
    let validationStatus =  send_otp_validator_func({userEmail})
    // let validationStatus =  send_otp_validator_func({userEmail,receiverEmail,title})
    console.log(">>>>>",validationStatus)
    if(!validationStatus.success) return res.status(500).json(validationStatus)


    const otp_func_response = otp_generator(userEmail,'40m')        

    const mailOptions = {
      from: '"QuickDrop Support " <noreply@quickdrop.in> ',
      to: userEmail,
      subject: "Testing Nodemailer",
      text: `Your verification code is ${otp_func_response.otp}`,
      html:send_otp_template(otp_func_response.otp)
    };
    
  try {
   await  transporter.sendMail(mailOptions);
  res.status(200).json({
 
        token:otp_func_response.token,
        // otp:otp_func_response.otp,
        message:"OtpSent"
    }) 
  } catch (err) {
    // console.error("Email Error:", err);
    
    res.status(500).json({ message: 'Failed to send email' });
  }
};






export const verify_otp_func=async(req,res)=>{

    const {otp,token,userEmail,receiverEmail,title,message}=req.body
    const files = req.files;

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", 
  port: 587,
  secure: false, 
  auth: {
    user:process.env.SMTP_USER ,
    pass:process.env.SMTP_PASSWORD
    
  },
}); 

    // ------validations-------
    let validationStatus= await otp_data_validator_func({otp,token,userEmail,receiverEmail,title,files})
    console.log(">>>>>",validationStatus)
    if(!validationStatus.success) return res.status(500).json(validationStatus)

    const mailOptions = {
        from: '"QuickDrop Support " <noreply@quickdrop.in>',
        to: receiverEmail,
        replyTo:userEmail,
        subject: "Testing Nodemailer",
        text: title,
        attachments:files.map((item,index)=>{
            return {
                filename: item.originalname,
                content: item.buffer,
                contentType: item.mimetype
            }      
        }),
        html:verify_otp_file_sending_template(title,message)
      };
      
      try {
        const isOtpCorrcet=jwt.verify(token, process.env.JWT_SECRET_KEY)
if(isOtpCorrcet.otp!==Number(otp)) return res.status(200).json({
  success:false,          
  message:"Invalid OTP!"  
})

await  transporter.sendMail(mailOptions);

res.status(200).json({
    success:true,
        message:"File sent successfully!"
    })
      } catch (error) {
        console.log("the error is",error)
        res.status(500).json({success:false, message:"Something went wrong"})
      }
      

}