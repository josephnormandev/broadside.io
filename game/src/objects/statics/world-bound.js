import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import { Static, Categories, addType } from '../objects.js';

export default class WorldBound extends Static
{
    static TYPE()
    {
        return 'world-bound';
    }

    static create(simulation, base_object)
    {
        if(base_object.width == null)
            throw 'Missing Parameter - WorldBound.width';
        if(base_object.height == null)
            throw 'Missing Parameter - WorldBound.height';

        const width = base_object.width;
        const height = base_object.height;
        const border = 5;

        base_object.type = []; addType(base_object.type, WorldBound.TYPE());
        base_object.category = Categories.Border;
        var world_bound = Static.create(
            simulation, base_object,
            Body.create({
                parts: [
                    Bodies.rectangle(width / 2, 0 - border / 2, width, border), // top rectangle
                    Bodies.rectangle(0 - border / 2, height / 2, border, height), // left rectangle
                    Bodies.rectangle(width + border / 2, height / 2, border, height), // right rectangle
                    Bodies.rectangle(width / 2, height + border / 2, width, border), // bottom rectangle
                ],
            }),
        );
        world_bound.width = width;
        world_bound.height = height;
        
        return world_bound;
    }

    static getBaseObject(world_bound)
    {
        return {
            ...Static.getBaseObject(world_bound),
            width: world_bound.width,
            height: world_bound.height,
        };
    }
}
