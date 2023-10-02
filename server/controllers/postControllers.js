const Post = require("../models/postModel");
const User = require("../models/userModel");

const uploadPost = async (req, res) => {
  try {
    if (req.body && req.file) {
      const postData = await req.body;
      const userid = await User.findOne({ username: postData.username });
      if (userid) {
        const post = new Post({
          avtar: postData.avtar,
          userid: userid._id,
          username: postData.username,
          postimage: req.file.filename,
          posttitle: postData.posttitle,
          arttag: postData.arttag,
          lifestyletag: postData.lifestyletag,
          naturetag: postData.naturetag,
          technologytag: postData.technologytag,
        });
        post.save();
        return res.json({ message: "Post uploaded successfully" });
      }
      return res.json({ error: "User not exist" });
    } else {
      return res.json({ error: "Re-upload the post" });
    }
  } catch (error) {
    return res.json({ error: "error occured" });
  }
};

const getPost = async (req, res) => {
  try {
    const username = req.body.username;
    if (username) {
      const posts = await Post.find({ username: username });
      if (posts) {
        return res.json({ posts: posts });
      } else {
        return res.json({ error: "No posts" });
      }
    } else {
      return res.json({ error: "User not exist" });
    }
  } catch (error) {
    return res.json({ error: "error occured" });
  }
};
const getAllPost = async (req, res) => {
  try {
    const postData = await Post.find({}, { userid: 0 }).sort({ createdAt: -1 });
    if (postData) {
      return res.json({ posts: postData });
    } else {
      return res.json({ error: "No posts" });
    }
  } catch (error) {
    return res.json({ error: "error occured" });
  }
};

const userLikePost = async (req, res) => {
  try {
    if (req.body) {
      const { likedUser, postid } = req.body;
      const result = await Post.updateOne(
        { _id: postid },
        {
          $push: { likes: likedUser },
        }
      );
      return res.json({ message: true });
    }
  } catch (error) {
    res.json({ error: "error occured" });
  }
};

const userDislikePost = async (req, res) => {
  try {
    if (req.body) {
      const { likedUser, postid } = req.body;
      const result = await Post.updateOne(
        { _id: postid },
        {
          $pull: { likes: likedUser },
        }
      );

      return res.json({ message: true });
    }
  } catch (error) {
    res.json({ error: "error occured" });
  }
};

const getTagPost = async (req, res) => {
  try {
    const tag = req.params.tag;
    const postData = await Post.find({ [tag]: true }, { userid: 0 }).sort({
      createdAt: -1,
    });
    if (postData) {
      return res.json({ posts: postData });
    } else {
      return res.json({ error: "No posts" });
    }
  } catch (error) {
    return res.json({ error: "error occured" });
  }
};
const deletePost = async (req, res) => {
  try {
    const id = req.body.id;
    const result = await Post.deleteOne({ _id: id });
    if (result) {
      return res.json({ message: "Post deleted successfully" });
    } else {
      return res.json({ error: "No posts" });
    }
  } catch (error) {
    return res.json({ error: "error occured" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const username = await req.body.username;
    await Post.deleteMany({ username: username });
    await User.deleteOne({ username: username });
    const result = await Post.updateMany(
      {},
      {
        $pull: { likes: username },
      }
    );
    console.log(user);
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.json({ error: "error occured" });
  }
};

module.exports = {
  uploadPost,
  getPost,
  getAllPost,
  userLikePost,
  userDislikePost,
  getTagPost,
  deletePost,
  deleteUser,
};
