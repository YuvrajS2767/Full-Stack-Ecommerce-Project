import nodeMailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    family: 4,
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: message,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("MAIL SENT:", info.response);
};