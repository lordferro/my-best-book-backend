const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/kid");
const ctrl = require("../../controllers/kid");

const router = express.Router();

router.post("/add", validateBody(schemas.kidSchemaJoi), ctrl.register);

router.get("/:id", isValidId, ctrl.getCurrent);

module.exports = router;
