import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// create a user 
export const registerUser = async (req, res) => {

    try {

        const { usr_name, usr_email, usr_password, usr_phone } = req.body;

        const ExistingUser = await User.findOne({
            $or: [{ usr_email }, { usr_phone }]
        });

        if (ExistingUser) {
            return res.status(404).json({
                status: 400,
                success: false,
                message: "User already exist, please login in",
            });
        };

        const hashPassword = await bcrypt.hash(usr_password, 12);

        const newUser = await User({
            usr_name,
            usr_email,
            usr_password: hashPassword,
            usr_phone
        });

        await newUser?.save();

        res.status(200).json({
            status: 200,
            success: true,
            message: "User Registered Successfully",
            result: {
                user: {
                    usr_name,
                    usr_email,
                    usr_phone
                }
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to create user",
            error: error
        });
    }

};



export const loginUser = async (req, res) => {

    try {

        const { usr_email, usr_password } = req.body;

        const existingUser = await User.findOne({ usr_email });

        if (!existingUser) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found!, please login again",
            });
        };

        const isPasswordCorrect = await bcrypt.compare(usr_password, existingUser?.usr_password);

        if (!isPasswordCorrect) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Invalid email or password!"
            });
        };

        const token = jwt.sign({
            id: existingUser._id,
            name: existingUser.usr_name,
            email: existingUser.usr_email,
            phone: existingUser.usr_phone
        },
            process.env.JWT_SECRET, { expiresIn: "24h" }
        );

        res.status(200).json({
            status: 200,
            success: true,
            message: "User logged in successfully",
            result: {
                token,
                user: {

                    id: existingUser._id,
                    usr_name: existingUser.usr_name,
                    usr_email: existingUser.usr_email,
                    usr_phone: existingUser.usr_phone
                }
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed logging in! Please try again later.",
            error: error
        });
    }

};



// get single user 
export const getSingleUser = async (req, res) => {

    try {

        const userId = req.user.id;

        const user = await User.findById(userId).select("-usr_password");

        res.status(200).json({
            status: 200,
            success: true,
            message: "User fetch successfully",
            result: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch user",
            error: error
        });
    }

};


// get all users
export const getAllUsers = async (req, res) => {

    try {

        const users = await User.find({}).select("-usr_password");

        res.status(200).json({
            status: 200,
            success: true,
            message: "Fetched Users Successfully",
            result: users
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch users",
            error: error
        });
    }

};

