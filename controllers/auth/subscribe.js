const { User } = require("../../models/user");

const { sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const subscribe = async (req, res) => {
    const {_id, email, name} = req.user;
       
    const EmailAboutSubscription = {
        to: email,
        subject: `Subscription message from ${BASE_URL}`,
        html: ` <h1 style="font-size: 20px"> Hello, ${name}!</h1>
                <p  style="font-size: 16px"> You are subscribed to our newsletters. </p>
                <p  style="font-size: 16px"> You will recieve letters about our news and special offers, etc. </p>
                <p  style="font-size: 16px"> Thank you! </p>`
    };
    
    await User.findByIdAndUpdate(_id, {subscribe: true});
      
    await sendEmail(EmailAboutSubscription);

    res.json( { message: `Subscribtion successful. Letters about subscribtion was sent to your email ${email}` } );

}
  
module.exports = subscribe;