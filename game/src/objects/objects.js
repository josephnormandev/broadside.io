import Ship from './ships/ship.js';

import Tile from './tiles/tile.js';

export function getType(object)
{
    switch(object.type)
    {
        case Ship.TYPE():
            return Ship;
        case Tile.TYPE():
            return Tile;
        default:
            throw 'Unknown Type!';
    }
}

export default {
    Ship,
    getType,
};
