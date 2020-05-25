import Config from '../../config.json';

import LoggerService from '../logger/logger.service.js';

export default class ConfigService
{
    static async initialize()
    {

    }

    static get(key)
    {
        var result = Config[key];

        if(result != null)
            return result;
        LoggerService.red(`Missing key: ${ key }`);
        process.exit(1);
    }
}
