// modules
const nodemailer = require("nodemailer");

/**
 *
 * @param {string} subject  subject of the email
 * @param {Array} to list of recivers
 * @param {string} html html template in string
 * @param {Object} mailer mail config {host, secure, port , auth->{user, pass}}
 * @returns {Promise} then, catch err.message
 * @description
 */
const mailer = (subject, to, html, mailer) => {
  var transporter = nodemailer.createTransport({
    ...mailer,
  });
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: mailer.auth.user, // sender address
        to: to.join(","), // list of receivers
        subject: subject, // Subject line
        html: html,
      },
      function (err) {
        if (err) reject(err);
        else resolve("success");
      }
    );
  });
};

module.exports = mailer;
