import PlayersService from '../../players/players.service.js';

export default async function auth(req, res, next)
{
	var player_id = req.session.player_id;

	if(player_id == null)
	{
		req.logged_in = false;
		return next();
	}

	var player = await PlayersService.getPlayerById(player_id);

	if(player == null)
	{
		req.logged_in = false;
		return next();
	}
	else
	{
		req.logged_in = true;
		req.player = player;
		return next();
	}
}
