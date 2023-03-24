
//desc   Get user profile
//api    GET api/users/profile
//access Private

const getProfile = async (req, res) => {
	res.json(req.user)
};

export default getProfile;