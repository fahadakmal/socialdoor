//mobielUser will pay for event by using this event
router.post('/payForEvent');

//mobielUser this route to add a payment method in db for a user
router.post('addInPaymentMethod')
//mobielUser this route is used to remove a user payment method
router.post('deleteInPaymentMethod')
//
router.post('/addInEventPayments');