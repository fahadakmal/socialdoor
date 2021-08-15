const router = require("express").Router();
const multer = require("multer");
const { user_event_controller } = require("../../controllers/user.controller");
const { uploadStrategy } = require("../../helper/imageS3.helper");
const passport = require("passport");

//below ropute is used to create route,
router.post(
  "/eventCreationForm",
  passport.authenticate("jwt", { session: false }),
  user_event_controller.getEventCreation
);

//mobileUser will host an event by using this route
var cpUpload = uploadStrategy.fields([
  { name: "eventThumbNail", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
]);

router.post(
  "/addEvent",
  [
    passport.authenticate("jwt", { session: false }),
    function (req, res, next) {
      cpUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.json({ status: false, message: err.message });
        } else if (err) {
          return res.json({ status: false, message: err });
        }
        next();
      });
    },
  ],
  user_event_controller.addEvent
);

//mobileUser will get all events for all particular area nad category and price range and also for particular date
router.post("/getEvents", user_event_controller.getAllEvents);

router.post("/getEventDetail", user_event_controller.getEventDetail);

//mobileUser rememberes
var uploadImageInGallery = uploadStrategy.fields([
  { name: "gallery", maxCount: 1 },
]);

router.post(
  "/addMediaInEventGallery",
  [
    // passport.authenticate("jwt", { session: false }),
    function (req, res, next) {
      uploadImageInGallery(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.json({ status: false, message: err.message });
        } else if (err) {
          return res.json({ status: false, message: err });
        }
        next();
      });
    },
  ],
  user_event_controller.addMediaInEventGallery
);

router.post("/deleteEventMedia", user_event_controller.deleteEventMedia);

//mobileUser will get all favorites route by using this route
router.get("/getFavoriteEvents");

//mobileUser will get all his hosted event by useing this route
router.get("/getHostedEvents");

//mobileUser user will get all upcoming events
router.get("/getUpcomingEvents");
//mobileUser user will get present event by using this route
router.get("/getPresentEvents");
//mobileUser by this route user will get all existing event
router.get("/getExistingEvents");

//mobileUser by using this route  wil add an event to favorite list
router.post("/addInFavoriteEvents");
//mobileUser by using this route an event will be add to the upcomingevents
router.post("/addInUpcomingEvents");
//mobielUser by using this route an event will be move to the present event
router.post("/addInPresentEvent");
//mobielUser by using this event user will add a hosted event
router.post("/addInHostedEvent");
//mobielUser by using this route user event will be moved to existing event
router.get("/addInExistingEvents");

//not remember
router.post("reques");

//mobielUser user can see all related events that can be happen near to him also like cateogry
router.get("relatedEvents");

module.exports = router;
