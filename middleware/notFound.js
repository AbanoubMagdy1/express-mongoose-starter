import HttpErrors from 'http-errors'

export default function notFound(req, res) {
	throw new HttpErrors.NotFound(`This route (${req.originalUrl}) does not exist`)
}