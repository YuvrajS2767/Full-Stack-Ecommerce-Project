import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  console.log("sendEmail function started");

  console.log("SMTP ENV CHECK:", {
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    mail: process.env.SMTP_MAIL,
    hasPassword: !!process.env.SMTP_PASSWORD,
  });

  console.log("Creating transporter...");

  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
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

  console.log("MAIL SENT SUCCESSFULLY:", info.response);
};