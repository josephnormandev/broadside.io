import { Simulation, Maps } from 'game';

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

        this.players = {
            1: new GamePlayer(game.player_1, 1, this),
            2: new GamePlayer(game.player_2, 2, this),
        };

        this.simulation = new Simulation(new Maps.TestMap());
    }

    hasPlayer(player)
    {
        return this.getPlayer(player) != null;
    }

    getPlayer(player)
    {
        for(const game_player of Object.values(this.players))
        {
            if(game_player.equals(player))
                return game_player;
        }
        return null;
    }

    handleMessage(player, receiver, data)
    {
        if(Game.Service.receivers.has(receiver))
        {
            if(this.players[1].equals(player))
                Game.Service.receivers.get(receiver).receive(
                    this, this.players[1], this.players[2], data,
                );
            else if(this.players[2].equals(player))
                Game.Service.receivers.get(receiver).receive(
                    this, this.players[2], this.players[1], data,
                );
        }
    }
}
