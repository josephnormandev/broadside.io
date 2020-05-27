import checkAPIs from 'express-validator';
const { check } = checkAPIs;

import AuthService from '../../auth/auth.service.js';
import auth from '../../auth/features/auth.js';
import loggedOut from '../../auth/features/logged-out.js';

import PlayersService from '../players.service.js';

import validate from '../../validators/features/validate.js';

async function login(req, res)
{
	var email = req.body.email;
	var password = req.body.password;

	var player = await PlayersService.getPlayerByEmail(email);

	if(player != null)
	{
		if(player.checkPassword(password))
		{
			AuthService.playerLogin(req, player.id);
			return res.status(200).json({
				player: player.id,
			});
		}
	}
	return res.status(403).json();
}

export const url = '/players/login';
export const rules = [
	check('email')
		.isLength({ min: 1 })
		.withMessage('Must include email'),
	check('password')
		.isLength({ min: 1 })
		.withMessage('Must include password'),
];
export const action = [ auth, loggedOut, validate, login ];
