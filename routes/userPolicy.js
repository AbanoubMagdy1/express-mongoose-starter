import { USERROLES } from "../models/User.js";
import acl from "../helpers/acl.js";

acl.allow([
	{
		roles: [USERROLES.user],
		allows: [
			{ resources: "/api/users/profile", permissions: "get" },
		]
	},
]);                    