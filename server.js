// import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const routes = require("./routes");
const models = require("./models");

// create express app
const app = express();
// define ports
const PORT = process.env.PORT || 3001;

// middleware
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// hit routes
app.use(routes);

// connect to MongoDB
// to connect to Heroku's MongoDB, use "mongodb://theCook:@u9Y5NfRrQSh94s@ds145146.mlab.com:45146/heroku_k8hczfsd"
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/cookbook-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB Connected");
  let usersArr = [];
  const troye = new models.User({
    username: "Troye",
    email: "troye@mailer.com",
  });
  const eric = new models.User({
    username: "Zijin",
    email: "zijin@mailer.com",
  });
  const david = new models.User({
    username: "David",
    email: "david@mailer.com",
  });
  const kristin = new models.User({
    username: "Kristin",
    email: "kristin@mailer.com",
  });
  usersArr.push(troye, eric, david, kristin);
  usersArr.forEach((userSeed) => {
    User.find({ username: userSeed.username }, function (err, user) {
      if (err) return console.error(err);
      if (user.length > 0) {
        return console.log(`User: ${user[0].username} exists`);
      } else {
        userSeed.save(function (err) {
          if (err) return console.error(err);
          console.log("User added");
        });
      }
    });
  });
  const recipe1 = new models.Recipe({
    creator: "zijin@mailer.com",
    owner: "zijin@mailer.com",
    title: "Fried Rice",
    description: "Just the best Fried Rice!",
    ingredients: [
      { amount: "5 cups", item: "Rice" },
      { amount: "1 cups", item: "Everything else." },
    ],
    instructions: [
      "Add oil",
      "Heat oil. Add rice.",
      "Fry rice",
      "Add everything else",
    ],
    tags: ["rice", "asian"],
  });
  const recipe2 = new models.Recipe({
    creator: "zijin@mailer.com",
    owner: "david@mailer.com",
    title: "Fried Rice",
    description: "Just Fried Rice!",
    ingredients: [
      { amount: "5 cups", item: "Rice" },
      { amount: "1 cups", item: "Everything else." },
    ],
    instructions: [
      "Add oil",
      "Heat oil. Add rice.",
      "Fry rice",
      "Add everything else",
    ],
    tags: ["rice", "asian"],
  });

  Recipe.find({ title: recipe1.title }, function (err, recipe) {
    if (err) return handleError(err);
    if (recipe.length > 0) {
      return console.log("Recipe exists");
    } else {
      recipe1.save(function (err) {
        if (err) return handleError(err);
        console.log("Recipe added");
      });
    }
  });
  Recipe.find({ title: recipe2.title }, function (err, recipe) {
    if (err) return handleError(err);
    if (recipe.length > 0) {
      return console.log("Recipe exists");
    } else {
      recipe2.save(function (err) {
        if (err) return handleError(err);
        console.log("Recipe added");
      });
    }
  });
});

app.listen(PORT, () =>
  console.log(`App is docked at port http://localhost:${PORT}`)
);

module.exports = app;
