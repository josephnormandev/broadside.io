export default async function admin(req, res, next)
{
	if(req.player.admin == true)
	{
		return next();
	}
	return res.status(401).json();
}
