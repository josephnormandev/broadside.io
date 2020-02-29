import Matter from 'matter-js';
const { Engine, Render, World, Bodies, Common } = Matter;

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
        for(var [id, object] of map.objects)
        {
            this.addObject(object);
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
    }

    // used in the backend to dump all of the objects to a parseable format
    // to be sent to the frontend
    getObjectBases()
    {
        var object_bases = {};
        for(var [id, object] of this.objects)
        {
            object_bases[id] = getType(object).getBase(object);
        }
        return object_bases;
    }

    addObject(object)
    {
        this.objects.set(object.id, object);
        World.addBody(this.engine.world, object);
    }
}
