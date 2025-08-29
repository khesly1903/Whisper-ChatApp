import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, nickName, email, password } = req.body;
  try {
    // check everythind is filled
    if (!fullName || !nickName || !email || !password) {
      return res.status(400).json({ message: "All fields are requied" });
    }

    // check psw length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (nickName.length < 6) {
      return res
        .status(400)
        .json({ message: "Nick name must be at least 6 characters" });
    }

    // check mail exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // check nickname exists
    const userNickName = await User.findOne({ nickName });
    if (userNickName) {
      return res
        .status(400)
        .json({ message: "Nickname has already been taken!" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a user
    const newUser = new User({
      fullName,
      nickName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);

      // save the user
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullName,
        nickName: newUser.nickName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check email validity
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password validity
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //if both ok, then generate token and send to the client
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      nickName: user.nickName,
      password: user.password,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console
      .log(500)
      .json({ message: "Internal Server Error, failed to login" });
    res.status(500).json({ message: "Internal Server Error, failed to login" });
  }
};

export const logout = (req, res) => {
  // just delete the cookies
  // change cookie jwt with empty string immidiataly

  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("error inb logout controller", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error, failed to logout" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName, nickName } = req.body;
    const userId = req.user._id;

    // En az bir alan dolu olmalı
    if (!profilePic && !fullName) {
      return res.status(400).json({
        message: "At least one field (profilePic or fullName) is required",
      });
    }

    // Güncellenecek alanları hazırla
    const updateFields = {};

    // Profil fotoğrafı varsa Cloudinary'ye yükle
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateFields.profilePic = uploadResponse.secure_url;
    }

    // İsim varsa güncelle
    if (fullName) {
      // İsim validasyonu
      if (fullName.trim().length < 2) {
        return res
          .status(400)
          .json({ message: "Full name must be at least 2 characters long" });
      }
      updateFields.fullName = fullName.trim();
    }

    // nickName kontrolü ve uniqueness
    const existingUser = await User.findOne({ nickName: nickName });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: "Nickname already taken" });
    }

    if (nickName) {
      if (nickName.trim().length < 4) {
        return res.status(400)
          .json({ message: "Full name must be at least 6 characters long" });
      }
      updateFields.nickName = nickName.trim()
      }
    

    // Kullanıcıyı güncelle
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).select("-password"); // Şifreyi döndürme

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in Updating Profile" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchUser = async (req, res) => {
  const { nickName } = req.query;
  try {
    if (!nickName) {
      return res.status(400).json({ message: "Nickname is required" });
    }
    const user = await User.findOne({ nickName: nickName }).select(
      "-password -contacts -contactRequests"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in searchUser:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in Searching User" });
  }
};
