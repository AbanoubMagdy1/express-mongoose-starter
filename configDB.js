import mongoose from "mongoose";
import paginationPlugin from "./helpers/paginationPlugin.js";

const configDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		mongoose.plugin(paginationPlugin);
		console.log(`MONGODB Connected : ${conn.connection.host}`);
	} catch (err) {
		console.error(`ERROR occured : ${err.message}`);
		process.exit(1);
	}
};

export default configDB;