const express = require("express");
const controller = require("../controllers/author.controller");
const router = express.Router();

router.get("/", controller.index);
router.get("/create", controller.create);
router.get("/:slug", controller.get);
router.post("/create", controller.authorCreate);
router.get("/edit/:id", controller.getAuthorEdit);
router.post("/edit/:id", controller.updateAuthor);
module.exports = router;
