import jwt from "jsonwebtoken";

export default function generateToken({id, secret}){
	return `Bearer ${jwt.sign({id}, secret, {expiresIn: "7d"})}`;
}