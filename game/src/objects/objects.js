import Ship from './ships/ship.js';

import Tile from './tiles/tile.js';
import WaterTile from './tiles/water-tile.js';
import GroundTile from './tiles/ground-tile.js';
import WorldBound from './tiles/world-bound.js';

export function getType(object)
{
    switch(object.type)
    {
        case Ship.TYPE():
            return Ship;
        case Tile.TYPE():
            return Tile;
        case GroundTile.TYPE():
            return GroundTile;
        case WaterTile.TYPE():
            return WaterTile;
        case WorldBound.TYPE():
            return WorldBound;
        default:
            throw 'Unknown Type!';
    }
}

export default {
    Ship,
    Tile,
    WaterTile,
    GroundTile,
    WorldBound,
    getType,
};
