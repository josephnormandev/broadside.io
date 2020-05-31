import get from './get.js';

export default async function checkMe()
{
	const me = {
		player: null,
		logged_in: false,
		in_game: false,
	};

	const response = await get('/players/me');

	if(response.status === 200)
	{
		const body = await response.json();
		me.logged_in = true;
		me.player = body;

		me.in_game = body.inGame;
	}

	return me;
}
