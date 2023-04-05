import HttpErrors from "http-errors";

export default function notFound(req) {  
	throw new HttpErrors.NotFound(`This route (${req.originalUrl}) does not exist`);
}