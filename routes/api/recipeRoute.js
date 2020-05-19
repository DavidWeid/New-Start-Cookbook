const router = require("express").Router();
const Recipe = require("../../models/Recipe");

// route for ./api/recipe/
// get all Recipes (result = [{...}])
router.get("/", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    console.log("All Recipes Grabbed");
    res.status(200).json(allRecipes);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err,
    });
  }
});

// get all recipes by owner's email (result = [{...}])
router.get("/mine/:email", async (req, res) => {
  try {
    const allRecipesByEmail = await Recipe.find({ owner: req.params.email });
    console.log(`Recipes Grabbed by User's Email: ${req.params.email}`);
    res.status(200).json(allRecipesByEmail);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err,
    });
  }
});

// get one Recipe by _id (result = {...})
router.get("/view/:id", async (req, res) => {
  try {
    const singleRecipeById = await Recipe.findOne({ _id: req.params.id });
    console.log(`Recipe Grabbed By Id: ${req.params.id}`);
    res.status(200).json(singleRecipeById);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err,
    });
  }
});

// create new recipe
router.post("/create/", async (req, res) => {
  try {
    const newRecipe = req.body;
    const result = await Recipe.create(newRecipe);
    console.log("New Recipe Saved");
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err,
    });
  }
});

// delete one Recipe by _id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteRecipeById = await Recipe.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log(`Recipe Deleted By Id: ${req.params.id}`);
    res.status(200).json(deleteRecipeById);
  } catch (err) {
    res.status(400).json({
      message: "Error on route",
      err,
    });
  }
});

module.exports = router;
