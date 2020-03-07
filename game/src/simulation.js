import Matter from 'matter-js';
const { Engine, Render, World, Bodies, Body, Common } = Matter;

import { isType, getType, Ship, GameObject } from './objects/objects.js';

import { SetPositionCommand } from './commands/commands.js';

export default class Simulation
{
    constructor()
    {
        this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        this.render = null;

        this.objects = new Map();

        this.handlers = new Map();
        this.handlers.set(SetPositionCommand.name, SetPositionCommand.handle);

        this.loops = 0;
    }

    // used in the backend to load all of the settings from a map file
    createFromMap(map)
    {
        for(var base_object of map.objects)
        {
            this.addObject(base_object);
        }
    }

    // used in the frontend to make this a rendered simulation
    createRender(element)
    {
        this.render = Render.create({
            element: element,
            engine: this.engine,
            options: {
                wireframes: false,
            }
        });
        Engine.run(this.engine);
        Render.run(this.render);
    }

    update(time)
    {
        Engine.update(this.engine, time);

        this.loops ++;

        if(this.loops % 60 == 0)
        {
            for(var [s_id, game_object] of this.objects)
            {
                if(isType(game_object, Ship.TYPE()))
                {
                    Ship.update(game_object);
                }
            }
        }
    }

    // used in the backend to dump all of the objects to a parseable format
    // to be sent to the frontend
    getBaseObjects()
    {
        var base_objects = {};
        for(var [id, object] of this.objects)
        {
            base_objects[id] = getType(object).getBaseObject(object);
        }
        return base_objects;
    }

    getUpdateObjects()
    {
        var update_objects = {};
        for(var [id, object] of this.objects)
        {
            var update_object = getType(object).getUpdateObject(object);
            if(Object.entries(update_object).length != 0)
                update_objects[id] = update_object;
        }
        return update_objects;
    }

    handleCommand(team_num, command)
    {
        if(this.handlers.has(command.name))
        {
            this.handlers.get(command.name)(this, team_num, command.data);
        }
    }

    // used in the frontend to parse those dumps from the backend
    addObject(base_object)
    {
        var game_object = getType(base_object).create(this, base_object);
        this.objects.set(game_object.s_id, game_object);
        World.addBody(this.engine.world, game_object);
    }

    updateObject(update_object)
    {
        if(this.objects.has(update_object.s_id))
        {
            var game_object = this.objects.get(update_object.s_id);
            getType(game_object).updateFromServer(game_object, update_object);
        }
    }
}
