import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import GameObject from '../game-object.js';
import Categories from '../categories.js';

export default class WorldBound extends GameObject
{
    static TYPE()
    {
        return 'world-bound';
    }

    static create(base_object)
    {
        if(base_object.width == null)
            throw 'Missing Parameter - WorldBound.width';
        if(base_object.height == null)
            throw 'Missing Parameter - WorldBound.height';

        const width = base_object.width;
        const height = base_object.height;
        const border = 5;

        base_object.type = WorldBound.TYPE();
        base_object.isStatic = true;
        base_object.category = Categories.Border;
        var game_object = GameObject.create(
            base_object,
            Body.create({
                parts: [
                    Bodies.rectangle(width / 2, 0 - border / 2, width, border), // top rectangle
                    Bodies.rectangle(0 - border / 2, height / 2, border, height), // left rectangle
                    Bodies.rectangle(width + border / 2, height / 2, border, height), // right rectangle
                    Bodies.rectangle(width / 2, height + border / 2, width, border), // bottom rectangle
                ],
            }),
        );
        game_object.width = width;
        game_object.height = height;
        return game_object;
    }

    static getBaseObject(world_bound)
    {
        return {
            ...GameObject.getBaseObject(world_bound),
            width: world_bound.width,
            height: world_bound.height,
        };
    }
}
