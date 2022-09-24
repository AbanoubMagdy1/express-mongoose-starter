export default function notFound(req, res) {
	console.log(req.body, req.query);
	res.status(404).send("Page Not Found");
}