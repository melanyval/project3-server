// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const blogPostRouter = express.Router();

// ********* require blogPost model
const BlogPost = require("../models/blogPost.model");
const Comment = require("../models/comment.model");

// ****************************************************************************************
// POST route to create a new
// ****************************************************************************************

// <form action="/authors" method="POST">
blogPostRouter.post("/api/blogPost", (req, res, next) => {
  console.log(req.body);
  BlogPost.create(req.body)
    .then((blogPostDoc) => res.status(200).json(blogPostDoc))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET all
// ****************************************************************************************

blogPostRouter.get("/api/blogPost", (req, res, next) => {
  BlogPost.find() // <-- .find() method gives us always an ARRAY back
    .then((blogPostFromDB) => res.status(200).json({ blogs: blogPostFromDB }))
    .catch((err) => next(err));
});

blogPostRouter.get("/api/singleBlogPost/:id", (req, res, next) => {
  BlogPost.findById(req.params.id) // <-- .find() method gives us always an ARRAY back
    .then((blogPostFromDB) => {
      console.log(req.params.id);
      Comment.find({ blog: req.params.id })
        .then((commentFromDB) => {
          console.log(commentFromDB);
          res
            .status(200)
            .json({ blogs: blogPostFromDB, comments: commentFromDB });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

module.exports = blogPostRouter;
