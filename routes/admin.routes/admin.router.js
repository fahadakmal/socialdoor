
const router = require("express").Router();
const {user_controller,tags_controller,event_category_controller} = require("../../controllers/user.router");
const passport = require("passport");

router.post('/addTag',  passport.authenticate("jwt", { session: false }),
tags_controller.addTag);


module.exports = router;
