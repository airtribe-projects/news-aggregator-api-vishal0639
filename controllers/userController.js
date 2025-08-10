const User = require("../models/User");
const { hashPassword } = require("../utils/auth");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = new User(username, hashedPassword);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;

    const user = User.findByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken(user.id);

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username, token },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
