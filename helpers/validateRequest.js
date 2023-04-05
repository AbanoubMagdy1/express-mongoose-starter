import Joi from "joi";
import createHttpError from "http-errors";

const anySchema = Joi.any();       
  
function validateRequest (
	req,
	{ body = anySchema, query = anySchema, params = anySchema } = {},
	{ warn = false } = {}
) {
	Object.entries({ body, query, params }).forEach(([objectName, schema]) => {
		const { error, value } = schema.validate(req[objectName]);
		if (error) {
			throw createHttpError(400, error.message, { warn });
		}
		 req[objectName] = value;
	});    
         
	//Needs to use structured clone when updating node version.
	return {
		/*
		body: structuredClone(req.body),
		params: structuredClone(req.params),
		query: structuredClone(req.query)*/		
		body: req.body,
		params: req.params,
		query: req.query
	};
}
        
export default validateRequest;
