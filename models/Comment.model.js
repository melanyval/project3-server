const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}
    // title: String,

    author: { type: String, default: "Guest" },
    comment: String,
    // future feature -> giphy: String,
    blog: String,
  },
  {
    timestamps: true,
  }
);

// const Author = model('Author', authorSchema);
// module.exports = Author;

module.exports = model("Comment", commentSchema);
