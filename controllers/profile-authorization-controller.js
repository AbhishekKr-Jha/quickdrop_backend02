
import jwt from 'jsonwebtoken';

export const verify_profile_otp_func=async(req,res)=>{
    const {otp,token}=req.body   
        try {
          const isOtpCorrcet=jwt.verify(token, process.env.JWT_SECRET_KEY)
  if(isOtpCorrcet.otp!==Number(otp)) return res.status(200).json({
    success:false,
    message:"Invalid OTP!"
  })
  
  
  res.status(200).json({
      success:true,
          message:"Otp Verified Successfully!"
      })
        } catch (error) {
          console.log("the error is",error)
          res.status(500).json({success:false, message:"Something went wrong"})
        }


}

