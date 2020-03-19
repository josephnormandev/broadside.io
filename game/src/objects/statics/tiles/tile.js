import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import { Static, Categories, addType } from '../../objects.js';

export default class Tile extends Static
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

        addType(base_object.type, Tile.TYPE());

        var tile = Static.create(
            simulation, base_object,
            Bodies.polygon(0, 0, 6, 20, {
                angle: Math.PI / 2,
            }),
        );
        tile.adjacents = base_object.adjacents;

        return tile;
    }

    static getBaseObject(tile)
    {
        return {
            ...Static.getBaseObject(tile),
            adjacents: tile.adjacents,
        };
    }

    // returns the IDs of the given tiles that form the shortest path from start
    // to destination
    static getShortestTilePath(tiles, start_pos, destination_pos)
    {
        var start_tile = Tile.getObjectAtPosition(tiles, start_pos);
        var destination_tile = Tile.getObjectAtPosition(tiles, destination_pos);

        if(start_tile != null && destination_tile != null)
        {
            var unvisited_nodes = new Set();
            var paths = new Map();
            for(var s_id of tiles.keys())
            {
                paths.set(s_id, {
                    from: null,
                    distance: s_id == start_tile.s_id ? 0 : Infinity,
                });
                unvisited_nodes.add(s_id);
            }

            while(unvisited_nodes.size > 0)
            {
                var minimum_s_id = null;
                var minimum = Infinity;
                for(var unvisited of unvisited_nodes)
                {
                    if(paths.get(unvisited).distance < minimum)
                    {
                        minimum_s_id = unvisited;
                        minimum = paths.get(unvisited).distance;
                    }
                }
                unvisited_nodes.delete(minimum_s_id);

                for(var adjacent of tiles.get(minimum_s_id).adjacents)
                {
                    if(!paths.has(adjacent)) continue;
                    // if the distance from start to visiting is less than
                    if(paths.get(minimum_s_id).distance + 1 < paths.get(adjacent).distance)
                    {
                        paths.get(adjacent).from = minimum_s_id;
                        paths.get(adjacent).distance = paths.get(minimum_s_id).distance + 1;
                    }
                }
            }

            var condensed_path = [];
            var last = destination_tile.s_id;
            while(last != null)
            {
                condensed_path.unshift(last);
                last = paths.get(last).from;
            }
            return condensed_path;
        }
        return null;
    }
}
