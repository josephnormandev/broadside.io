import Path from 'path';

import AppService from '../app.service.js';
import ConfigService from '../../config/config.service.js';

import error404 from '../errors/error404.js';

async function frontendOr404(req, res)
{
	if(AppService.use_build == true)
	{
		res.sendFile(Path.join(ConfigService.get('build_path'), 'index.html'));
	}
	else
	{
		error404(req, res);
	}
}

export const url = '/*';
export const action = [ frontendOr404 ];
