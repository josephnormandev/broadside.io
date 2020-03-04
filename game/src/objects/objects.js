import Ship from './ships/ship.js';

import Tile from './tiles/tile.js';
import WorldBound from './tiles/world-bound.js';

export function getType(object)
{
    switch(object.type)
    {
        case Ship.TYPE():
            return Ship;
        case Tile.TYPE():
            return Tile;
        case WorldBound.TYPE():
            return WorldBound;
        default:
            throw 'Unknown Type!';
    }
}

export default {
    Ship,
    Tile,
    WorldBound,
    getType,
};
