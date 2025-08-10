const registerUser = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
