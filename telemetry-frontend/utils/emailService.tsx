import nodemailer from 'nodemailer';

const SendEmail = async (to: string, subject: string, text: string, html: string) => {
  const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
  const transporter = nodemailer.createTransport({
    // Specify your email provider's SMTP configuration here
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: 'maxbyngmaddick@gmail.com',
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default SendEmail;
