import Matter from 'matter-js';
const { Body, Bodies, Bounds, Vector } = Matter;

import GameObject from '../game-object.js';

export default class Tile extends GameObject
{
    static TYPE()
    {
        return 'tile';
    }

    static create(simulation, base_object)
    {
        if(base_object.category == null)
            throw 'Missing Parameter - Tile.category';
        if(base_object.type == null)
            throw 'Cannot create of Abstract Tile';
        if(base_object.adjacents == null)
            throw 'Missing Parameter - Tile.adjacents';

        base_object.isStatic = true;
        var game_object = GameObject.create(
            simulation, base_object,
            Bodies.polygon(0, 0, 6, 20, {
                angle: Math.PI / 2,
            }),
        );
        game_object.adjacents = base_object.adjacents;
        return game_object;
    }

    static getBaseObject(tile)
    {
        return {
            ...GameObject.getBaseObject(tile),
            adjacents: tile.adjacents,
        };
    }

    static getTileAtPosition(tiles, position)
    {
        for(var [s_id, tile] of tiles)
        {
            if(Bounds.contains(tile.bounds, position))
            {
                return tile;
            }
        }
        return null;
    }

    static getShortestPath(tiles, start_pos, destination_pos)
    {
        var start_tile = Tile.getTileAtPosition(tiles, start_pos);
        var destination_tile = Tile.getTileAtPosition(tiles, destination_pos);

        if(start_tile != null && destination_tile != null)
        {
            console.log(destination_tile.s_id, destination_tile.adjacents);
        }
        return null;
    }
}
