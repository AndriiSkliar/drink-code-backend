const { User, schemas } = require("../../models/user");
const { sendEmail, HttpError } = require("../../helpers");
const { BASE_URL } = process.env;

const subscribe = async (req, res) => {
  const response = schemas.emailSchema.validate(req.body, {
    abortEarly: false,
  });

  if (typeof response.error !== "undefined") {
    throw HttpError(400, "Please insert a valid email");
    // throw HttpError(400, response.error.details[0].message);
  }

  const { email: subscrEmail } = req.body;
  const { _id, email, name, subscribe } = req.user;

  if (subscrEmail !== email) {
    throw HttpError(400, "Please insert your registration email");
  }

  if (subscribe === true) {
    throw HttpError(400, "This email address is already subscribed");
  }

  const EmailAboutSubscription = {
    to: subscrEmail,
    subject: `Subscription message from ${BASE_URL}`,
    html: ` <h1 style="font-size: 20px"> Hello, ${name}!</h1>
                <p  style="font-size: 16px"> You are subscribed to our newsletters. </p>
                <p  style="font-size: 16px"> You will recieve letters about our news and special offers, etc. </p>
                <p  style="font-size: 16px"> Thank you! </p>`,
  };

  await User.findByIdAndUpdate(_id, { subscribe: true });

  await sendEmail(EmailAboutSubscription);

  res.status(200).json({
    message: `Subscribtion successful. Letters about subscribtion was sent to your email ${subscrEmail}`,
  });
};

module.exports = subscribe;
