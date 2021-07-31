// modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const xl = require("excel4node");

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
const { json } = require("body-parser");
const e = require("express");

exports.register = async (req, res) => {
  try {
    const User = req.models.user_model;
    console.log(req.body);
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
            address: [req.body.address],
            dob: req.body.dob,
            gender: req.body.gender,
            otp: [{ otp: otp, type: "email" }],
          });
          // Hashing the password of new user using bcrypt
          console.log(req.body.first_name);
          console.log(req.body.password);
          console.log(req.body.password);
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
        res.status(500).json({ server: "unknown error occured", err: err })
      );
  } catch (err) {
    res.status(500).json({ server: "unknown error occured" });
  }
};

exports.jsonToExcelController = async (req, res) => {
  let data = [];
  var extractedObject = req.body;
  console.log("print");
  console.log(extractedObject);
  console.log("print");
  extractedObject.result.results.forEach((element) => {
    data.push({
      title: String(element.title),
      first_name: String(element.firstName),
      last_name: String(element.lastName),
      email: String(element.email),
      mobileNumber: String(element.mobileNumber),
      directPhone: String(element.directPhone),
      telePhone: String(element.telephone),
    });
  });
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Agent List");
  const headingColumnNames = [
    "Title",
    "FirstName",
    "LastName",
    "Email",
    "MobileNumber",
    "DirestPhone",
    "TelePhone",
  ];
  let headingColumnIndex = 1;
  headingColumnNames.forEach((heading) => {
    ws.cell(1, headingColumnIndex++).string(heading);
  });
  let rowIndex = 2;
  data.forEach((record) => {
    let columnIndex = 1;
    Object.keys(record).forEach((columnName) => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName]);
    });
    rowIndex++;
  });
  wb.write("416-430.xlsx");
  return res.status(200);
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
      // checking if user exist\
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
  try {
    const User = req.models.user_model;
    const user = req.user;
    const otp = req.params.otp;
    const otps = req.user.otp;
    console.log(otp);
    email = user.email;
    console.log(email);
    _id = user.id;
    is_email_verified = user.is_email_verified;
    if (is_email_verified)
      return res.status(400).json({
        email_verification: "Email already verified",
      });

    const found = Boolean(
      otps.filter((o) => {
        console.log(o);
        if (o.type === "email") {
          console.log("email matched");
        }
        if (o.otp == otp) {
          console.log("otp matched");
        }
        if (new Date(o.expires_in) > new Date()) {
          console.log("date is greater");
        }
        o.type === "email" &&
          o.otp == otp &&
          new Date(o.expires_in) > new Date();
      })
    );
    console.log(found);

    if (found) {
      User.findOneAndUpdate({ _id, email }, { is_email_verified: true })
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

//to recover password
// ===PASSWORD RECOVER AND RESET

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
  let User = req.models.user_model;
  let config = req.config;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });
      //   genrating if user already exist
      if (user) {
        let email = user.email;
        let expirytoday = new Date();
        expirytoday.setHours(expirytoday.getHours() + 4);
        let _id = user.id;
        let token = helper.create_otp(6, "numeric");
        console.log(token);
        User.findOneAndUpdate(
          { _id },
          { resetPasswordToken: token, resetPasswordExpires: expirytoday }
        )
          .then((user) => {
            console.log(user);
            if (user) {
              console.log(user);
              mailer(
                "Please Reset your password",
                [email],
                email_verification_email(email, token),
                config.mail.default
              )
                .then(() => {
                  res.status(200).json({
                    success: true,
                    message: "password token email sent",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res
                    .status(400)
                    .json({ email_verification: "can't send token email" });
                });
            } else {
              res.status(400).json({
                email_verification: "user not exist with given email",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              email_verification: "can't verify email for " + email,
            });
          });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = (req, res) => {
  let User = req.models.user_model;
  let config = req.config;

  console.log(req.params.token);
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ message: "Password reset token is invalid or has expired." });

      //Redirect user to form with the email address
      res.status(200).json({ success: true, user });
      // res.render('reset', {user});
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
  let User = req.models.user_model;
  let config = req.config;
  console.log(req.params.token);
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }).then((user) => {
    console.log(user);
    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Set the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    user.save((err) => {
      if (err) return res.status(500).json({ message: err.message });
      console.log("successflyy");
      res
        .status(200)
        .json({ success: true, message: "successfully password reset" });
      //     // send email
      //     const mailOptions = {
      //         to: user.email,
      //         from: process.env.FROM_EMAIL,
      //         subject: "Your password has been changed",
      //         text: `Hi ${user.username} \n
      //         This is a confirmation that the password for your account ${user.email} has just been changed.\n`
      //     };

      //     sgMail.send(mailOptions, (error, result) => {
      //         if (error) return res.status(500).json({message: error.message});

      //         res.status(200).json({message: 'Your password has been updated.'});
      //     });
    });
  });
};
//social login with google
exports.socialLoginWithGoogle = (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const userProfileImage = req.body.profileImage;
  const id = req.body.id;
  try {
    const User = req.models.user_model;
    const config = req.config;

    // finding the user with email
    User.findOne({ email })
      .then((user) => {
        // checking if user exist

        if (user) {
          if (user.facebook) {
            const userLogin = jwtSignForSocialLogin(user, config);
            res.status(200).json({
              ...userLogin,
            });
          } else {
            //updatewithfacebooktokn
            User.findOneAndUpdate({ email }, { google: id })
              .then((user) => {
                is_email_verified = user.is_email_verified;
                if (is_email_verified) {
                  const userLogin = jwtSignForSocialLogin(user, config);
                  res.status(200).json({
                    ...userLogin,
                  });
                } else {
                  let otp = helper.create_otp(6, "numeric");
                  User.findOneAndUpdate(
                    { email },
                    { otp: [{ otp: otp, type: "email" }] }
                  ).then((user) => {
                    const userLogin = jwtSignForSocialLogin(user, config);
                    mailer(
                      "Welcome to SocialDoor, please verify your email",
                      [user.email],
                      welcome_email(req.body.first_name, req.body.email, otp),
                      config.mail.default
                    )
                      .then(() => {
                        res.status(200).json({
                          ...userLogin,
                          emailSuccess: true,
                        });
                      })
                      .catch((err) => {
                        res.status(200).json({
                          ...userLogin,
                          emailSuccess: false,
                          emailError: { mail: err.message },
                        });
                      });
                  });
                }
              })
              .catch((error) => {
                res.status(500).json({
                  error,
                });
              });
          }
        } else {
          //create new user
          let otp = helper.create_otp(6, "numeric");
          // creating new user using the User Model
          const newUser = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            otp: [{ otp: otp, type: "email" }],
            google: id,
            profileImage: userProfileImage,
          });
          newUser
            .save()
            .then((user) => {
              const userLogin = jwtSignForSocialLogin(user, config);
              mailer(
                "Welcome to SocialDoor, please verify your email",
                [user.email],
                welcome_email(req.body.first_name, req.body.email, otp),
                config.mail.default
              )
                .then(() => {
                  res.status(200).json({
                    ...userLogin,
                    emailSuccess: true,
                  });
                })
                .catch((err) => {
                  res.status(200).json({
                    ...userLogin,
                    emailSuccess: false,
                    emailError: { mail: err.message },
                  });
                });
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (e) {
    res.status(500).json({ server: e + "unknown error occured" });
  }
};
//social login with facebook
exports.socialLoginWithFacebook = (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const userProfileImage = req.body.profileImage;
  const id = req.body.id;
  try {
    const User = req.models.user_model;
    const config = req.config;

    // finding the user with email
    User.findOne({ email })
      .then((user) => {
        // checking if user exist

        if (user) {
          if (user.facebook) {
            const userLogin = jwtSignForSocialLogin(user, config);
            res.status(200).json({
              ...userLogin,
            });
          } else {
            //updatewithfacebooktokn
            User.findOneAndUpdate({ email }, { facebook: id })
              .then((user) => {
                is_email_verified = user.is_email_verified;
                if (is_email_verified) {
                  const userLogin = jwtSignForSocialLogin(user, config);
                  res.status(200).json({
                    ...userLogin,
                  });
                } else {
                  let otp = helper.create_otp(6, "numeric");
                  User.findOneAndUpdate(
                    { email },
                    { otp: [{ otp: otp, type: "email" }] }
                  ).then((user) => {
                    const userLogin = jwtSignForSocialLogin(user, config);
                    mailer(
                      "Welcome to SocialDoor, please verify your email",
                      [user.email],
                      welcome_email(req.body.first_name, req.body.email, otp),
                      config.mail.default
                    )
                      .then(() => {
                        res.status(200).json({
                          ...userLogin,
                          emailSuccess: true,
                        });
                      })
                      .catch((err) => {
                        res.status(200).json({
                          ...userLogin,
                          emailSuccess: false,
                          emailError: { mail: err.message },
                        });
                      });
                  });
                }
              })
              .catch((error) => {
                res.status(500).json({
                  error,
                });
              });
          }
        } else {
          //create new user
          let otp = helper.create_otp(6, "numeric");
          // creating new user using the User Model
          const newUser = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            otp: [{ otp: otp, type: "email" }],
            facebook: id,
            profileImage: userProfileImage,
          });
          newUser
            .save()
            .then((user) => {
              const userLogin = jwtSignForSocialLogin(user, config);
              mailer(
                "Welcome to SocialDoor, please verify your email",
                [user.email],
                welcome_email(req.body.first_name, req.body.email, otp),
                config.mail.default
              )
                .then(() => {
                  res.status(200).json({
                    ...userLogin,
                    emailSuccess: true,
                  });
                })
                .catch((err) => {
                  res.status(200).json({
                    ...userLogin,
                    emailSuccess: false,
                    emailError: { mail: err.message },
                  });
                });
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (e) {
    res.status(500).json({ server: e + "unknown error occured" });
  }
};

const jwtSignForSocialLogin = (user, config) => {
  const payload = {
    _id: user._id,
  };

  // Create token if the password matched and no error was thrown.
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: "1 day",
  });

  return {
    success: true,
    token: `Bearer ${token}`,
  };
};
