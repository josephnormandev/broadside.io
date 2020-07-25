import LoggerService from './logger/logger.service.js';
import ConfigService from './config/config.service.js';
import DatabaseService from './database/database.service.js';
import AuthService from './auth/auth.service.js';
import AppService from './app/app.service.js';

import TerrainsService from './terrains/terrains.service.js';
import PlayersService from './players/players.service.js';
import QueueingService from './queueing/queueing.service.js';
import GamesService from './games/games.service.js';

(async function() {
	await LoggerService.initialize();
	await ConfigService.initialize();
	await DatabaseService.initialize();
	await AuthService.initialize();
	await AppService.initialize();

	await TerrainsService.initialize();
	await PlayersService.initialize();
	await QueueingService.initialize();
	await GamesService.initialize();
})();
