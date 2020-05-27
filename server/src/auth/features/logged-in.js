export default async function loggedIn(req, res, next)
{
	if(req.logged_in == true)
	{
		return next();
	}
	return res.status(401).json();
}
