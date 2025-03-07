const mongosse = require("mongoose");

const articleSchema = new mongosse.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    articleContentOne: {
      type: String,
      required: true,
    },
    articleContentTwo: {
      type: String,
      required: true,
    },
    articleContentThree: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    banner: {
      type: String,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
    },
    songsIframes: {
      type: Array,
      default: [],
    },
    videoIframes: {
      type: Array,
      default: [],
    },
    alternativeTitle: {
      type: String,
    },
    articleContentImage: {
      type: String,
    },
    articleContentInstagram: {
      type: String,
    },
    isSongOfTheWeek: {
      type: Boolean,
      default: false,
    },
    isArtistOfTheWeek: {
      type: Boolean,
      default: false,
    },
    isDjOfTheWeek: {
      type: Boolean,
      default: false,
    },
    isLandingCard: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const articleModel = mongosse.model("article", articleSchema);
module.exports = articleModel;
