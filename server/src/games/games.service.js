import LoggerService from '../logger/logger.service.js';

import Game from './game.js';

import * as BundledReceiver from '../players/receivers/bundled.js';

export default class GamesService
{
    static games;
    static game_players;

    static initialize()
    {
        Game.initialize(GamesService);

        GamesService.games = new Map();
        GamesService.game_players = new Map();

        GamesService.receivers = new Map();
        GamesService.receivers.set(BundledReceiver.receiver, BundledReceiver);
    }

    static createGame(game)
    {
        GamesService.games.set(game.id, game);
        for(var player of Object.values(game.players))
        {
            GamesService.game_players.set(player.token, game.id);
        }

        LoggerService.cyan(`Game '${ game.id }' has been created`);
    }

    static endGame(game)
    {
        if(GamesService.games.has(game.id))
        {
            var game = GamesService.games.get(game.id);
            for(var player of Object.values(game.players))
            {
                GamesService.game_players.delete(player.token);
            }
            GamesService.games.delete(game.id);

            LoggerService.red(`Game '${ game.id }' has ended`);
        }
    }

    static playerJoin(player)
    {
        if(GamesService.game_players.has(player.token))
        {
            var game_id = GamesService.game_players.get(player.token);
            GamesService.games.get(game_id).playerJoin(player);
        }
    }

    static isPlayerInGame(player)
    {
        return GamesService.game_players.has(player.token);
    }

    static getGamePlayer(player)
    {
        if(GamesService.game_players.has(player.token))
        {
            var game_id = GamesService.game_players.get(player.token);
            var game = GamesService.games.get(game_id);

            return game.getPlayer(player);
        }
        return null;
    }

    static handleGameMessage(player, receiver, data)
    {
        if(GamesService.game_players.has(player.token))
        {
            var game_id = GamesService.game_players.get(player.token);
            GamesService.games.get(game_id).handleMessage(player, receiver, data);
        }
    }

    static playerLeave(player)
    {
        if(GamesService.game_players.has(player.token))
        {
            var game_id = GamesService.game_players.get(player.token);
            GamesService.games.get(game_id).playerLeave(player);
        }
    }
}
