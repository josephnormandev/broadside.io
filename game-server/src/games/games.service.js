import LoggerService from '../logger/logger.service.js';

import Game from './game.js';
import * as SetPositionReceiver from '../players/receivers/set-position.js';

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
        GamesService.receivers.set(SetPositionReceiver.receiver, SetPositionReceiver);
    }

    static createGame(game)
    {
        GamesService.games.set(game.id, game);
        GamesService.game_players.set(game.player_1.token, game.id);
        GamesService.game_players.set(game.player_2.token, game.id);

        LoggerService.cyan(`Game '${ game.id }' has been created`);
    }

    static endGame(game)
    {
        if(GamesService.games.has(game.id))
        {
            var game = GamesService.games.get(game.id);
            GamesService.game_players.delete(game.player_1.token);
            GamesService.game_players.delete(game.player_2.token);
            GamesService.games.delete(game.id);

            LoggerService.red(`Game '${ game.id }' has ended`);
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
            console.log(player, receiver, data);
            var game_id = GamesService.game_players.get(player.token);
            GamesService.games.get(game_id).handleMessage(player, receiver, data);
        }
    }
}
