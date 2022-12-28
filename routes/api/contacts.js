const express = require("express");

const router = express.Router();
const controllers = require("../../controllers/contacts");
const { validateData, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", authenticate, controllers.getAll);

router.get("/:contactId", authenticate, controllers.getById);

router.post(
  "/",
  authenticate,
  validateData(schemas.schema),
  controllers.addNewContact
);

router.delete("/:contactId", authenticate, controllers.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  validateData(schemas.schema),
  controllers.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateData(schemas.changeFavoriteSchema),
  controllers.updateFavoriteStatus
);

module.exports = router;
