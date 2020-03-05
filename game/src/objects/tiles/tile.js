import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import GameObject from '../game-object.js';

export default class Tile extends GameObject
{
    static TYPE()
    {
        return 'tile';
    }

    static create(base_object)
    {
        if(base_object.category == null)
            throw 'Missing Parameter - Tile.category';
        if(base_object.type == null)
            throw 'Cannot create of Abstract Tile';

        base_object.isStatic = true;
        var game_object = GameObject.create(
            base_object,
            Bodies.polygon(0, 0, 6, 20, {
                angle: Math.PI / 2,
            }),
        );
        return game_object;
    }
}
