const app=require('express');
const router=app.router();
const passport = require("passport");


router.get('/getEvents');
router.post('/updateEvents')
router.get('/addEvents');
router.get('/getFavoriteEvents');
router.get('/getHostedEvents');
router.get('getRequestsForEvent')
router.get('/getUpcomingEvents');
router.get('/getPresentEvents');
router.get('/getExistingEvents');
router.post('/addInFavoriteEvents');
router.post('/addInUpcomingEvents');
router.post('/addInPresentEvent');
router.post('/addInHostedEvent');
router.get('/addInExistingEvents');
router.post('/payForEvent');
router.post('/contactHost');
router.post('/requestHostForEvent');
router.post('/acceptRequest');
router.post('/cancelRequest');
router.post('/addReasonForCancel');
router.post('/getUserByIdForRequest')
router.post('/addInUserComments')
router.post('/addStory')
router.post('deleteStory')
router.post('addReview')
router.post('deleteReview')
router.post('updateReview')
router.post('getTags')
router.post('addFavoriteCategories')
router.post('updateFavoriteCategories')
router.post('getCateogires')
router.post('requestForPrivateCategories')
router.post('reques')
router.post('getStories')
router.post('getNotifications')
router.post('getNotificationDetail')
router.post('/updateUser')
router.post('/followUser')
router.post('/unFollowUser')
router.post('/getFollowers')
router.get('gethostDetails')
router.get('getHostReviews')
router.get('relatedEvents')
router.post('placeOrder')
router.post('addVoucher')
router.post('checkVoucher')
router.post('addInPaymentMethod')
router.post('deleteInPaymentMethod')
router.post('userLanguage')
router.get('userLanguage')
router.get('userCurrency')
router.post('userCurrency')
router.post('help')
router.post('/messagesNotification')
router.post('/reminderNotification')
router.post('/promotionAndTipsNotification')
router.post('/policyAndCommunityNotification')
router.post('/accountAndSupportNotification')
router.post('/isPremium')
router.post('forgetPassword')

























