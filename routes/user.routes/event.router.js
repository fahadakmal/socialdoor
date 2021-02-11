const router = require("express").Router();
const passport = require("passport");



//mobileUser will host an event by using this route
router.get('/addEvent');


//mobileUser will get all events for all particular area nad category and price range and also for particular date
router.get('/getEvents');

//mobileUser rememberes
router.post('/updateEvents')



//mobileUser will get all favorites route by using this route
router.get('/getFavoriteEvents');

//mobileUser will get all his hosted event by useing this route
router.get('/getHostedEvents');


//mobileUser user will get all upcoming events
router.get('/getUpcomingEvents');
//mobileUser user will get present event by using this route
router.get('/getPresentEvents');
//mobileUser by this route user will get all existing event
router.get('/getExistingEvents');

//mobileUser by using this route  wil add an event to favorite list
router.post('/addInFavoriteEvents');
//mobileUser by using this route an event will be add to the upcomingevents
router.post('/addInUpcomingEvents');
//mobielUser by using this route an event will be move to the present event
router.post('/addInPresentEvent');
//mobielUser by using this event user will add a hosted event
router.post('/addInHostedEvent');
//mobielUser by using this route user event will be moved to existing event
router.get('/addInExistingEvents');



//not remember
router.post('reques')




//mobielUser user can see all related events that can be happen near to him also like cateogry
router.get('relatedEvents')
































