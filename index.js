const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");

const port = 3000;

const app = express();

const MONGO_URL = " mongodb://localhost:27017/truyenonline";
mongoose.set("useCreateIndex", true);
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    throw err;
  });
// Handlebars Helpers
const { chapList } = require("./helpers/hbs");
// Handlebars
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      chapList,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
// Static folder
app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static("public"));
// app.use("/", (req, res) => {
//   res.render("home");
// });
// Router
app.use(require("./routes/home.route"));
app.use(require("./routes/story.route"));
app.use(require("./routes/chap.route"));
app.use((req, res) => {
  res.status(404).redirect("/");
});

app.listen(port, function () {
  console.log("Server listening on port " + port);
});
