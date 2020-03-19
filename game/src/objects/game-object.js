import Matter from 'matter-js';
const { Body, Bounds, Vector } = Matter;

import { addType } from './objects.js';

// GameObject or any of its children with the 3 part constructor is ABSTRACT
// and should not be instantiated
export default class GameObject
{
    static TYPE()
    {
        return 'game-object';
    }

    static create(simulation, base_object, body)
    {
        if(base_object.s_id == null)
            throw 'Missing Parameter - GameObject.s_id';
        if(base_object.position == null)
            throw 'Missing Parameter - GameObject.position';
        if(base_object.angle == null)
            throw 'Missing Parameter - GameObject.angle';
        if(base_object.category == null)
            throw 'Missing Parameter - GameObject.category';
        if(base_object.type == null)
            throw 'Cannot create of Abstract GameObject';
        else
        {
            addType(base_object.type, GameObject.TYPE());
        }

        var game_object = body;
        game_object.simulation = simulation;
        game_object.s_id = base_object.s_id;
        game_object.type = base_object.type;
        game_object.collisionFilter.category = base_object.category;

        if(base_object.mask != null)
            game_object.collisionFilter.mask = base_object.mask;
        if(base_object.position != null)
            Body.setPosition(game_object, base_object.position);
        if(base_object.angle != null)
            Body.setAngle(game_object, base_object.angle);

        return game_object;
    }

    static getObjectAtPosition(game_objects, position)
    {
        for(var [s_id, game_object] of game_objects)
        {
            if(Bounds.contains(game_object.bounds, position))
            {
                return game_object;
            }
        }
        return null;
    }

    static getBaseObject(game_object)
    {
        return {
            s_id: game_object.s_id,
            type: game_object.type,
            position: game_object.position,
            angle: game_object.angle,
        };
    }
}
