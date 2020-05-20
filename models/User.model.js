const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      // unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      // unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    // User roles
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    location: {
      type: String
    },
    bio: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);