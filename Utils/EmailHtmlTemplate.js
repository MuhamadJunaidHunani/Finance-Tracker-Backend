const generateOTPVerificationTemplate = (user, otp) => {
  return `<html lang="en">
  <body>
    <div
      style="font-family: Arial, sans-serif; width: 95%; border-radius: 4px; background-color: #ffffff; line-height: 1.5; color: #373e43; border: 1px solid #355CCE; padding: 20px;"
    >
      <div
        style="width: 100%; color:white; background-color: #355CCE; border-bottom: 1px solid #c5c5c592; text-align: center; padding:40px 0;"
      >
        <p style="margin: 0;">
          Thank You For Signing Up
        </p>
        <h1 style="margin: 0;">
          Verify Your Email Address
        </h1>

       
      </div>
      <div
        style="width: 90%; border-radius: 4px; background-color: #f4f4f4; padding: 25px; margin: 20px auto; max-width:600px;"
      >
       <p style="margin: 0;">
          Hi <strong>${user?.name},
        </p>
        <p style="margin: 10px 0; font-weight:500;">
         Please use the follwing One Time Password (OTP)
        </p>
        
        <div style="border:1px solid #355CCE; background-color:#fff; width:160px; text-align:center; letter-spacing:6px; font-size:22px;padding:10px; font-weight:500; color:#355CCE; ">

            ${otp}
        </div>
      </div>

      <div
        style="padding: 20px 10px; font-size: 10px; text-align: center; margin-top: 20px; border-top: 1px solid #355CCE;"
      >
        Copyright ©2025 | All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
};

module.exports = { generateOTPVerificationTemplate };