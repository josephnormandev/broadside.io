export default function error500(req, res)
{
	res.status(500).send(`Error 500`);
}
