const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'hotmail', 'yahoo', or use a custom SMTP server
  auth: {
    user: 'tcfproject212@gmail.com', // Your email address
    pass: 'yupv idzv hebn xxhy', // Your email password or app-specific password
  },
});

// Email options
const mailOptions = {
  from: 'tcfproject212@gmail.com', // Sender's email address
  to: 'tcftech11@gmail.com', // Recipient's email address
  subject: 'Test Email', // Email subject
  text: 'Hello, this is a test email from NodeMailer.', // Plain text content
  html: '<p>Hello, this is a <strong>test email</strong> from NodeMailer.</p>', // HTML content
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.response);
});
