const UserModel = require("../../Models/UserModel");
const { compareHash } = require("../../Utils/BCrypt");
const { generateJwtToken } = require("../../Utils/Jwt");

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    if (new Date() > user.otpExpiration) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one.",
        errorCode: "OTP_EXPIRED",
      });
    }

    const isOtpValid = await compareHash(otp, user.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpiration = undefined;
    user.lastOtpSentAt = undefined;
    const savedUser = await user.save();
    const token = generateJwtToken({ _id: savedUser._id });
    res
      .status(200)
      .json({
        message: "Email verified successfully!",
        data: savedUser,
        token,
      });
  } catch (error) {
    res.status(500).json({ message: `something went wrong ${error}` });
  }
};

module.exports = { verifyOtp };
