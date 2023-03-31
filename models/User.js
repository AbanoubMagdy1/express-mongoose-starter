import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const USERROLES = {
	admin: "admin",
	user: "user",
}

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		roles: {
			type: [String],
			default: ["user"],
			validator: (roles) => {
				const validRoles = Object.values(userRoles);
				return roles.every((role) => validRoles.includes(role));
			}
		},
		token: String,
		expDate: Date,
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (matchedPassword) {
	return await bcrypt.compare(matchedPassword, this.password);
};

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	} else {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
});

const User = mongoose.model("User", userSchema);

export default User;
