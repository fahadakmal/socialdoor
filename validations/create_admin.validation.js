//register.js

const Validator = require("validator");
const isEmpty = require("./is-empty.validation");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // check if the fields are empty or not
  data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // check if name has minimum length of 2 char and max of 30
  if (!Validator.isLength(data.user_name, { min: 6, max: 30 })) {
    errors.name = "User Name must be between 6 to 30 chars";
  }

  // check if name is not empty
  if (Validator.isEmpty(data.user_name)) {
    errors.name = "User Name is required";
  }

  
  // check if password length is more than 6 and less than 30
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must have 6 chars";
  }

  //check if password is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};
