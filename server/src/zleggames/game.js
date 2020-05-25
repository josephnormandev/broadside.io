import { Simulation, Maps } from 'game';

import LoggerService from '../logger/logger.service.js';

import GamePlayer from '../players/game-player.js';

import bundledMessage from '../players/messages/bundled.js';

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

        this.simulation = new Simulation(this, Maps.loadMap());
    }

    sendPlayerMessage(team_num, message)
    {
        this.players[team_num].send(message);
    }

    playerJoin(player)
    {
        for(const team_num in this.players)
        {
            var game_player = this.players[team_num];
            if(game_player.equals(player))
            {
                game_player.send(this.simulation.getBaseObjectMessages(team_num));
            }
        }
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

    playerLeave(player)
    {

    }

    handleMessage(player, receiver, data)
    {
        var game_player = null;
        for(const team_num in this.players)
        {
            if(this.players[team_num].equals(player))
                game_player = this.players[team_num];
        }

        if(Game.Service.receivers.has(receiver))
        {
            Game.Service.receivers.get(receiver).receive(
                this, game_player, data,
            );
        }
        else
        {
            this.simulation.handleMessage(game_player.team_num, receiver, data);
        }
    }
}
