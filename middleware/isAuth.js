import jwt from "jsonwebtoken";
import HttpErrors from "http-errors";
import asyncHandler from "express-async-handler";
import acl from "../helpers/acl.js";

export default asyncHandler (async function isAuth (req, res, next) {
	if (
		req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
	) {
		const token = req.headers.authorization.split(" ")[1];
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;

		if (!payload) {
			throw new HttpErrors.Unauthorized("Not authorized, no user");
		}
		
		const isRoleAllowed = await acl.areAnyRolesAllowed(payload.roles || ['guest'], req.originalUrl, req.method.toLowerCase());
		
		if(!isRoleAllowed){
			throw new HttpErrors.Unauthorized("Not authorized to access this resource");
		}

		next();
	} else {
		throw new HttpErrors.Unauthorized("Not authorized, no token");
	}
});
