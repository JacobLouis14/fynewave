const mongoose = require("mongoose");

const landingSchema = new mongoose.Schema(
  {
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles",
      required: true,
    },
    cardTitle: {
      type: String,
    },
    categoryTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const LandingModel = mongoose.model("landing_cards", landingSchema);
module.exports = LandingModel;
