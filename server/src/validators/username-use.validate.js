import PlayersService from '../players/players.service.js';

export default async function validate(username)
{
	var player = await PlayersService.getPlayerByUsername(username);

	if(player != null)
		throw new Error('Username is already in use!');
	return true;
}
