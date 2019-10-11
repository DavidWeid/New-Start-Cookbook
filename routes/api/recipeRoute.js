const router = require("express").Router();
const Recipe = require("../../models/Recipe");

// route for ./api/recipe/
// get all Recipes (result = [{...}])
router.get("/", async (req, res) => {
  try {
    const result = await Recipe.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err
    });
  }
});

// get all recipes by owner (result = [{...}])
router.get("/mine/:email", async (req, res) => {
    const userEmail = req.params.email;
    console.log(userEmail);
    res.json(userEmail);
    // res.send("Hit");
//   try {
//     const result = await Recipe.find({ owner: "Eric" });
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(400).json({
//       message: "Error on route",
//       err
//     });
//   }
});

// get one Recipe by _id (result = {...})
router.get("/view/:id", async (req, res) => {
  try {
    const result = await Recipe.findOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err
    });
  }
});

module.exports = router;
