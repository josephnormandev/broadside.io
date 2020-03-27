export const receiver = 'end-map-stream';

import { getOfType, GroundTile, WaterTile } from '../../../objects/objects.js';

export function receive(renderer, data)
{
    var ground_tiles = getOfType(renderer.objects, GroundTile.TYPE());
    for(var [s_id, ground_tile] of ground_tiles)
    {
        GroundTile.create3D(ground_tile);
    }

    var water_tiles = getOfType(renderer.objects, WaterTile.TYPE());
    for(var [s_id, water_tile] of water_tiles)
    {
        WaterTile.create3D(water_tile);
    }
}
