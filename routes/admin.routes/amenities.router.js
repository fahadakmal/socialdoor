




const router = require("express").Router();
const {admin_amenities_controller} = require("../../controllers/admin.controller");
const passport = require("passport");

//admin add amemities in table from admin panel
router.post('/addAmenities',admin_amenities_controller.addAminity);

//admin delete amenities from admin panel
router.post('/deleteAmenities',admin_amenities_controller.deleteAminity);

//admin update amenities from admin panel
router.post('/updateAmenities',admin_amenities_controller.updateAminity);

//admin get all amenities which can be possible in an event
router.post('/getAmenities',admin_amenities_controller.getAllAmenitiesß)
  

router.post('/updateAmenityStatus',admin_amenities_controller.updateAminity)

module.exports = router;





