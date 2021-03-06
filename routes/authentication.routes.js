const { Router } = require("express");

const router = new Router();

const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const saltRounds = 10;
const passport = require("passport");
const User = require("../models/User.model");
const uploadCloud = require("../configs/cloudinary");

const routeGuard = require("../configs/route-guard.config");

// .post() route ==> to process form data
router.post("/api/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401).json({
      message:
        "All fields are mandatory. Please provide your username, email and password.",
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).json({
      message:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword,
        location: "",
        bio: "",
      })
        .then((user) => {
          // user.passwordHash = undefined;
          // res.status(200).json({ user });
          req.login(user, (err) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Something went wrong with login!" });
            user.passwordHash = undefined;
            res.status(200).json({ message: "Login successful!", user });
          });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            res.status(500).json({ message: err.message });
          } else if (err.code === 11000) {
            res.status(500).json({
              message:
                "Username and email need to be unique. Either username or email is already used.",
            });
          } else {
            next(err);
          }
        });
    })
    .catch((err) => next(err));
});

router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong with database query." });
    }

    if (!user) {
      res.status(401).json(failureDetails);
    }

    req.login(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Something went wrong with login!" });
      user.passwordHash = undefined;
      console.log(req.user);
      res.status(200).json({ message: "Login successful!", user });
    });
  })(req, res, next);
});

router.post("/api/logout", routeGuard, (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Logout successful!" });
});

router.get("/api/isLoggedIn", (req, res) => {
  if (req.user) {
    console.log("here: ", req.user);
    req.user.passwordHash = undefined;
    res.status(200).json({ user: req.user });
    return;
  }
  res.status(401).json({ message: "Unauthorized access!" });
});

router.post("/api/deleteAccount", (req, res, next) => {
  console.log(req.body);
  User.findByIdAndRemove(req.user._id)
    .then((success) => res.status(200).json(success))
    .catch((err) => next(err));
});

router.post(
  "/api/updateProfile/:id",
  //uploadCloud.single("image"),
  (req, res, next) => {
    /*if (!req.file.url) {
      res.status(401).json({
        message:
          "Did you select the right path? Sorry, I can't update your image.",
      });
      return;
    }*/
    console.log(req.user);
    User.findByIdAndUpdate(req.params.id, req.body)
      .then((updatedUser) => {
        console.log(updatedUser);
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
