import nodemailer from 'nodemailer';

export const sendEmail = async (options: {
  to: string;
  subject: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    port: Number(process.env.SMPT_PORT),
    service: process.env.SMPT_SERVICE,
    host: process.env.SMPT_HOST,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    subject: options.subject,
    html: options.message,
    to: options.to,
  };

  await transporter.sendMail(mailOptions);
};
