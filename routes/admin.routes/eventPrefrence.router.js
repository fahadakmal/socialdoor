




const router = require("express").Router();
const {admin_prefrence_controller} = require("../../controllers/admin.controller");
const passport = require("passport");

//admin add event pref n creation table
router.post('/addPrefrence',admin_prefrence_controller.addPrefrence);

//admin delete event pref
router.post('/deletePrefrence',admin_prefrence_controller.deletePrefrence);

//admin update event pref in table
router.post('/updatePrefrence',admin_prefrence_controller.updatePrefrence);

//admin get all pref from evetn pref table
router.post('/getAllPraefrences',admin_prefrence_controller.getAllPrefrences)

router.post('/updatePrefrenceStatus',admin_prefrence_controller.updatePrefrenceStatus)

  


module.exports = router;


