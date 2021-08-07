




const router = require("express").Router();
const {admin_eventCreation_controller} = require("../../controllers/admin.controller");
const passport = require("passport");

//admin add event creation n creation table
router.post('/addEventCreation',admin_eventCreation_controller.addEventCreation);

//admin delete event creation
router.post('/deleteEventCreation',admin_eventCreation_controller.deleteEventCreation);

//admin update event creation in table
router.post('/updateEventCreation',admin_eventCreation_controller.updateEventCreation);

//admin get all creation from evetn creation table
router.post('/getEventCreation',admin_eventCreation_controller.getAllEventCreation)
  

router.post('/updateCreationStatus',admin_eventCreation_controller.updateCreationStatus)


module.exports = router;


