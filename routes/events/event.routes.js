const app=require('express');
const router=app.router();
const passport = require("passport");


//admin activate or deactivateEvent
router.post('activateOrDeactivateEvent');

//admin add event category n catefory table
router.post('addCategory');

//admin update event category in table
router.post('updateCategory');

//admin delete event category
router.post('deleteCategory')

//admin get all categories from evetn categories table
router.post('getCategory');

//admin add tags in db for event like trending or others
router.post('addTags');

//admin delete tags for event from fb like trending
router.post('deleteTags');

//admin update tags from db table like popolar
router.post('updateTags');

//admin get all tags from db  like popolar 
router.post('getTags');

//admin activate or deactivate tags
router.post('activateOrDeactivateTags');

//admin activate or deactive category
router.post('activateOrDeactivateCategory');

//admin activate or deactivate//user story
router.post('activateOrDeactivateStory');

//admin  get all user from db
router.post('getUsers');

//admin activate or deactivate user
router.post('activateOrDeactivateUser');

//admin get all amenities which can be possible in an event
router.post('getAmenities')

//admin add amemities in table from admin panel
router.post('addAmenities')
//admin delete amenities from admin panel
router.post('deleteAmenities')

//admin update amenities from admin panel
router.post('updateAmenities');
//admin activate or deactivate aminities
router.post('activateOrDeactivateAmenities');

//admin get rules in table from admin panel
router.post('getRules');

//admin add rules from admin panel from rules table
router.post('addRule');

//admin delete a rule from admin panel 
router.post('deleteRule');

//admin delete a rule from db
router.post('updateRule');

//admin activate or deactivate a rule from admin
router.post('activateOrDeactivateRule');

//admin get all cancel policies from admin panel
router.post('getCancelationPolicies');
//admin add cancelation policy in table from admin panel
router.post('addCancelationPolicy');
//admin update a cancelation policy
router.post('updateCancelationPolicy');
//admin delete a cancelation policy from admin panel
router.post('deleteCancelationPolicy');
//admin activate or deactivate a policy
router.post('activateOrDeactivatePolicy');

//admin add special guest in event
router.post('addSpecialGuest');

//admin delete special guest in
router.post('deleteSpecialGuest');

//admin update special guest from admin panel
router.post('updateGuest')

//admin get all guest from table
router.post('getAllGuest')
//admin activate or deactivate a special guest
router.post('activateOrDeactivateGuest');
//admin get all guest categories from db
router.post('getGuestCategory');

//admin delete guest category from admin panel
router.post('deleteGuestCategory');
//admin update guest category from admin panel
router.post('updateGuestCategory');
//admin add a gest category from admin  panel
router.post('addGuestCategory');
//admin activate or deactivate a specialguestcategory
router.post('activateOrDeactivateGuestCategory');
//admin get all users helps from db on admin panel
router.post('getHelps');

//admin get help categories from db
router>post('getHelpCategories');

//admin uadd help cateogry in table from admin panel
router.post('addHelpCategories');

//admin update a hep category
router.post('updateHelpCategories');
//admin delete a help category from table
router.post('deleteHelpCategories');

//
router.post('/addInEventPayments');
router.post('/addInUserPayments');
router.post('/addPaymentinUserVault');
router.post('/deletePaymentFromUserVault');
router.post('/updatePaymentFromUserVault');
router.post('/getUserVault');
//user will get number of refral remaining for him and if number excedded from 5 then make it free
router.post('/getRefrals');
//where user will use share button we will create a referr code foe that event id and user id and also set the default limit to 5 
router.post('/addInrefrals');

//mobileUser host will add more images and videos to event gallery
router.post('addInEventGallery');

//mobileUser will delete event picture from gallry
router.post('deleteInEventGallery')

//mobileUser will add his images and pictures to gallery
router.post('addInUserGallery')

//mobileUser will delete image from his gallery 
router.post('deleteInUserGallery')

//mobileUser will get all events for all particular area nad category and price range and also for particular date
router.get('/getEvents');

//mobileUser rememberes
router.post('/updateEvents')

//mobileUser will host an event by using this route
router.get('/addEvents');

//mobileUser will get all favorites route by using this route
router.get('/getFavoriteEvents');

//mobileUser will get all his hosted event by useing this route
router.get('/getHostedEvents');

//mobileUser user will get all user requests for that hosted event  by using this  routes
router.get('getRequestsForEvent')
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
//mobielUser will pay for event by using this event
router.post('/payForEvent');
//mobielUser user can send message to host by using this route
router.post('/contactHost');
//mobielUser by using this event request to host for approval for this event 
router.post('/requestHostForEvent');
//mobielUser if host will accept the user request
router.post('/acceptRequest');
//mobielUser host if host will reject the user request
router.post('/cancelRequest');
//mobielUser host  will add a reason for cancelling user request
router.post('/addReasonForCancel');
//mobielUser host will get userDetail for his/her id  with comments
router.post('/getUserByIdForRequest')
//mobielUser host will add a comment regarding a user  for future use
router.post('/addInUserComments')
//mobielUser will add a story for a particular present event
router.post('/addStory')
//mobielUser will delete a story by using this story
router.post('deleteStory')
//mobielUser will give rating to the event host and also will comment on host if something will be missing as per commited
router.post('addReview')
//mobielUser user can delete a review before a particular time 
router.post('deleteReview')
//mobielUser can delete a review before a particular time
router.post('updateReview')
//mobielUser on home screen user will see tags on top
router.post('getTags')
//mobielUser will add more categories in favorite
router.post('addFavoriteCategories')
//mobielUser will update his favorite categoires
router.post('updateFavoriteCategories')
//mobileUser will get all categories
router.post('getCateogires')
//mobielUser user will send a request for private categories
router.post('requestForPrivateCategories')
//not remember
router.post('reques')
//mobielUser request to all stories that will be shown on home screen
router.post('getStories')
//mobielUser all notification will be shown in notifications page
router.post('getNotifications')
//mobielUser will get notification detail
router.post('getNotificationDetail')
//mobielUser user can update his detail
router.post('/updateUser')
//mobielUser user can start follow someone to see stories and latest events
router.post('/followUser')
//mobielUser user can unfollow someone to see stories and latest event  
router.post('/unFollowUser')
//mobielUser by using this user will get all followers and unfollowers
router.post('/getFollowers')
//mobielUser by using this user can see host of the event details
router.get('gethostDetails')
//mobielUser by using this user can see host reviews
router.get('getHostReviews')
//mobielUser user can see all related events that can be happen near to him also like cateogry
router.get('relatedEvents')
//mobielUser
router.post('placeOrder')
//mobielUser if user will have some kind of vouvher code then if
router.post('addVoucher')
//mobielUser check if the user have a voucher ocode
router.post('checkVoucher')
//mobielUser this route to add a payment method in db for a user
router.post('addInPaymentMethod')
//mobielUser this route is used to remove a user payment method
router.post('deleteInPaymentMethod')
//mobielUser this route is used to add usercurrentlanguage
router.post('userLanguage')
//mobielUser this route is used to get user language
router.get('userLanguage')
//mobielUser this route is used to get userCurrency
router.get('userCurrency')
//mobielUser this route is used to add user currency 
router.post('userCurrency')
//mobielUser this route is used to add a help 
router.post('help')
//below all routes is used to 
router.post('/messagesNotification')
router.post('/reminderNotification')
router.post('/promotionAndTipsNotification')
router.post('/policyAndCommunityNotification')
router.post('/accountAndSupportNotification')
//mobielUser this route is used to make user premium
router.post('/makeUserPremium')
//this route is for forget password
router.post('forgetPassword')

























