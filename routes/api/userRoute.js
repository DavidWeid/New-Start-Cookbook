const router = require("express").Router();
const User = require("../../models/User");

// route for ./api/user/
router.get("/", (req, res) => {
  User.find()
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => res.json(err));
});

module.exports = router;
