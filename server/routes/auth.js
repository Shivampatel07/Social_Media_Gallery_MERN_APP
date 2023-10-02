const router = require("express").Router();
const multer = require("multer");
const {
  Register,
  Login,
  getUser,
} = require("./../controllers/userControllers");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/avtar/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 5000000 } });
router.post("/register", upload.single("image"), Register);
router.post("/login", Login);
router.post("/userdata", getUser);

module.exports = router;
