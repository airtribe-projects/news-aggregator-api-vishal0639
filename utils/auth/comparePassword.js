const bcrypt = require("bcrypt");

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

module.exports = comparePassword;
