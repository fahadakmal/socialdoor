




const router = require("express").Router();
const {admin_story_controller} = require("../../controllers/admin.controller");
const passport = require("passport");

//admin add story in table from admin panel
router.post('/addStory',admin_story_controller.addStory);

//admin delete story from admin panel
router.post('/deleteStory',admin_story_controller.deleteStory);

//admin update story from admin panel
router.post('/updateStory',admin_story_controller.updateStory);

//admin get all story which can be possible in an event
router.post('/getStories',admin_story_controller.getAllStories)
  

router.post('/updateStoryStatus',admin_story_controller.updateStoryStatus)

module.exports = router;



