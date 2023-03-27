import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpErrors from "http-errors";
import asyncHandler from "express-async-handler";

export default asyncHandler (async function isAuth (req, res, next) {
	if (
		req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
	) {
		const token = req.headers.authorization.split(" ")[1];
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(id).select("-password");

		if (!req.user) {
			throw new HttpErrors.Unauthorized("Not authorized, no user");
		}

		next();
	} else {
		throw new HttpErrors.Unauthorized("Not authorized, no token");
	}
});
