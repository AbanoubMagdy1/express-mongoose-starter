import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import generateToken from "../../helpers/generateToken.js";
import Joi from "joi";
import validateRequest from "../../helpers/validateRequest.js";

const validationSchema = {
	body: Joi.object().required().keys({
		name: Joi.string().required().min(2),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6),
	})
};

//desc   Register of user
//api    POST api/users/register
//access Public

const register = asyncHandler(async (req, res) => {
	const { body } = validateRequest(req, validationSchema);
	const { email, password, name } = body;
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

export default register;