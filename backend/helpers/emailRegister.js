import nodemailer from "nodemailer";

const emailRegister = async (data) => {
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
    subject: "Confirm your account",
    text: "Confirm you email",
    html: `
        <p> Hola ${name}</p>
        <p> Comprueba tu cuenta en el siguiente enlache
    <a href= "${process.env.FRONTEND_URL}/confirmed/${token}"> Confirm Account</a>
        </p>`,
  });
  //Concate the sendEmail info
  console.log("Mensaje enviado %s", sendEmail.messageId);
};

export default emailRegister;
