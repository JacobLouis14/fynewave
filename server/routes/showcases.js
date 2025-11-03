const express = require("express");
const {
  checkIsAuthorized,
  checkIsAdmin,
} = require("../middlewares/isAuthorized");
const router = express.Router();
const multer = require("multer");
const {
  deleteSongOfTheWeekController,
  deleteArtistOfTheWeekController,
  getAllSongsOfTheWeek,
  getAllArtistOfTheWeek,
  getAllDjsOfTheWeek,
  deleteDjOfTheWeekController,
  getAllLandingCards,
  deleteLandingCardsController,
  createSongsOfTheWeekController,
  createArtistOfTheWeekController,
  createDjsOfTheWeekController,
  createLandingCardsController,
} = require("../controllers/showcases");
const upload = multer({
  storage: multer.memoryStorage(),
});

// get all songs of the week
router.get("/get-songs-of-the-week", getAllSongsOfTheWeek);

// add songs of the week
router.post(
  "/add-songs-of-the-week/:articleId",
  checkIsAuthorized,
  checkIsAdmin,
  createSongsOfTheWeekController
);

// delete songs of the week
router.delete(
  "/delete-songs-of-the-week/:id",
  checkIsAuthorized,
  checkIsAdmin,
  deleteSongOfTheWeekController
);

////////////////////////artist of the week

// get all atrist of the week
router.get("/get-artists-of-the-week", getAllArtistOfTheWeek);

// add artist of the week
router.post(
  "/add-artist-of-the-week/:articleId",
  checkIsAuthorized,
  checkIsAdmin,
  createArtistOfTheWeekController
);

// delete artist of the week
router.delete(
  "/delete-artist-of-the-week/:id",
  checkIsAuthorized,
  checkIsAdmin,
  deleteArtistOfTheWeekController
);

////////////////////////djs of the week

// get all atrist of the week
router.get("/get-djs-of-the-week", getAllDjsOfTheWeek);

// add djs of the week
router.post(
  "/add-dj-of-the-week/:articleId/:djPosition",
  checkIsAuthorized,
  checkIsAdmin,
  createDjsOfTheWeekController
);

// delete dj of the week
router.delete(
  "/delete-dj-of-the-week/:id",
  checkIsAuthorized,
  checkIsAdmin,
  deleteDjOfTheWeekController
);

/////////////////////////////landing cards
// gett all landing cards details
router.get("/get-landing-cards-details", getAllLandingCards);

// update landing cards
router.post(
  "/create-landing-cards",
  checkIsAuthorized,
  checkIsAdmin,
  createLandingCardsController
);

// delete landing card data
router.delete(
  "/delete-landing-card/:id",
  checkIsAuthorized,
  checkIsAdmin,
  deleteLandingCardsController
);

module.exports = router;
