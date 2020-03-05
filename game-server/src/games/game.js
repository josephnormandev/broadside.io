import { Simulation, Maps } from 'game';

import LoggerService from '../logger/logger.service.js';

import GamePlayer from '../players/game-player.js';
import teamAssignmentMessage from '../players/messages/team-assignment.js';
import bundledMessage from '../players/messages/bundled.js';
import addObjectMessage from '../players/messages/add-object.js';
import updateObjectMessage from '../players/messages/update-object.js';

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

        this.simulation = new Simulation();
        this.simulation.createFromMap(new Maps.TestMap());

        var self = this;
        this.game_loop = setInterval(function() {
            self.update();
        }, 1000 / 60);
        this.send_loop = setInterval(function() {
            self.send();
        }, 1000 / 20);
    }

    update()
    {
        this.simulation.update();
    }

    send()
    {
        for(const game_player of Object.values(this.players))
        {
            var update_objects = this.simulation.getUpdateObjects();
            var messages = [];

            for(const update_object of Object.values(update_objects))
            {
                messages.push(updateObjectMessage(update_object));
            }
            game_player.send(bundledMessage(messages));
        }
    }

    playerJoin(player)
    {
        for(const team_num in this.players)
        {
            var game_player = this.players[team_num];
            if(game_player.equals(player))
            {
                game_player.send(teamAssignmentMessage(team_num));

                var base_objects = this.simulation.getBaseObjects();
                var messages = [];

                for(const base_object of Object.values(base_objects))
                {
                    messages.push(addObjectMessage(base_object));
                }

                game_player.send(bundledMessage(messages));
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
        if(Game.Service.receivers.has(receiver))
        {
            var game_player = null;
            for(const team_num in this.players)
            {
                if(this.players[team_num].equals(player))
                    game_player = this.players[team_num];
            }
            Game.Service.receivers.get(receiver).receive(
                this, game_player, data,
            );
        }
    }
}
