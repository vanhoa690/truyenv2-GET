const express = require("express");
const Story = require("../models/story.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().lean();
    const seoInfo = {
      titleSEO: "Doc truyen Online 2020",
      descSEO: "Doc truyen mien phi hang dau viet nam",
    };
    const url = req.protocol + "://" + req.get("host");
    res.render("index", { stories, seoInfo, url });
  } catch (errors) {
    res.render("index", { errors });
  }
});

module.exports = router;
