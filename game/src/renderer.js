import Matter from 'matter-js';
const { Engine, Render, World, Bodies, Body, Common } = Matter;

import { getType } from './objects/objects.js';

import { AddObjectReceiver, BundledReceiver, RemoveObjectReceiver, TeamAssignmentReceiver, UpdateObjectReceiver } from './io/outputs/outputs.js';

export default class Renderer
{
    constructor(element)
    {
        this.team_num = null;

        this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        this.objects = new Map();

        this.render = Render.create({
            element: element,
            engine: this.engine,
            options: {
                wireframes: false,
            },
        });

        Engine.run(this.engine);
        Render.run(this.render);

        this.receivers = new Map();
        this.receivers.set(AddObjectReceiver.receiver, AddObjectReceiver);
        this.receivers.set(BundledReceiver.receiver, BundledReceiver);
        this.receivers.set(RemoveObjectReceiver.receiver, RemoveObjectReceiver);
        this.receivers.set(TeamAssignmentReceiver.receiver, TeamAssignmentReceiver);
        this.receivers.set(UpdateObjectReceiver.receiver, UpdateObjectReceiver);
    }

    handleMessage(receiver, data)
    {
        if(this.receivers.has(receiver))
        {
            this.receivers.get(receiver).receive(this, data);
        }
    }

    addObject(base_object)
    {
        var game_object = getType(base_object).create(this, base_object);
        this.objects.set(game_object.s_id, game_object);
        World.addBody(this.engine.world, game_object);

        // some more stuff here to add it to any potential renderer, ie Three.JS
    }

    updateObject(update_object)
    {
        if(this.objects.has(update_object.s_id))
        {
            var game_object = this.objects.get(update_object.s_id);
            getType(game_object).update(game_object, update_object);
        }
    }

    removeObject(remove_object)
    {
        if(this.objects.has(remove_object.s_id))
        {
            this.objects.delete(remove_object.s_id);
        }
    }
}
