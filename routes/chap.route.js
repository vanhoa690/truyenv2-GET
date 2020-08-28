const express = require("express");
const Chap = require("../models/chap.model");
const Story = require("../models/story.model");
const router = express.Router();

router.get("/:story/:chap", async (req, res) => {
  try {
    const story = await Story.findOne({ slug: req.params.story })
      .lean()
      .populate("chaps");
    const chap = await Chap.findOne({ slug: req.params.chap }).lean();
    const { titleSEO, descSEO } = chap;
    const seoInfo = {
      titleSEO,
      descSEO,
    };
    // console.log(titleSEO);
    const url = req.protocol + "://" + req.get("host") + req.originalUrl;
    res.render("chap", { story, chap, seoInfo, url });
  } catch (errors) {
    res.render("chap", { errors });
  }
});
module.exports = router;
