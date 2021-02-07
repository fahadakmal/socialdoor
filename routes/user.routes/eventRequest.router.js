//mobileUser user will get all user requests for that hosted event  by using this  routes
router.get('getRequestsForEvent')


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