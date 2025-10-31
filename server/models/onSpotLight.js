const mongoose = require("mongoose");

const onSpotLightSchema = new mongoose.Schema(
  {
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles",
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OnSpotLightModel = mongoose.model("on_spot_lights", onSpotLightSchema);
module.exports = OnSpotLightModel;
