import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import HttpErrors from "http-errors";


//desc   Get user profile
//api    GET api/users/profile
//access Private

const getProfile = asyncHandler( async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");

	if (!user) {
		throw new HttpErrors.Unauthorized("Not authorized, no user");
	} 

	res.json(user);
});

export default getProfile;