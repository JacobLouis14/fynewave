const { default: mongoose } = require("mongoose");
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      index: true,
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
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "pending",
        "rejected",
        "scheduled",
        "deleted",
      ],
      required: true,
      index: true,
    },
    reviewedBy: {
      type: mongosse.Schema.Types.ObjectId,
      ref: "users",
    },
    rejectedReason: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
    group: {
      type: String,
      required: true,
    },
    scheduleJobId: {
      type: String,
    },
    scheduledDate: {
      type: String,
    },
    deleteScheduleJobId: {
      type: String,
    },
    deleteAt: {
      type: String,
    },
  },
  { timestamps: true }
);

articleSchema.index({ author: 1, status: 1 });

const articleModel = mongosse.model("article", articleSchema);
module.exports = articleModel;
