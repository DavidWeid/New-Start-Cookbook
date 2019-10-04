const router = require("express").Router();
const User = require("../../models/User");

// route for ./api/user/
// get all Users (result = [{...}])
router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err
    });
  }
});

// get one User by _id
router.get("/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err
    });
  }
});

// add User to DB on login, if they are new
router.post("/create", async (req, res) => {
  try {
    const newUser = req.body;
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      console.log("New User");
      const user = new User({
        username: newUser.name,
        email: newUser.email
      });
      const result = await user.save(function(err) {
        if (err) return console.error(err);
        console.log("User added");
      });
      res.status(200).json(result);
    } else {
      console.log("Existing User");
      res.status(200).send("Return User");
    }
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err
    });
  }
});

module.exports = router;
