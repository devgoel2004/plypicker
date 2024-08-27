import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "devgoel901@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }, <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };
    const mail = await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
