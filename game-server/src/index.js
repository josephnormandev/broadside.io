import ConfigService from './config/config.service.js';
import LoggerService from './logger/logger.service.js';

(async function() {
    await LoggerService.initialize();
    await ConfigService.initialize();
})();
