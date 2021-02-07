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