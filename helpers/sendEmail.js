const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "a_skliar@meta.ua",
    pass: GMAIL_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "a_skliar@meta.ua" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
