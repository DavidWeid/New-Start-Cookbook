const router = require("express").Router();
const testRoute = require("./testRoute");
const userRoute = require("./userRoute");

router.use("/test", testRoute);
router.use("/user", userRoute);

module.exports = router;
