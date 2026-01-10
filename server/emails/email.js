import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL } from "./emailTemplates.js";
import transporter from "./nodemailer.js";

export const verificationEmail = async (userEmail, verificationCode) => {
  try {
    const mailOptions = await transporter.sendMail({
        from : process.env.SENDER_EMAIL,
        to: userEmail,
        subject: "Verfication Email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace(
            "{verificationCode}",
            verificationCode
        ),
        category: "Email Verification",
    });
    transporter.verify((err) => {
      if (err) {
        console.error("Brevo SMTP ERROR ❌", err);
      } else {
        console.log("Brevo SMTP READY ✅");
      }
    });

    console.log("Email sent successfully", mailOptions);
  } catch (error) {
    console.log("Error in Sending email", error);
  }
};

export const sendWelcomeEmail = async (userEmail , username) => {
  try {
    const mailOptions = await transporter.sendMail({
      from : process.env.SENDER_EMAIL,
      to : userEmail,
      subject : "Welcome Email",
      
      html : WELCOME_EMAIL.replace("{{name}}", username)
    })
  } catch (error) {
    console.log("Error in sendwelcome email : " , error)
  }
}

export const passwordresetEmail = async (resetURL , userEmail) => {
  try {
    const mailOptions = await transporter.sendMail({
      from : process.env.SENDER_EMAIL,
      to : userEmail , 
      subject : "Forgot Password Email",
      html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" , resetURL),
      category : "Password Reset"
    })
  } catch (error) {
    
  }
}

export const sentResetSuccessEmail = async (userEmail) => {
  try {
    const mailOptions = await transporter.sendMail({
      from : process.env.SENDER_EMAIL,
      to : userEmail,
      subject : "Password Reset Email",
      html : PASSWORD_RESET_SUCCESS_TEMPLATE,
      category : "Reset Password"
    })
    console.log("Email sent successfully" , mailOptions)
  } catch (error) {
    console.log("Error in sentResetSuccessEmail function : " , error)
  }
}