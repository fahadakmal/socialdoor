


const router = require("express").Router();
const {user_controller,tags_controller,event_category_controller} = require("../../controllers/user.router");
const passport = require("passport");





//admin add tags in db for event like trending or others
router.post('/addTag',  passport.authenticate("jwt", { session: false }),
tags_controller.addTag);

//admin delete tags for event from fb like trending
router.post('/deleteTag',tags_controller.deleteTag);

//admin update tags from db table like popolar
router.post('/updateTag',tags_controller.updateTag);

//admin get all tags from db  like popolar 
router.post('getTags');

//admin activate or deactivate tags
router.post('activateOrDeactivateTags');

module.exports = router;

