const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const newsletterModal = mongoose.model("newsletter", newsletterSchema);
module.exports = newsletterModal;
