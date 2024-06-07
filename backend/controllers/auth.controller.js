import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, email, password, gender, age } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      gender,
      age,
    });

    if (newUser) {
      // Generate JWT token here
      // generateToken(newUser._id, res);

      const token = generateToken(newUser._id, res);
      await newUser.save();

      // res.status(201).json({
      //   _id: newUser._id,
      //   fullName: newUser.fullname,
      //   email: newUser.email,
      // });

      res.status(201).json({ token, role: newUser.role });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const registerDoctor = async (req, res) => {
  try {
    const { fullname, email, password, gender, age } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      gender,
      age,
      role: "care-taker",
    });

    if (newUser) {
      // Generate JWT token here
      // generateToken(newUser._id, res);
      const token = generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({ token, role: newUser.role });
      // res.status(201).json({
      //   _id: newUser._id,
      //   fullName: newUser.fullname,
      //   email: newUser.email,
      // });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user._id, res);

    // res.status(200).json({
    //   _id: user._id,
    //   fullname: user.fullname,
    //   email: user.email,
    // });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
