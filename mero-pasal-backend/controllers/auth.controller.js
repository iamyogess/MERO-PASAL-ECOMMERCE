import { hashPassword } from "../helpers/auth.helper.js";
import { UserModel } from "./../models/user.model.js";

const registerController = async (req, res) => {
  try {
    const { firstName, lastName, password, address, phone, email } = req.body;
    // validations
    if (!firstName && !lastName) {
      res.json({ error: "First name or last name is required!", error });
    }

    if (!email) {
      res.json({ error: "Email is required!", error });
    }

    if (!phone) {
      res.json({ error: "Email is required!", error });
    }

    if (!password) {
      res.json({ error: "Password is required!", error });
    }

    if (!address) {
      res.json({ error: "Address is required!", error });
    }

    //check existing user
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: true, message: "Already registered. Please login!" });
    }

    const hashedPassword = await hashPassword(password);
    //register user
    const user = new UserModel({
      firstName,
      lastName,
      address,
      email,
      password: hashedPassword,
      phone,
    }).save();

    res.status(200).json({
      success: true,
      message: "User registered successfully!",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in registration!", error });
  }
};

export { registerController };
