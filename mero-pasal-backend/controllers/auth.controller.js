import { comparePassword, hashPassword } from "../helpers/auth.helper.js";
import { UserModel } from "./../models/user.model.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { firstName, lastName, password, address, phone, email } = req.body;
    // validations
    if (!firstName || !lastName || !email || !phone || !password || !address) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    //check existing user
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({ success: false, message: "Already registered. Please login!" });
    }

    const hashedPassword = await hashPassword(password);
    //register user
    const user = await new UserModel({
      firstName,
      lastName,
      address,
      email,
      password: hashedPassword,
      phone,
    }).save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully!",
      user: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error in registration!" });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password!" });
    }

    // check user
    const registeredUser = await UserModel.findOne({ email: email });
    if (!registeredUser) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered!",
      });
    }

    // compare password
    const isMatch = await comparePassword(password, registeredUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password!" });
    }

    // token
    const token = JWT.sign(
      { _id: registeredUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        name: registeredUser.firstName + registeredUser.lastName,
        email: registeredUser.email,
        phone: registeredUser.phone,
        address: registeredUser.address,
      },
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error in login" });
  }
};
