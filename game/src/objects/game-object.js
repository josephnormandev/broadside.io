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
        Body.setPosition(game_object, base_object.position);
        Body.setAngle(game_object, base_object.angle);
        game_object.collisionFilter.category = base_object.category;
        game_object.type = base_object.type;

        if(base_object.mask != null)
            game_object.collisionFilter.mask = base_object.mask;

        return game_object;
    }

    static create3D(scene, game_object) { } // optional method

    static draw(game_object) { } // optional method

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
		console.log(game_object.type);
        return {
            s_id: game_object.s_id,
            type: game_object.type,
            rendered: game_object.rendered,
            position: game_object.position,
            angle: game_object.angle,
        };
    }
}
