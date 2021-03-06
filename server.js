// import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const routes = require("./routes");
// const models = require("./models");

// create express app
const app = express();
// define ports
const PORT = process.env.PORT || 3001;

// middleware
app.use(logger("dev"));
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    autoIndex: false
  }
);

// connect to db and add seed data
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB Connected");
  return;
});

app.listen(PORT, () =>
  console.log(`App is docked at port http://localhost:${PORT}`)
);

module.exports = app;
