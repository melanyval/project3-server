// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT
const mongoose = require("mongoose");
const express = require("express");
const commentRouter = express.Router();
const passport = require("passport");
const User = require("../models/User.model");

// ********* require blogPost model
const Comment = require("../models/comment.model");

// ****************************************************************************************
// POST route to create a new
// ****************************************************************************************

// <form action="/authors" method="POST">
commentRouter.post("/api/comment", (req, res, next) => {
  console.log(req.body);
  console.log(req.user);
  let username;
  if (req.user) {
    username = req.user.username;
  } else {
    username = "Guest"
  }
  Comment.create({
    author: username,
    comment: req.body.comment,
    blog: req.body.blog,
  })
    .then((commentDoc) => res.status(200).json(commentDoc))
    .catch((err) => next(err));
});

// ******************************************
// GET all
// *******************************************

commentRouter.get("/api/comment", (req, res, next) => {
  Comment.find() // <-- .find() method gives us always an ARRAY back
    .then((commentFromDB) => res.status(200).json({ blogs: commentFromDB }))
    .catch((err) => next(err));
});

// commentRouter.get("/api/comment/:id", (req, res, next) => {
//   blogPost
//     .findById(req.params.id) // <-- .find() method gives us always an ARRAY back
//     .then((commentFromDB) => res.status(200).json({ blogs: commentFromDB }))
//     .catch((err) => next(err));
// });

module.exports = commentRouter;
