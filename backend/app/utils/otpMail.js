

const nodemailer = require('nodemailer');

// Create a transporter using Mailtrap's SMTP server
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io', // Mailtrap SMTP host
  port: 587, // Mailtrap SMTP port
  auth: {
    user: process.env.MAILTRAP_USER, // Your Mailtrap SMTP user
    pass: process.env.MAILTRAP_PASS, // Your Mailtrap SMTP password
  },
});

// Function to send OTP email
const sendOTPEmail = async (email, username) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP

  const mailOptions = {
    from: 'noreply@yourdomain.com', // Use a sender email (it can be any valid address)
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Dear ${username},\n\nYour OTP is: ${otp}\n\nIt is valid for 10 minutes.\n\nBest regards,\nYour App`,
  };

  try {
    // Send the email using Mailtrap
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
    return otp; // Return the OTP to be used for password reset
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = { sendOTPEmail };





/*
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

const sendOTPEmail = async (email, username) => {
  const otp = generateOTP(); // Generate OTP

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Dear ${username},
  
Your OTP for resetting your password is: ${otp}

Please use this OTP to complete the password reset process. This OTP is valid for 10 minutes.

If you did not request a password reset, please ignore this email.

Best regards,
RedBus`,
  };

  try {
    console.log('Preparing to send OTP email...'); // Debugging line
    console.log('SMTP Configuration:', {
      service: 'Gmail',
      user: process.env.EMAIL,
    }); // Debugging line
    console.log('Mail Options:', mailOptions); // Debugging line

    await transporter.sendMail(mailOptions);

    console.log('OTP email sent successfully to:', email); // Debugging line
    return otp; // Return the generated OTP for further processing
  } catch (error) {
    console.error('Error sending OTP email:', error); // Debugging line
    console.log('Check EMAIL and PASS environment variables:', {
      EMAIL: process.env.EMAIL,
      PASS: process.env.PASS ? 'Loaded' : 'Missing',
    }); // Debugging line
    throw new Error('Failed to send OTP email');
  }
};

module.exports = { sendOTPEmail };
*/