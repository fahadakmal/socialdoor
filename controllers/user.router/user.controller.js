// modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//validators
const validateRegisterInput = require("../../validations/register.validation");
const validateLoginInput = require("../../validations/login.validation");

//models
// const User = require("./../models/user.model");

// // helpers
// const config = require("./../config/keys.config");
const helper = require("../../helper/user.helper");
const welcome_email = require("../../templates/email/welcome");
const email_verification_email = require("../../templates/email/verifyemail");
const mailer = require("../../helper/mail.helper");

exports.register = async (req, res) => {

  try {
    
    const User = req.models.user_model;
    console.log(req.body)
    console.log('i am in fun');
    console.log('everything good');
    const config = req.config;
    //validating inputs using register validations rules
    const { errors, isValid } = validateRegisterInput(req.body);

    // genrating error if validation failed
    if (!isValid) return res.status(400).json(errors);

    // checking if user with provided email already exist.
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        //   genrating if user already exist
        if (user) {
          return res.status(400).json({
            email: "Email already exists",
          });
        } else {
          let otp = helper.create_otp(6, "numeric");
          // creating new user using the User Model
          console.log(req.body.address);
          const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            address:[req.body.address],
            dob:req.body.dob,
            gender:req.body.gender,
            otp: [{ otp: otp, type: "email" }],
          });
          // Hashing the password of new user using bcrypt
          console.log(req.body.first_name);
          console.log(req.body.password)
          console.log(req.body.password)
          bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              // replacing the newuser password with hashed password.
              newUser.password = hash;
              newUser.save().then((user) => {
                mailer(
                  "Welcome to SocialDoor, please verify your email",
                  [user.email],
                  welcome_email(req.body.first_name, req.body.email, otp),
                  config.mail.default
                )
                  .then(() => res.status(200).json({ success: true }))
                  .catch((err) =>
                    res
                      .status(200)
                      .json({ success: true, error: { mail: err.message } })
                  );
              });
            }
          });
        }
      })
      .catch((err) =>
        res.status(500).json({ server: "unknown error occured",err:err })
      );
  } catch (err){
    res.status(500).json({ server: "unknown error occured"});
  }
};

exports.login = async (req, res) => {
  try {
    const User = req.models.user_model;
    const config = req.config;
    const { errors, isValid } = validateLoginInput(req.body);
    // validating inputs
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // extracting email and password from body
    const email = req.body.email;
    const password = req.body.password;
    // finding the user with email
    User.findOne({ email }).then((user) => {
      // checking if user exist
      if (!user) {
        // genrating error if user does no exist
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      // comparing the password and encrypted password store in DB
      bcrypt.compare(password, user.password).then((isMatch) => {
        // Checking if Password Match or not
        if (isMatch) {
          // creating an object named payload that stores required user info to create the token
          const payload = {
            _id: user._id,
          };
          //creating token using JWT sign method
          jwt.sign(
            payload,
            config.jwt.secret,
            {
              expiresIn: "1 day",
            },
            (err, token) => {
              // logning error if existed
              if (err) console.error("There is some error in token", err);
              else {
                // sending res back to user with token
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              }
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    });
  } catch {
    res.status(500).json({ server: "unknown error occured" });
  }
};

exports.authenticate = async (req, res) => {
  // const User = req.models.user_model;
  // const config = req.config;
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(400).json({
      authentication: "unbale to authenticate.",
    });
  }
};

exports.request_email_verifcation_token = async (req, res) => {
  try {
    const User = req.models.user_model;
    const config = req.config;
    const user = req.user;
    email = user.email;
    _id = user.id;
    is_email_verified = user.is_email_verified;
    if (is_email_verified)
      return res.status(400).json({
        email_verification: "Email already verified",
      });

    const otps = user.otp.filter((otp) => otp.type !== "email");
    const otp = helper.create_otp(6, "numeric");
    User.findOneAndUpdate(
      { _id, email },
      { otp: [...otps, { otp: otp, type: "email" }] }
    )
      .then((user) => {
        if (user) {
          mailer(
            "Please Verify you Email",
            [email],
            email_verification_email(email, otp),
            config.mail.default
          )
            .then(() => {
              res
                .status(200)
                .json({ success: true, message: "verification email sent" });
            })
            .catch((err) =>
              res
                .status(400)
                .json({ email_verification: "can't send vericifaction email" })
            );
        } else {
          res
            .status(400)
            .json({ email_verification: "user not exist with given email" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          email_verification: "can't add new verification for " + email,
        });
      });
  } catch {
    res.status(500).json({ server: "unknown error occured" });
  }
};

exports.verify_email = (req, res) => {
  console.log(req.params.otp);
  console.log(req.params.otp);
  try {
    const User = req.models.user_model;
    const user = req.user;
    const otp = req.params.otp;
    const otps = req.user.otp;
    console.log(otp);
    email = user.email;
    _id = user.id;
    is_email_verified = user.is_email_verified;
    if (is_email_verified)
      return res.status(400).json({
        email_verification: "Email already verified",
      });

    const found = Boolean(
      otps.filter(
        (o) =>
          o.type === "email" && o.otp == otp && new Date(o.expires_in) > new Date()
      ).length
    );
    console.log(found)

    if (found) {
      User.findOneAndUpdate({ _id, email }, { is_email_verified:true })
        .then((user) => {
          if (user) {
            res
              .status(200)
              .json({ success: true, message: "email verification succeed" });
          } else {
            res
              .status(400)
              .json({ email_verification: "user not exist with given email" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            email_verification: "can't verify email for " + email,
          });
        });
    } else {
      res.status(400).json({ email_verification: "invalid otp code" });
    }
  } catch {
    res.status(500).json({ server: "unknown error occured" });
  }
};
