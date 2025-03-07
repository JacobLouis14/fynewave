const express = require("express");
const { checkIsAuthorized } = require("../middlewares/isAuthorized");
const router = express.Router();
const multer = require("multer");
const {
  deleteSongOfTheWeekController,
  deleteArtistOfTheWeekController,
  getAllSongsOfTheWeek,
  getAllArtistOfTheWeek,
  getAllDjsOfTheWeek,
  deleteDjOfTheWeekController,
  updateSongsOfTheWeekController,
  updateArtistOfTheWeekController,
  updateDjsOfTheWeekController,
  getAllLandingCards,
  updateLandingCardsController,
  deleteLandingCardsController,
} = require("../controllers/showcases");
const upload = multer({
  storage: multer.memoryStorage(),
});

// get all songs of the week
router.get("/get-songs-of-the-week", getAllSongsOfTheWeek);

// add songs of the week
router.put(
  "/add-songs-of-the-week/:articleId",
  checkIsAuthorized,
  updateSongsOfTheWeekController
);

// delete songs of the week
router.delete(
  "/delete-add-songs-of-the-week/:id",
  //   checkIsAuthorized,
  deleteSongOfTheWeekController
);

////////////////////////artist of the week

// get all atrist of the week
router.get("/get-artists-of-the-week", getAllArtistOfTheWeek);

// add artist of the week
router.put(
  "/add-artist-of-the-week/:articleId",
  checkIsAuthorized,
  updateArtistOfTheWeekController
);

// delete artist of the week
router.delete(
  "/delete-artist-of-the-week/:id",
  //   checkIsAuthorized,
  deleteArtistOfTheWeekController
);

////////////////////////djs of the week

// get all atrist of the week
router.get("/get-djs-of-the-week", getAllDjsOfTheWeek);

// add djs of the week
router.put(
  "/add-dj-of-the-week/:articleId/:djPosition",
  // checkIsAuthorized,
  updateDjsOfTheWeekController
);

// delete artist of the week
router.delete(
  "/delete-dj-of-the-week/:id",
  //   checkIsAuthorized,
  deleteDjOfTheWeekController
);

/////////////////////////////landing cards
// gett all landing cards details
router.get("/get-landing-cards-details", getAllLandingCards);

// update landing cards
router.put("/update-landing-cards", updateLandingCardsController);

// // delete landing card data
// router.delete("/delete-landing-card-data", deleteLandingCardsController);

module.exports = router;
