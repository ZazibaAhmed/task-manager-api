const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ahmedzaziba@gmail.com',
        subject: `Thanks for joining in!`,
        text: `Welcome to the app, ${name}.` 
    }) 

}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ahmedzaziba@gmail.com',
        subject: `Goodbye 😔`,
        text: `We're sorry to see you go, ${name}.` 
    }) 

}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}