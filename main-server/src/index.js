import ConfigService from './config/config.service.js';
import DatabaseService from './database/database.service.js';
import AuthService from './auth/auth.service.js';
import AppService from './app/app.service.js';

(async function() {
	await ConfigService.initialize();
	await DatabaseService.initialize();
	await AuthService.initialize();
	await AppService.initialize();
})();
