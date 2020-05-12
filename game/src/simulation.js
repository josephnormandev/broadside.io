import Matter from 'matter-js';
const { Engine, Render, World, Bodies, Body, Common } = Matter;

import { isType, getType, Dynamic, Tile } from './objects/objects.js';

import { bundledMessage, endMapStreamMessage, addObjectMessage, teamAssignmentMessage, updateObjectMessage } from './io/outputs/outputs.js';
import { BundledReceiver } from './io/inputs/inputs.js';

export default class Simulation
{
    constructor(game, map)
    {
        this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        this.objects = new Map();

        this.game = game;
        for(var base_object of map)
        {
            this.addObject(base_object);
        }

        var self = this;
        this.game_loop = setInterval(function() {
            self.update(1000 / 60);
        }, 1000 / 60);
        this.send_loop = setInterval(function() {
            self.send(1000 / 20);
        }, 1000 / 20);

        this.receivers = new Map();
        this.receivers.set(BundledReceiver.receiver, BundledReceiver);
    }

    update(time)
    {
        Engine.update(this.engine, time);

        for(var [s_id, game_object] of this.objects)
        {
            if(isType(game_object, Dynamic.TYPE()))
            {
                Dynamic.tick(game_object);
            }
        }
    }

    handleMessage(team_num, receiver, data)
    {
        if(this.receivers.has(receiver))
        {
            this.receivers.get(receiver).receive(this, team_num, data);
        }
    }

    addObject(base_object)
    {
        var game_object = getType(base_object).create(this, base_object);
        this.objects.set(game_object.s_id, game_object);
        World.addBody(this.engine.world, game_object);
    }

    send(time)
    {
        for(var team_num of [1, 2])
        {
            this.game.sendPlayerMessage(
                team_num,
                this.getUpdateObjectMessages(team_num),
            );
        }
    }

    getBaseObjectMessages(team_num)
    {
        var base_object_messages = [];
        base_object_messages.push(teamAssignmentMessage(team_num));

        // send TILES first as part of the map
        for(var [id, object] of this.objects)
        {
            if(isType(object, Tile.TYPE()))
                base_object_messages.push(addObjectMessage(getType(object).getBaseObject(object)));
        }
        base_object_messages.push(endMapStreamMessage());

        // send the rest
        for(var [id, object] of this.objects)
        {
            if(!isType(object, Tile.TYPE()))
                base_object_messages.push(addObjectMessage(getType(object).getBaseObject(object)));
        }

        return bundledMessage(base_object_messages);
    }

    getUpdateObjectMessages(team_num)
    {
        var update_object_messages = [];
        for(var [id, object] of this.objects)
        {
            if(isType(object, Dynamic.TYPE()))
                update_object_messages.push(updateObjectMessage(getType(object).getUpdateObject(object)));
        }
        return bundledMessage(update_object_messages);
    }
}
