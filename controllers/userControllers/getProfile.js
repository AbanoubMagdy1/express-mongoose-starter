import asyncHandler from "express-async-handler";


//desc   Get user profile
//api    GET api/users/profile
//access Private

const getProfile = asyncHandler( async (req, res) => {
	res.json(req.user)
});

export default getProfile;