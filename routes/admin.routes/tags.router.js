



const router = require("express").Router();
const {admin_tags_controller,} = require("../../controllers/admin.controller");
const passport = require("passport");

//admin add tags in db for event like trending or others
router.post('/addTag',admin_tags_controller.addTag);

//admin delete tags for event from fb like trending
router.post('/deleteTag',admin_tags_controller.deleteTag);

//admin update tags from db table like popolar
router.post('/updateTag',admin_tags_controller.updateTag);

//admin get all tags from db  like popolar 
router.post('/getAllTags',admin_tags_controller.getAllTags)

//admin activate or deactivate tags
router.post('/updateTagStatus',admin_tags_controller.updateTagStatus);


module.exports = router;

