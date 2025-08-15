require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const newsRoutes = require("./routes/newsRoutes");
const isAuthenticated = require("./middlewares/authMiddleware");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/news", isAuthenticated, newsRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
