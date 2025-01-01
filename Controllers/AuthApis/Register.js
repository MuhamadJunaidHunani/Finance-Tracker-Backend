const UserModel = require("../../Models/UserModel");
const { generateHash } = require("../../Utils/BCrypt");
const {generateJwtToken} = require("../../Utils/Jwt");

const registerUser = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await generateHash(password);

    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    savedUser.password = undefined;
    const token = generateJwtToken({ _id: savedUser._id });

    return res
      .status(201)
      .json({ message: "Successfully Registered", data: savedUser, token });
  } catch (error) {
    console.error("Error during user registration:", error.message);
    return res
      .status(500)
      .json({ message: "An error occurred during registration." });
  }
};

module.exports = registerUser;
