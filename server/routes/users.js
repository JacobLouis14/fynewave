const express = require("express");
const {
  allUsersDataHandler,
  suspendUserController,
  allowUserEditPermission,
  assignArticleToEdit,
  deleteArticleFromEditPermission,
  getArticleAndWriterByEmail,
} = require("../controllers/users");
const {
  checkIsAuthorized,
  checkIsAdmin,
} = require("../middlewares/isAuthorized");
const router = express.Router();

// get all user data
router.get(
  "/get-all-users",
  checkIsAuthorized,
  checkIsAdmin,
  allUsersDataHandler
);

// suspend user
router.put(
  "/supend-user/:id",
  checkIsAuthorized,
  checkIsAdmin,
  suspendUserController
);

// allow content writter to edit article permission
router.put(
  "/allow-edit-permission/:id",
  checkIsAuthorized,
  checkIsAdmin,
  allowUserEditPermission
);

// accessing article and writer by name
router.get("/get-article-and-user-by-name", getArticleAndWriterByEmail);

// asign article edit permission
router.put("/create-edit-permission-for-article", assignArticleToEdit);

// remove article edit permission
router.delete(
  "/remove-article-edit-premission/:articleId/:userId",
  deleteArticleFromEditPermission
);

module.exports = router;
