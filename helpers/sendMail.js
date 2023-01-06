const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, BASE_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  await sgMail.send({ ...data, from: BASE_EMAIL });
};

module.exports = sendMail;
