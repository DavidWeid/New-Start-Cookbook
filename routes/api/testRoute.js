const router = require("express").Router();
let testData = require("../../testDB");

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
      err
    });
  }
});

router.get("/test-data/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);

  try {
    let person = testData.find(person => person._id === id);
    res.status(200).json([person]);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

module.exports = router;
