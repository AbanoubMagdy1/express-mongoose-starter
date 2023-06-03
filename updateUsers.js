import dotenv from "dotenv";
dotenv.config();
import User from "./models/User.js";
import configDB from "./configDB.js";

configDB();

const updateUsers = async () => {
	await User.updateMany({},
		{ $set: { roles: ["user"]}, }
	);
	await User.updateMany({}, {$unset: {isAdmin: ""}});

	console.log("Users updated");
	process.exit();
};

updateUsers();
