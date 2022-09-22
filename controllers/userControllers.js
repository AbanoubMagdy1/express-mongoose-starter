import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import generateToken from "../helpers/generateToken.js";

//desc   Login of user
//api    POST api/users/login
//access Public

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
			token: generateToken({ id: user._id, secret: process.env.JWT_SECRET }),
		});
	} else {
		res.status(401);
		throw new Error("Email or password is invalid");
	}
});

//desc   Register of user
//api    POST api/users/register
//access Public

export const register = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		res.status(401);
		throw new Error("User is already existed with this email");
	} else {
		try {
			const user = await User.create({
				name,
				email,
				password,
			});
			res.json({
				_id: user._id,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
				token: generateToken({ id: user._id, secret: process.env.JWT_SECRET }),
			});
		} catch (e) {
			res.status(400);
			throw new Error("Invalid User info");
		}
	}
});
