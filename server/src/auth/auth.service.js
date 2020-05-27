import CookieSession from 'cookie-session';

import ConfigService from '../config/config.service.js';

export default class AuthService
{
	static session_parser;

	static initialize()
	{
		AuthService.session_parser = CookieSession({
			name: 'session',
			secret: ConfigService.get('cookie_secret'),
			maxAge: ConfigService.get('cookie_max_age'),
		});
	}

	static playerLogin(req, player_id)
	{
		req.session.player_id = player_id;
	}

	static playerLogout(req)
	{
		req.session = null;
	}
}
