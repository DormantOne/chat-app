const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const oauth2Client = new OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: 'YOUR_REFRESH_TOKEN'
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        refreshToken: 'YOUR_REFRESH_TOKEN',
        accessToken: accessToken
    }
});

async function sendLoginLink(email) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Login Link',
        text: 'Here is your login link: https://yourwebsite.com/login/' + encodeURIComponent(email)
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Login link sent to ' + email);
    } catch (error) {
        console.error('Error sending login link:', error);
    }
}

module.exports = sendLoginLink;
