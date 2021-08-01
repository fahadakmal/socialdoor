





const router = require("express").Router();
const {admin_rules_controller} = require("../../controllers/admin.controller");
const passport = require("passport");

//admin add rules from admin panel from rules table
router.post('/addRule',admin_rules_controller.addRule);

//admin delete a rule from admin panel 
router.post('/deleteRule',admin_rules_controller.deleteRule);

//admin update rule from admin panel
router.post('/updateRule',admin_rules_controller.updateRule);

//admin get rules in table from admin panel
router.post('/getRules',admin_rules_controller.getAllRules)
  

router.post('/updateRuleStatus',admin_rules_controller.updateRuleStatus)

module.exports = router;


