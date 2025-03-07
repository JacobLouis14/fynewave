const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    for: { type: String, required: true, unique: true },
    emails: [{ type: String, default: [] }],
  },
  { timestamps: true }
);

const newsletterModal = mongoose.model("newsletter", newsletterSchema);
module.exports = newsletterModal;
