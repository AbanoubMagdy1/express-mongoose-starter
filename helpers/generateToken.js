import jwt from "jsonwebtoken";

export default function generateToken({_id, roles,  secret}){
	const token = jwt.sign({_id, roles}, secret, {expiresIn: "7d"});

	return `Bearer ${token}`;
}