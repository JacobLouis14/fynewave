const express = require("express");
const {
  allUsersDataHandler,
  suspendUserController,
  allowUserEditPermission,
  assignArticleToEdit,
  deleteArticleFromEditPermission,
  getArticleAndWriterByEmail,
  deleteUser,
  changePasswordController,
  updateProfileController,
} = require("../controllers/users");
const {
  checkIsAuthorized,
  checkIsAdmin,
  checkIsSuperAdmin,
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
router.put(
  "/create-edit-permission-for-article",
  checkIsAuthorized,
  checkIsAdmin,
  assignArticleToEdit
);

// remove article edit permission
router.delete(
  "/remove-article-edit-premission/:articleId/:userId",
  checkIsAuthorized,
  checkIsAdmin,
  deleteArticleFromEditPermission
);

// delete user
router.delete(
  "/delete-user/:userId",
  checkIsAuthorized,
  checkIsSuperAdmin,
  deleteUser
);

// change password
router.put("/change-password", checkIsAuthorized, changePasswordController);
// change profile data
router.put("/update-profile", checkIsAuthorized, updateProfileController);

module.exports = router;
