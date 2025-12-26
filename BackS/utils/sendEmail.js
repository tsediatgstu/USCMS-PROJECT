const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter (The "Mailman")
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use Gmail, Outlook, etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email from .env
      pass: process.env.EMAIL_PASS  // Your App Password from .env
    }
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"USCMS Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
        <h2 style="color: #2c3e50;">USCMS Verification Code</h2>
        <p>Hello Student,</p>
        <p>Your 6-digit OTP for the University Student Complaint Management System is:</p>
        <h1 style="color: #e74c3c; letter-spacing: 5px;">${options.otp}</h1>
        <p>This code will expire in 10 minutes. <b>Note:</b> You have only 5 attempts to enter this correctly.</p>
        <hr />
        <p style="font-size: 0.8em; color: #7f8c8d;">Developed by Tsedeke Tgstu</p>
      </div>
    `
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;