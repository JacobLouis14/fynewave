const mongoose = require("mongoose");

const showCasesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: [
        "songs-of-the-week",
        "artists-of-the-week",
        "djs-of-the-week",
        "landing-card",
      ],
      required: true,
    },
    articleIds: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const ShowCasesModel = mongoose.model("ShowCases", showCasesSchema);

module.exports = ShowCasesModel;
