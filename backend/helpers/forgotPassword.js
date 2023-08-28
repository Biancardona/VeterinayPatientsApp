import nodemailer from "nodemailer";
import "dotenv/config";

const emailForgotPassword = async (data) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_REGISTER_HOST,
    port: process.env.EMAIL_REGISTER_PORT,
    auth: {
      user: process.env.EMAIL_REGISTER_USER,
      pass: process.env.EMAIL_REGISTER_PASS,
    },
  });
  const { name, email, token } = data;

  //Method to send the email that receives an object with the email configuration
  const sendEmail = await transport.sendMail({
    from: "AVP Administrator Veterinarian Patients",
    to: email,
    subject: "Recover your password",
    text: "Recover your password",
    html: `
        <p> Hola ${name}</p>
        <p> Has solicitado reestablecer tu password</p>
        <p> Sigue el siguiente enlace para reestablecer tu password</p>
    <a href= "${process.env.FRONTEND_URL}/forgot-password/${token}"> Restablecer password</a>
        </p>`,
  });
  //Concate the sendEmail info
  console.log("Mensaje enviado %s", sendEmail.messageId);
};

export default emailForgotPassword;
