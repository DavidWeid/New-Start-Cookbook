// import packages
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const routes = require("./routes");

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

app.listen(PORT, () =>
  console.log(`App is docked at port http://localhost:${PORT}`)
);

module.exports = app;
