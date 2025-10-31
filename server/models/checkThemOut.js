const mongoose = require("mongoose");

const checkThemOutSchema = new mongoose.Schema(
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

const CheckThemOutModel = mongoose.model("check_them_out", checkThemOutSchema);
module.exports = CheckThemOutModel;
