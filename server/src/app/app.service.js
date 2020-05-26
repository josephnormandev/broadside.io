import HTTP from 'http';
import Express from 'express';
import BodyParser from 'body-parser';
import Path from 'path';

import ConfigService from '../config/config.service.js';

export default class AppService
{
	static server;
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
		AppService.app.use(Express.static(ConfigService.get('build_path')));
        // AppService.app.use(AuthService.session_parser);

		for(var feature of AppService.features)
        {
            if(typeof feature.rules !== 'undefined')
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
