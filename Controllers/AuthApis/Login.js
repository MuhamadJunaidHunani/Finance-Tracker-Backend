const UserModel = require("../../Models/UserModel");
const { compareHash } = require("../../Utils/BCrypt");
const generateJwtToken = require("../../Utils/GenerateJwt");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user || !(await compareHash(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    user.password = undefined;
    const token = generateJwtToken({ email });
    return res.json({
      message: "Logged In Successfully",
      data: user.toObject(),
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = loginUser;
