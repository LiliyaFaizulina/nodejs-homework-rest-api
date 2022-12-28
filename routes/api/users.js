const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/users");
const { validateData, authenticate } = require("../../middlewares");
const controllers = require("../../controllers/users");

router.post("/register", validateData(schemas.schema), controllers.register);
router.post("/login", validateData(schemas.schema), controllers.login);
router.post("/logout", authenticate, controllers.logout);
router.get("/current", authenticate, controllers.getCurrentUser);
router.patch(
  "/",
  authenticate,
  validateData(schemas.updateSchema),
  controllers.updateSubscription
);
module.exports = router;
