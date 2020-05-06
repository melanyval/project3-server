const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}

    title: String,
    body: String,
    pictureUrl: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    // keeps record when is created and updated
    timestamps: true,
  }
);

// const blogPost = model('blogPost', blogPostSchema);
// module.exports = blogPost;

module.exports = model("blogPost", blogPostSchema);
