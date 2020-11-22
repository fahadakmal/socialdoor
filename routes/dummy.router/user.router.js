const router = require("express").Router();
const user_controller = require("../../controllers/user.router").user_controller;
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
router.post("/login", user_controller.login);

router.get(
  "/authenticate",
  passport.authenticate("jwt", { session: false }),
  user_controller.authenticate
);

router.get(
  "/request_email_verification_token",
  passport.authenticate("jwt", { session: false }),
  user_controller.request_email_verifcation_token
);

router.get(
  "/verify_email/:otp",
  passport.authenticate("jwt", { session: false }),
  user_controller.verify_email
);

module.exports = router;
