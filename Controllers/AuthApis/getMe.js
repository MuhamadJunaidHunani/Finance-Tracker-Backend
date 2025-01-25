const UserModel = require("../../Models/UserModel");

const getMe = async (req, res) => {
  try {
    const { userId } = req.query;

    const currentUser = await UserModel.find({ _id: userId });
    currentUser.password = undefined;
    res.status(200).json({
      message: "fetched successfully.",
      data: currentUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error. Unable to fetch data.",
      error: error.message,
    });
  }
};

module.exports = getMe;
