import checkAPIs from 'express-validator';
const { check } = checkAPIs;

import auth from '../../auth/features/auth.js';
import loggedOut from '../../auth/features/logged-out.js';

import PlayersService from '../players.service.js';
import Player from '../player.js';

import validate from '../../validators/features/validate.js';
import validateEmailUse from '../../validators/email-use.validate.js';
import validateUsernameUse from '../../validators/username-use.validate.js';

async function register(req, res)
{
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;

	var hashed_password = Player.hashPassword(password);

	var player = await PlayersService.createPlayer({
		email: email,
		username: username,
		password: hashed_password,
		admin: false,
	});

	if(player != null)
	{
		return res.status(201).json({
			player: player.id,
		});
	}
	return res.status(500).json();
}

export const url = '/players';
export const rules = [
	check('email')
		.isEmail()
		.withMessage('Must provide a valid email')
		.custom(validateEmailUse),
	check('username')
		.isLength({ min: 1 })
		.withMessage('Must provide a username')
		.custom(validateUsernameUse),
	check('password')
		.isLength({ min: 8 })
		.withMessage('Must provide a password with 8+ characters'),
];
export const action = [ auth, loggedOut, validate, register ];
