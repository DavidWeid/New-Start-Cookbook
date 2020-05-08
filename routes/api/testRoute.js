const router = require("express").Router();
let testData = require("../../testDB");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-1j31wh9w.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: "eBBXOoLfQniXxHbXEaZqMOuiTvtaJug9",
  issuer: `https://dev-1j31wh9w.auth0.com/`,
  algorithms: ["RS256"],
});

// route for ./api/test/
router.get("/", (req, res) => {
  res.send("Hello");
});

// route for ./api/test/test-data
router.get("/test-data", async (req, res) => {
  try {
    res.status(200).json(testData);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

// route for one Item
router.get("/test-data/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);

  try {
    let person = testData.find((person) => person._id === id);
    res.status(200).json([person]);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

//
router.post("/test-data", checkJwt, async (req, res) => {
  console.log("Testing test/test-data/ post route");

  try {
    res.status(200).send("Test POST route");
  } catch (err) {
    res.status(400).json({
      message: err.message,
      err,
    });
  }
});

module.exports = router;
