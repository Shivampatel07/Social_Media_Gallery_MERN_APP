const expr = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const sess = require("express-session");
const app = expr();
const dotenv = require("dotenv").config();
const cp = require("cookie-parser");
const port = process.env.PORT || 5000;
const path = require("path");
const postRoutes = require("./routes/apiAuthRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.json({}));
app.use(expr.urlencoded({ extended: false }));
app.use(cp());
app.use("/images/avtar", expr.static(path.join(__dirname, "/images/avtar")));
app.use("/images/post", expr.static(path.join(__dirname, "/images/post")));

mongoose
  .connect("mongodb://127.0.0.1:27017/Social-Gallery-App")
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
