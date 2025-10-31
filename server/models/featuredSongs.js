const mongoose = require("mongoose");

const featuredSongsSchema = new mongoose.Schema(
  {
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FeaturedSongsModel = mongoose.model(
  "featured_songs",
  featuredSongsSchema
);
module.exports = FeaturedSongsModel;
