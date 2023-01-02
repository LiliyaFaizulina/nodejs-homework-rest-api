const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const apiKey = process.env.SENDGRID_API_KEY;

const EMAIL_FROM = "lily.fed85@gmail.com";

sgMail.setApiKey(apiKey);

const sendMail = async (data) => {
  await sgMail.send({ ...data, from: EMAIL_FROM });
};

module.exports = sendMail;
