const router = require("express").Router();
const {user_controller,tags_controller,event_category_controller} = require("../../controllers/user.controller");
const passport = require("passport");


/**
 * ->staging
 *    https://fds-staging-app.herokuapp.com/api/user/user/register
 * ->local
 *    http://localhost:5000/api/user/user/register
 * ->post body
 *    first_name,
 *    lastname,
 *    email,
 *    phone,
 *    password,
 *    password_confirm
 */
router.get('/test5', function (req, res) {
   
  res.send('Everything working!')
})
router.post("/register", user_controller.register);

/**
 * * ->staging
 *    https://fds-staging-app.herokuapp.com/api/user/user/login
 * ->local
 *    http://localhost:5000/api/user/user/login
 * ->post body
 *    email,
 *    password
 */

//for login
router.post("/login", user_controller.login);

//for excel to json
router.post('/jsonToEcel',user_controller.jsonToExcelController);

//for authenticate
router.get(
  "/authenticate",
  passport.authenticate("jwt", { session: false }),
  user_controller.authenticate
);

//to request email verification
router.get(
  "/request_email_verification_token",
  passport.authenticate("jwt", { session: false }),
  user_controller.request_email_verifcation_token
);

//to verify email
router.get(
  "/verify_email/:otp",
  passport.authenticate("jwt", { session: false }),
  user_controller.verify_email
);

//Password RESET
router.post('/recover', [
], user_controller.recover);

//to verify token
router.get('/reset/:token', user_controller.reset);


//to reset password
router.post('/reset/:token', user_controller.resetPassword);

//sociallogin for facebook
router.post('/socialLoginWithFacebook',user_controller.socialLoginWithFacebook);

//social login for google
router.post('/socialLoginWithGoogle',user_controller.socialLoginWithGoogle);

//get all tags by user
router.post('/getAllTags',passport.authenticate("jwt", { session: false })
,tags_controller.getAllTags)

//get all event categories for user
// router.post('/getAllCategories',  passport.authenticate("jwt", { session: false }),
//  event_category_controller.getAllCategories);








router.post('/addInUserPayments');
//mobielUser this route is used to make user premium
router.post('/makeUserPremium')
//this route is for forget password
router.post('forgetPassword')
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

//mobielUser user can update his detail
router.post('/updateUser')
//mobielUser user can start follow someone to see stories and latest events
router.post('/followUser')
//mobielUser user can unfollow someone to see stories and latest event  
router.post('/unFollowUser')
//mobielUser by using this user will get all followers and unfollowers
router.post('/getFollowers')

router.post('/addInUserComments')
//mobielUser will add a story for a particular present event

module.exports = router;
