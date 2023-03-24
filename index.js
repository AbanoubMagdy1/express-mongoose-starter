import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import configDB from "./configDB.js";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
configDB();


if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/users", userRoutes);

app.all("*" ,notFound);
app.use(errorHandler);

app.listen(
	PORT,
	() => console.log(`Server has been started on port ${PORT}...`),
);



