const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}

    title: String,
    body: String,
    pictureUrl:  {type: String, default: 'https://media.istockphoto.com/photos/fitness-woman-working-out-on-yoga-mat-picture-id863580848?k=6&m=863580848&s=612x612&w=0&h=K5TiwcZGhoA-H2X8cyG_671JAnVj1lAxGc-0MWQKdTo=s'},
    author: String,
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    // keeps record when is created and updated
    timestamps: true,
  }
);

// const blogPost = model('blogPost', blogPostSchema);
// module.exports = blogPost;

module.exports = model("blogPost", blogPostSchema);
