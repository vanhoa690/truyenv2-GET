const express = require("express");
const Story = require("../models/story.model");
const router = express.Router();

// function paginatedResults(model) {
//   return async (req, res, next) => {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {};
//     maxChaps = await model.countDocuments().exec();

//     console.log(maxChaps);
// if (endIndex < maxChaps) {
//   results.next = {
//     page: page + 1,
//     limit: limit
//   }
// }

// if (startIndex > 0) {
//   results.previous = {
//     page: page - 1,
//     limit: limit
//   }
// }
// try {
//   results.results = await model.find().limit(limit).skip(startIndex).exec()
//   res.paginatedResults = results
//   next()
// } catch (e) {
//   res.status(500).json({ message: e.message })
// }
//   };
// }
router.get("/:story", async (req, res) => {
  try {
    const story = await Story.findOne({ slug: req.params.story })
      .lean()
      .populate("chaps");
    if (story) {
      const { chaps, titleSEO, descSEO } = story;
      const seoInfo = {
        titleSEO: "Doc truyen ".concat(titleSEO, " Online"),
        descSEO,
      };
      // const page = parseInt(req.query.page);
      // const limit = parseInt(req.query.limit);

      // const startIndex = (page - 1) * limit;
      // const endIndex = page * limit;

      // const results = {};

      // if (endIndex < chaps.length) {
      //   results.next = {
      //     page: page + 1,
      //     limit: limit,
      //   };
      // }
      // if (startIndex > 0) {
      //   results.previous = {
      //     page: page - 1,
      //     limit: limit,
      //   };
      // }
      // results.results = chaps.slice(startIndex, endIndex);
      // console.log(results);
      const url = req.protocol + "://" + req.get("host") + req.originalUrl;
      res.render("story", { story, chaps, seoInfo, url });
    } else {
      res.status(404).redirect("/");
    }
  } catch (errors) {
    res.render("story", { errors });
  }
});

module.exports = router;
