function makeCallback(providedFunction) {
	return async function(req, res, next) {
		try {
			await providedFunction(req, res, next);
		} catch (err) {
			throw new Error("Server Error, Try again later");
		}
	};
}



export default makeCallback;

