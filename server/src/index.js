import LoggerService from './logger/logger.service.js';
import ConfigService from './config/config.service.js';
import DatabaseService from './database/database.service.js';

(async function() {
	await LoggerService.initialize();
	await ConfigService.initialize();
    await DatabaseService.initialize();
})();
