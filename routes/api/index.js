const router = require("express").Router();
const testRoute = require("./testRoute.js");

router.use("/test", testRoute);

module.exports = router;