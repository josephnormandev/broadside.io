import HTTP from 'http';
import Express from 'express';
import BodyParser from 'body-parser';
import Path from 'path';

import AuthService from '../auth/auth.service.js';
import ConfigService from '../config/config.service.js';

import * as Login from '../players/features/login.js';
import * as Logout from '../players/features/logout.js';
import * as Register from '../players/features/register.js';
import * as FrontendOr404 from './features/frontend-or-404.js';
import * as PostError404 from './features/post-error404.js';

import error404 from './errors/error404.js';
import error500 from './errors/error500.js';

export default class AppService
{
	static use_build;

	static server;
	static app;

	static features = [
		Login,
		Logout,
		Register,
		FrontendOr404, // last (for GET)
		PostError404, // last (for POST)
	];

	static async initialize()
	{
		AppService.use_build = ConfigService.get('use_build');

		AppService.app = Express();
		AppService.app.set('trust proxy', 1);
        AppService.app.use(BodyParser.json());
        AppService.app.use(BodyParser.urlencoded({
            extended: true,
        }));
        AppService.app.use(AuthService.session_parser);

		if(AppService.use_build == true)
		{
			AppService.app.use(Express.static(ConfigService.get('build_path')));
		}

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

		AppService.app.use(function (err, req, res, next) {
			console.log(err)
			error500(req, res);
		});

        AppService.server = HTTP.createServer(AppService.app);
        AppService.server.listen(ConfigService.get('http_port'));
	}
}
