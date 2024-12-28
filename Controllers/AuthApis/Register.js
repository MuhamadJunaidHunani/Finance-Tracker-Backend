// register user
const registerUser = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const existingUser = await UserModal.findOne({ email });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists"
          : "NickName already exists";
      return res.status(409).json({ message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const fileData = {
      file: req.file.location,
      name: req.file.originalname,
      timestamp: Date.now(),
      type: req.file.mimetype,
    };

    const newUser = new UserModal({
      ...req.body,
      email,
      password: hashedPassword,
      nickName,
      currentWeekPdf: fileData,
      pdfs: [fileData],
    });

    const savedUser = await newUser.save();

    savedUser.password = undefined;

    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error during user registration:", error.message);
    return res
      .status(500)
      .json({ message: "An error occurred during registration." });
  }
};

module.exports = registerUser;
