const User = require("../models/userModel");
const { hashPassword } = require("../utils/auth");

const registerUser = async (req, res) => {
  try {
    const { username, password, preferences = {} } = req.body;

    const hashedPassword = await hashPassword(password);

    const defaultPreferences = {
      category: null,
      country: null,
      language: null,
    };

    const finalPreferences = { ...defaultPreferences, ...preferences };

    const user = new User(username, hashedPassword, finalPreferences);

    // Optionally: await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        preferences: user.preferences,
      },
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

const getAllPreferences = async (req, res) => {
  try {
    console.log(req.user);
    const user = await user.findById(req.user.id);
    return res.status(200).json({ preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const { category, country, language } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        preferences: {
          category: category.trim().toLowerCase(),
          country: country.trim(),
          language: language.trim(),
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Preferences updated successfully",
      preferences: user.preferences,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllPreferences,
  updatePreferences,
};
