import jwt from 'jsonwebtoken';

const otp_generator = (email,expiry) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    // return otp.toString();

    const token = jwt.sign(
        { email, otp },  // 👉 embed data inside the token
       'my_super_secret_key_123',
        { expiresIn: expiry } // Token is valid for 5 minutes
      );

      return {
        token,otp
      }

  };
  
  export default otp_generator;
  