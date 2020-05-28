import PlayersService from '../players/players.service.js';

export default async function validate(email)
{
	var player = await PlayersService.getPlayerByEmail(email);

	if(player != null)
		throw new Error('Email is already in use!');
	return true;
}
