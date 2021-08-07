





const router = require("express").Router();
const {admin_cancelPolicy_controller} = require("../../controllers/admin.controller");
const passport = require("passport");

//admin add cancelation policy in table from admin panel
router.post('/addCancelationPolicy',admin_cancelPolicy_controller.addCancelPolicy);

//admin delete a cancelation policy from admin panel
router.post('/deleteCancelationPolicy',admin_cancelPolicy_controller.deleteCancelPolicy);

//admin update a cancelation policy
router.post('/updateCancelationPolicy',admin_cancelPolicy_controller.updateCancelPolicy);

//admin get all cancel policies from admin panel
router.post('/getCancelationPolicies',admin_cancelPolicy_controller.getAllcancelPolicies)
  
//admin activate or deactivate a policy

router.post('/updatePolicyStatus',admin_cancelPolicy_controller.updateCancelPolicyStatus)

module.exports = router;

