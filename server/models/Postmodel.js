const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserData",
    },
    avtar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    postimage: {
      type: String,
      required: true,
    },
    posttitle: {
      type: String,
      required: true,
    },
    arttag: {
      type: Boolean,
      default: false,
    },
    lifestyletag: {
      type: Boolean,
      default: false,
    },
    naturetag: {
      type: Boolean,
      default: false,
    },
    technologytag: {
      type: Boolean,
      default: false,
    },

    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
mongoose.pluralize(null);
module.exports = mongoose.model("Posts", PostSchema);
