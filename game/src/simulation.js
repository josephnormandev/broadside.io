import Matter from 'matter-js';
const { Engine, Render, World, Bodies, Body, Common } = Matter;

import GameObject from './objects/game-object.js';
import { getType } from './objects/objects.js';

export default class Simulation
{
    constructor()
    {
        this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        this.render = null;

        this.objects = new Map();
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
        });
        Engine.run(this.engine);
        Render.run(this.render);
    }

    update(time)
    {
        Engine.update(this.engine, time);

        var game_object = this.objects.get(3);

        Body.rotate(game_object, .01);
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
            update_objects[id] = getType(object).getUpdateObject(object);
        }
        return update_objects;
    }

    // used in the frontend to parse those dumps from the backend
    addObject(base_object)
    {
        var game_object = getType(base_object).create(base_object);
        this.objects.set(game_object.id, game_object);
        World.addBody(this.engine.world, game_object);
    }

    updateObject(update_object)
    {
        if(this.objects.has(update_object.id))
        {
            var game_object = this.objects.get(update_object.id);
            getType(game_object).update(game_object, update_object);
        }
    }
}
