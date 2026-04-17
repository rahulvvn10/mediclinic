const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Mediclinic" <no-reply@mediclinic.com>',
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);

  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw err;
  }
};

module.exports = sendEmail;