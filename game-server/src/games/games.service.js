import LoggerService from '../logger/logger.service.js';

import Game from './game.js';

import PlayersService from '../players/players.service.js';
import * as SetPositionReceiver from '../players/receivers/set-position.js';

export default class GamesService
{
    static games;

    static initialize()
    {
        Game.initialize(GamesService);

        GamesService.games = new Map();

        GamesService.receivers = new Map();
        GamesService.receivers.set(SetPositionReceiver.receiver, SetPositionReceiver);
    }

    static createGame(id, game)
    {
        GamesService.games.set(id, game);
        LoggerService.cyan(`Game '${ id }' has been created`);
    }

    static playerJoin(player)
    {
        for(var [game_id, game] of GamesService.games)
        {
            if(game.hasPlayer(player))
            {
                game.checkOnline();
            }
        }
    }

    static isPlayerInGame(player)
    {
        var game_player = GamesService.getGamePlayer(player);
        return game_player != null;
    }

    static getGamePlayer(player)
    {
        for(var [game_id, game] of GamesService.games)
        {
            if(game.hasPlayer(player))
            {
                return game.getPlayer(player);
            }
        }
        return null;
    }

    static handleGameMessage(player, receiver, data)
    {
        for(var [game_id, game] of GamesService.games)
        {
            if(game.hasPlayer(player))
            {
                game.handleMessage(player, receiver, data);
            }
        }
    }

    static playerLeave(player)
    {
        for(var [game_id, game] of GamesService.games)
        {
            if(game.hasPlayer(player))
            {
                game.checkOnline();
            }
        }
    }
}
