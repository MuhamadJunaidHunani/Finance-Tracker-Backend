const { generateOTPVerificationTemplate } = require("./EmailHtmlTemplate");
const sendEmail = require("./EmailSender");

const OTPVerification = async (user, otp) => {
  await sendEmail(
    user.email,
    `OTP Verification`,
    generateOTPVerificationTemplate(user, otp)
  );
};

module.exports = { OTPVerification };
