const allowedCategories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const validateLoginBody = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const { username, password } = req.body;
    let errors = [];

    if (
      !username ||
      typeof username !== "string" ||
      username.trim() === "" ||
      !isNaN(username)
    ) {
      errors.push("username should be a non-empty string");
    } else if (username.trim().length > 50) {
      errors.push("username should not be greater than 50 characters");
    }

    if ((!password && typeof password !== "string") || password.trim() === "") {
      errors.push("password is required");
    } else if (password.length < 5) {
      errors.push("password length should be greater than 5");
    }

    if (errors.length) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const validateRegisterBody = (req, res, next) => {
  try {
    const { username, password, preferences } = req.body;
    let errors = [];

    // Username validation
    if (
      !username ||
      typeof username !== "string" ||
      username.trim() === "" ||
      !isNaN(username)
    ) {
      errors.push("username should be a non-empty string");
    } else if (username.trim().length > 50) {
      errors.push("username should not be greater than 50 characters");
    }

    // Password validation
    if ((!password && typeof password !== "string") || password.trim() === "") {
      errors.push("password is required");
    } else if (password.length < 5) {
      errors.push("password length should be greater than 5");
    }

    // Preferences validation (optional, but if present, must have all 3 valid fields)
    if (preferences !== undefined) {
      if (typeof preferences !== "object" || Array.isArray(preferences)) {
        errors.push("preferences must be an object");
      } else {
        const { category, country, language } = preferences;

        // All 3 fields must exist
        if (
          category === undefined ||
          country === undefined ||
          language === undefined
        ) {
          errors.push(
            "preferences must include category, country, and language"
          );
        } else {
          // category validation
          if (
            typeof category !== "string" ||
            category.trim() === "" ||
            !allowedCategories.includes(category.trim().toLowerCase())
          ) {
            errors.push(
              "preferences.category must be one of the allowed categories"
            );
          }

          // country validation
          if (typeof country !== "string" || country.trim() === "") {
            errors.push("preferences.country must be a non-empty string");
          }

          // language validation
          if (typeof language !== "string" || language.trim() === "") {
            errors.push("preferences.language must be a non-empty string");
          }
        }
      }
    }

    // Send validation errors
    if (errors.length) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const validateUpdatePreferenceBody = (req, res, next) => {
  try {
    const preferences = req.body.preferences || {};
    const { category, country, language } = preferences;
    const errors = [];

    // ✅ Check: At least one field must be provided
    if (!Object.keys(preferences).length) {
      return res.status(400).json({
        error: "Validation failed",
        details: [
          "At least one of category, country, or language must be provided",
        ],
      });
    }

    // ✅ Validate category (if present)
    if (category !== undefined) {
      if (
        typeof category !== "string" ||
        !allowedCategories.includes(category.trim().toLowerCase())
      ) {
        errors.push("category must be one of: " + allowedCategories.join(", "));
      }
    }

    // ✅ Validate country (if present)
    if (country !== undefined) {
      if (typeof country !== "string" || country.trim() === "") {
        errors.push("country must be a non-empty string");
      }
    }

    // ✅ Validate language (if present)
    if (language !== undefined) {
      if (typeof language !== "string" || language.trim() === "") {
        errors.push("language must be a non-empty string");
      }
    }

    if (errors.length) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    next();
  } catch (error) {
    console.error("Preference validation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  validateLoginBody,
  validateRegisterBody,
  validateUpdatePreferenceBody,
};
