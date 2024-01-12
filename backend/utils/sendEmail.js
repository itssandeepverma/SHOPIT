import nodemailer from "nodemailer";

const sendEmail = async (options) => {
 
  var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bd5e0e540c3bde",
    pass: "96eca925bd448c"
  }
});  


  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transport.sendMail(message);

};

export default sendEmail;