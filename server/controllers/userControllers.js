const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Post = require("./../models/postModel");

const Register = async (req, res) => {
  try {
    if (req.body && req.file) {
      userData = await req.body;
      const usernameExist = await User.findOne({ username: userData.username });
      if (usernameExist) {
        return res.json({ error: "Username already exists" });
      }
      const emailExist = await User.findOne({ email: userData.email });
      if (emailExist) {
        return res.json({ error: "Email  already exists" });
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        image: req.file.filename,
      });
      user.save();
      return res.json({ message: "User registered successfully" });
    }
  } catch (error) {
    return res.json({ error: "upload image less than 5mb" });
  }
};

const Login = async (req, res) => {
  try {
    if (req.body) {
      const userData = await req.body;
      const data = await User.findOne({
        username: userData.username,
      });
      if (data) {
        const match = await bcrypt.compare(userData.password, data.password);
        if (match) {
          const token = await jwt.sign(
            {
              username: data.username,
              email: data.email,
              followers: data.followers,
              following: data.following,
              image: data.image,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.json({ token: token, message: "Login successfull" });
        } else {
          return res.json({ error: "Invalid username or password" });
        }
      } else {
        return res.json({ error: "Invalid username or password" });
      }
    }
  } catch (error) {
    return res.json({ error: "server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const token = await req.body.token;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return res.json(decoded);
  } catch (error) {
    return res.json({ error: "server error" });
  }
};

const getUserData = async (req, res) => {
  try {
    const username = await req.params.username;
    const userdata = await User.findOne(
      { username },
      { username: 1, image: 1, email: 1, _id: 0 }
    );
    const userPostData = await Post.find(
      { username },
      { __v: 0, username: 0, userid: 0 }
    );
    const DATA = { userdata, userPostData };
    return res.json({ user: DATA });
  } catch (error) {
    return res.json({ error: "server error" });
  }
};

module.exports = { Register, Login, getUser, getUserData };
