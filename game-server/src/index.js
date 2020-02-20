import ConfigService from './config/config.service.js';
import LoggerService from './logger/logger.service.js';

import { MainService } from './main/main.service.js';
import { GamesService } from './games/games.service.js';
import { PlayersService } from './players/players.service.js';

(async function() {
    await LoggerService.initialize();
    await ConfigService.initialize();

    await MainService.initialize();
    await GamesService.initialize();
    await PlayersService.initialize();
})();
