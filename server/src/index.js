import LoggerService from './logger/logger.service.js';
import ConfigService from './config/config.service.js';
import DatabaseService from './database/database.service.js';
import AppService from './app/app.service.js';
import WebsocketService from './websocket/websocket.service.js';

import PlayersService from './players/players.service.js';

(async function() {
	await LoggerService.initialize();
	await ConfigService.initialize();
    await DatabaseService.initialize();
	await AppService.initialize();
	await WebsocketService.initialize();

	await PlayersService.initialize();
})();
