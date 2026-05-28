import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  console.log("sendEmail function started");

  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: message,
  };

  console.log("Sending mail...");

  const info = await transporter.sendMail(mailOptions);

  console.log("MAIL SENT:", info.response);
};