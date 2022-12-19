const express = require("express");

const router = express.Router();
const controllers = require("../../controllers/contacts");
const { validateData } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", validateData(schemas.schema), controllers.addNewContact);

router.delete("/:contactId", controllers.deleteContact);

router.put(
  "/:contactId",
  validateData(schemas.schema),
  controllers.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateData(schemas.changeFavoriteSchema),
  controllers.updateFavoriteStatus
);

module.exports = router;
