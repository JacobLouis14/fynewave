const express = require("express");
const { signInHandler, signUpHandler } = require("../controllers/auth");
const router = express.Router();
const multer = require("multer");
const {
  checkIsAuthorized,
  checkIsAdmin,
} = require("../middlewares/isAuthorized");

const upload = multer({
  storage: multer.memoryStorage(),
});

// sign in route handler
router.post("/sign-in", upload.none(), signInHandler);

// admin create user route handler
router.post(
  "/sign-up",
  checkIsAuthorized,
  checkIsAdmin,
  upload.none(),
  signUpHandler
);

module.exports = router;
