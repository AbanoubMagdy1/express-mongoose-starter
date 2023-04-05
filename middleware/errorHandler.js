export default function errorHandler(err, req, res) {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	err.message = err.message || "Internal Server Error";  
                                    
	res.status(err.statusCode).json({message: err.message});
}                