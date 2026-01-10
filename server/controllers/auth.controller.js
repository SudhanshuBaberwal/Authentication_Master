import generateVerificationToken from "../utils/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generatejsonwebtokenandsetCookie from "../utils/tokes.js";
import {
  verificationEmail,
  sendWelcomeEmail,
  passwordresetEmail,
  sentResetSuccessEmail,
} from "../emails/email.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fiels Required",
      });
    }
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt,
    });
    await user.save();

    //jwt
    generatejsonwebtokenandsetCookie(res, user._id);
    verificationEmail(email, verificationToken);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in Sign up function : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).json({
        success: false,
        message: "Username or Password are invalid",
      });
    }
    generatejsonwebtokenandsetCookie(res, user._id);
    sendWelcomeEmail(email, user.name);
    user.lastlogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "User loggedIn successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in Login Function  : ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log("Error in logout function : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Does Not Exist",
      });
    }
    // Generate Reset Token
    // const bytes = randomBytes(16);
    const resetPasswordExpiresAt = Date.now + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();

    // Send Email
    // passwordresetEmail
    await passwordresetEmail(
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
      email
    );

    res.status(200).json({
      success: true,
      message: "Password reset email has sent successfully on your Email",
    });
  } catch (error) {
    console.log("Errro in forgot password function : ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Verification Token",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    // send welcome email
    res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifiy email function : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    console.log(token)
    const user = await User.findOne({
      resetPasswordToken: token,
    //   resetPasswordExpiresAt: { $ls: new Date() },
    });

    console.log(token);
    console.log(user)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expire Reset Token",
      });
    }
    // update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    // send Email for successful change
    await sentResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log("Error in Reset Password Function : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in check auth function : ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
