//below all routes is used to 
router.post('/messagesNotification')
router.post('/reminderNotification')
router.post('/promotionAndTipsNotification')
router.post('/policyAndCommunityNotification')
router.post('/accountAndSupportNotification')
//mobielUser all notification will be shown in notifications page
router.post('getNotifications')
//mobielUser will get notification detail
router.post('getNotificationDetail')