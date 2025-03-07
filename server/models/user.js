const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    isEditAllowed: {
      type: Boolean,
      default: false,
    },
    editAllotedArticle: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
