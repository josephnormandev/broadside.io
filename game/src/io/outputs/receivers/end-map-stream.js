export const receiver = 'end-map-stream';

import { getOfType, Tile, GroundTile, WaterTile } from '../../../objects/objects.js';

export function receive(renderer, data)
{
    var ground_tiles = getOfType(renderer.objects, GroundTile.TYPE());
    for(var [s_id, ground_tile] of ground_tiles)
    {
        GroundTile.averageSurfaceHeights(ground_tile, ground_tiles);
        GroundTile.applyRockiness(ground_tile);
    }

    var water_tiles = getOfType(renderer.objects, WaterTile.TYPE());
    for(var [s_id, water_tile] of water_tiles)
    {
        WaterTile.averageSurfaceHeights(water_tile, water_tiles);
    }
}
