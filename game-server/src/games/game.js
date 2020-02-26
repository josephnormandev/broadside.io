import { Simulation } from 'game';

import LoggerService from '../logger/logger.service.js';

import GamePlayer from '../players/game-player.js';

// This game holds the players and keeps track of the game simulation. This also
// means that it controls the looping of the engine. It will also hold the game
// state. Also, it will get the inputs from those players and translate them into
// instructions on the simulation.

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
