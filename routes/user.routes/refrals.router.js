
//user will get number of refral remaining for him and if number excedded from 5 then make it free
router.post('/getRefrals');
//where user will use share button we will create a referr code foe that event id and user id and also set the default limit to 5 
router.post('/addInrefrals');