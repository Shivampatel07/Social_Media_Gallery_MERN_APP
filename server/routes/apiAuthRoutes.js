const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {
  uploadPost,
  getPost,
  getAllPost,
  userLikePost,
  userDislikePost,
  getTagPost,
  deletePost,
  deleteUser,
} = require("../controllers/postControllers");

const storage = multer.diskStorage({
  destination: "./images/post/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/uploadpost", upload.single("postimage"), uploadPost);
router.post("/getpost", getPost);
router.get("/getallpost", getAllPost);
router.get("/getallpost/:tag", getTagPost);
router.post("/like", userLikePost);
router.post("/dislike", userDislikePost);
router.post("/deletepost", deletePost);
router.post("/deleteuser", deleteUser);

module.exports = router;
