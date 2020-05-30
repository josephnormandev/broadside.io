import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';

async function me(req, res)
{
	return res.status(200).json(req.player.reduce);
}

export const url = '/players/me';
export const action = [ auth, loggedIn, me ];
