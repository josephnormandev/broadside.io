import HTTP from 'http';
import Express from 'express';
import BodyParser from 'body-parser';
import Path from 'path';

import ConfigService from '../config/config.service.js';

import * as FrontendOr404 from './features/frontend-or-404.js';

import error500 from './errors/error500.js';

export default class AppService
{
	static use_build;

	static server;
	static app;

	static features = [
		FrontendOr404, // last
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
        // AppService.app.use(AuthService.session_parser);
		AppService.app.use(function (err, req, res, next) {
			error500(req, res);
		});

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

		AppService.app.get('/*', function(req, res) {
			res.sendFile(Path.join(ConfigService.get('build_path'), 'index.html'));
		});

        AppService.server = HTTP.createServer(AppService.app);
        AppService.server.listen(ConfigService.get('http_port'));
	}
}
