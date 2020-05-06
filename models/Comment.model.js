const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}
    // title: String,

    author: { type: Schema.Types.ObjectId, ref: "User" },
    comment: String,
    giphy: String,
    //blog: { type: Schema.Types.ObjectId, ref: "blogPost" }
  },
  {
    timestamps: true,
  }
);

// const Author = model('Author', authorSchema);
// module.exports = Author;

module.exports = model("Comment", commentSchema);
