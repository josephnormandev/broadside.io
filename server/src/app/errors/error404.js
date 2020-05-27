export default function error404(req, res)
{
	res.status(404).send(`Error 404`);
}
