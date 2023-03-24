import dotenv from "dotenv";
dotenv.config();
import Joi from "joi";
import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import generateToken from "../../helpers/generateToken.js";
import validateRequest from "../../helpers/validateRequest.js";
import HttpErrors from "http-errors";

const validationSchema = {
	body: Joi.object().required().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6),
	})
};

//desc   Login of user
//api    POST api/users/login
//access Public

const login = async (req, res) => {
	const { body } = validateRequest(req, validationSchema);
	const { email, password } = body;
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
		throw new HttpErrors.Unauthorized("Email or password is invalid");
	}
};

export default login;