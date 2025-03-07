const userModel = require("../models/user");
const { generateAccessToken } = require("../utils/gen_token");
const { hashCompare, hashHandler } = require("../utils/hasing");

const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "requires full fields" });
    }

    // is user exists
    let isUserExists = await userModel.findOne(
      { email },
      {
        createdAt: 0,
        updatedAt: 0,
      }
    );

    if (!isUserExists) {
      return res.status(400).json({ message: "No user found" });
    }

    const isCredentialCorrect = await hashCompare(
      password,
      isUserExists.password
    );

    if (!isCredentialCorrect) {
      return res.status(400).json({ message: "Inavlid credentials" });
    }

    // token
    const token = generateAccessToken({
      userId: isUserExists._id,
      userRole: isUserExists.role,
    });

    // data to send
    res
      .status(200)
      .json({ message: "success", data: { user: isUserExists, token } });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const signUpHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Requires complete fields" });
    }

    // isExists
    const isExists = await userModel.findOne({ email });

    if (isExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    // ready for database
    const hashedPassword = await hashHandler(password);
    const newUser = await new userModel({
      name,
      email,
      role,
      password: hashedPassword,
    }).save();
    res.status(200).json({ message: "success", newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { signInHandler, signUpHandler };
