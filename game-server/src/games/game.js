import LoggerService from '../logger/logger.service.js';

import GamePlayer from '../players/game-player.js';

export default class Game
{
    static Service = null;

    static initialize(service)
    {
        Game.Service = service;
    }

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
        if(Game.Service.receivers.has(receiver))
        {
            if(this.player_1.equals(player))
                Game.Service.receivers.get(receiver).receive(
                    this, this.player_1, this.player_2, data,
                );
            else if(this.player_2.equals(player))
                Game.Service.receivers.get(receiver).receive(
                    this, this.player_2, this.player_1, data,
                );
        }
    }
}
