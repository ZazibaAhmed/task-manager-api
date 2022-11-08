const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

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