/**
 *
 * @param {Number} length
 * @param {String} format
 * @description accept the length of otp token and a format formate must be numeric/alpha/alphnumeric and return a distinc code with given lenght
 * @returns {String} otp
 */
function create_otp(length, format) {
  let otp = "";
  if (format === "alphnumeric") {
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  } else if (format === "numeric") {
    characters = "123456789";
  } else if (format === "alpha") {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return otp;
}



module.exports = {
  create_otp,
};
