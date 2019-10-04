const router = require("express").Router();
const testRoute = require("./testRoute");
const userRoute = require("./userRoute");
const recipeRoute = require("./recipeRoute");

router.use("/test", testRoute);
router.use("/user", userRoute);
router.use("/recipe", recipeRoute);

module.exports = router;
