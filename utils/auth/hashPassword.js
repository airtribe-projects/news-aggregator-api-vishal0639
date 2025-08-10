const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

module.exports = hashPassword;
