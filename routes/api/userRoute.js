const router = require("express").Router();
const User = require("../../models/User");

// route for ./api/user/
// get all Users (result = [{...}])
router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await User.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err
    });
  }
});

module.exports = router;
