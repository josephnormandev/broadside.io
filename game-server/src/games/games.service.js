import LoggerService from '../logger/logger.service.js';

import { PlayersService, GamePlayer } from '../players/players.service.js';
import * as SetPositionReceiver from '../players/receivers/set-position.js';

export class GamesService
{
    static games;

    static initialize()
    {
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

export class Game
{
    constructor(game)
    {
        this.id = game.id;

        this.player_1 = new GamePlayer(game.player_1, 1, this);
        this.player_2 = new GamePlayer(game.player_2, 2, this);
    }

    checkOnline()
    {
        if(this.player_1.online && this.player_2.online)
        {
            LoggerService.blue(`Game starting, (2/2 online)`);
        }
        else if(this.player_1.online)
        {
            LoggerService.blue(`Waiting, (1/2 online)`);
        }
        else if(this.player_2.online)
        {
            LoggerService.blue(`Waiting, (1/2 online)`);
        }
        else
        {
            LoggerService.blue(`Waiting, (0/2 online)`);
        }
    }

    hasPlayer(player)
    {
        return this.getPlayer(player) != null;
    }

    getPlayer(player)
    {
        if(this.player_1.equals(player))
        {
            return this.player_1;
        }
        else if(this.player_2.equals(player))
        {
            return this.player_2;
        }
        return null;
    }

    handleMessage(player, receiver, data)
    {
        if(GamesService.receivers.has(receiver))
        {
            if(this.player_1.equals(player))
                GamesService.receivers.get(receiver).receive(
                    this, this.player_1, this.player_2, data,
                );
            else if(this.player_2.equals(player))
                GamesService.receivers.get(receiver).receive(
                    this, this.player_2, this.player_1, data,
                );
        }
    }
}
