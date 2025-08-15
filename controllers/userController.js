const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/auth");
const fs = require("fs");
const path = require("path");
const { createToken } = require("../utils/jwtUtils");

const USERS_FILE = path.join(__dirname, "../user.json");

// Note:readFileAsync and writeFileAsync is not working
const getUsersData = () => {
  try {
    const rawData = fs.readFileSync(USERS_FILE, "utf-8");
    const parsed = JSON.parse(rawData);

    // ✅ Make sure you return the `users` array
    return parsed.users || [];
  } catch (err) {
    console.error("Failed to read users.json:", err);
    return []; // fallback to empty array
  }
};

const saveUsersData = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write users.json:", err);
    throw err;
  }
};
const users = getUsersData();

const registerUser = async (req, res) => {
  try {
    const { username, password, preferences = {} } = req.body;
    const isExistingUser = users.find((user) => (user.name = username));
    if (isExistingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }
    const hashedPassword = await hashPassword(password);

    const defaultPreferences = {
      category: null,
      country: null,
      language: null,
    };

    const finalPreferences = { ...defaultPreferences, ...preferences };

    const user = new User(username, hashedPassword, finalPreferences);
    console.log(user, "user");
    console.log(users, "users");
    users.push(user);

    fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find((user) => user.username == username);

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
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPreferences = async (req, res) => {
  try {
    console.log(req.user);
    const user = users.find((user) => (user.id = req.user.userId));
    return res.status(200).json({ preferences: user.preferences });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { preferences = {} } = req.body;
    const { category, country, language } = preferences;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = users.find((u) => u.id === userId);

    const updatedPrefs = {};
    if (category) updatedPrefs.category = category.trim().toLowerCase();
    if (country) updatedPrefs.country = country.trim();
    if (language) updatedPrefs.language = language.trim();

    user.preferences = {
      ...user.preferences,
      ...updatedPrefs,
    };
    user.updatedAt = new Date().toISOString();

    // const userIndex = users.findIndex((user) => user.id === userId);

    // users[userIndex] = user;
    saveUsersData(users);

    return res.status(200).json({
      message: "Preferences updated successfully",
      preferences: user.preferences,
    });
  } catch (err) {
    console.error("Failed to update preferences:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllPreferences,
  updatePreferences,
};
