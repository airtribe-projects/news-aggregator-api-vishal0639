const validateBody = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const { username, password } = req.body;

    if (
      !username ||
      typeof username !== "string" ||
      username.trim() === "" ||
      !isNaN(username)
    ) {
      return res
        .status(400)
        .json({ message: "Username should be a non-empty string" });
    }

    if ((!password && typeof password !== "string") || password.trim() === "") {
      return res.status(400).json({ message: "Password is required" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = validateBody;
