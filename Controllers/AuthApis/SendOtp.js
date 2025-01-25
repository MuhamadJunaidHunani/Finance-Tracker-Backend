const userRegisterValidate = require("../../MiddleWares/UserValidate");
const UserModel = require("../../Models/UserModel");
const { generateHash } = require("../../Utils/BCrypt");
const { OTPVerification } = require("../../Utils/EmailsToSend");
const { generateOtp } = require("../../Utils/OTP");

const sendOtp = async (req, res) => {
  const { email, userName, password, isResend } = req.body;

  try {
    const otp = generateOtp();
    const hashedOtp = await generateHash(otp);
    const otpExpiration = new Date(2 * 60 * 1000 + Date.now());
    const COOLDOWN_PERIOD = 120 * 1000;

    let user = await UserModel.findOne({ email });

    if (user) {
      if (user.verified) {
        return res.status(400).json({ message: "User is already exist." });
      }

      if (isResend) {
        const now = new Date();

        if (user.otpExpiration && now < user.otpExpiration) {
          return res.status(400).json({
            message: "An OTP is already sended. Please wait for it to expire.",
          });
        }

        if (user.lastOtpSentAt && now - user.lastOtpSentAt < COOLDOWN_PERIOD) {
          const remainingTime = Math.ceil(
            (COOLDOWN_PERIOD - (now - user.lastOtpSentAt)) / 1000
          );
          return res.status(400).json({
            message: `Please wait ${remainingTime} seconds before requesting a new OTP.`,
          });
        }
      } else {
        if (!password) {
          return res.status(400).json({
            message: "Password is required.",
          });
        }

        user.password = await generateHash(password, 10);
      }

      user.otp = hashedOtp;
      user.otpExpiration = otpExpiration;
      user.lastOtpSentAt = new Date();
    } else {
      const validationResponse = userRegisterValidate(req, res);
      if (validationResponse) return validationResponse;

      user = new UserModel({
        email,
        password: await generateHash(password, 10),
        userName,
        otp: hashedOtp,
        otpExpiration,
        lastOtpSentAt: new Date(),
      });
    }
    const savedUser = await user.save();
    await OTPVerification(savedUser, otp);
    res.status(200).json({ message: "OTP successfully sent to your email!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendOtp };
