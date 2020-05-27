export default async function loggedOut(req, res, next)
{
	if(req.logged_in == false)
	{
		return next();
	}
	return res.status(401).json();
}
