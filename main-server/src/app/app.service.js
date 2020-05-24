import HTTP from 'http';
import Express from 'express';
import BodyParser from 'body-parser';

import ConfigService from '../config/config.service.js';
import AuthService from '../auth/auth.service.js';

export default class AppService
{
	static http_server;
	static app;

	static features = [

	];

	static async initialize()
	{
		AppService.app = Express();
		AppService.app.set('trust proxy', 1);
		AppService.app.use(BodyParser.json());
		AppService.app.use(BodyParser.urlencoded({
			extended: true,
		}));
		AppService.app.use(AuthService.session_parser);

		for(var feature of AppService.features)
		{
			if(feature.rules != null)
			{
				AppService.app.post(
					feature.url,
					feature.rules,
					feature.action,
				);
			}
			else
			{
				AppService.app.get(
					feature.url,
					feature.action,
				);
			}
		}

		AppService.http_server = HTTP.createServer(AppService.app);
		AppService.http_server.listen(ConfigService.get('http_port'));
	}
}
