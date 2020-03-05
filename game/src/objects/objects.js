import GameObject from './game-object.js';

import Ship from './dynamics/ship.js';

import Tile from './tiles/tile.js';
import WaterTile from './tiles/water-tile.js';
import GroundTile from './tiles/ground-tile.js';
import WorldBound from './world-bound.js';

function getType(object)
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

function isType(object, type)
{

}

export {
    GameObject,
    Ship,
    Tile,
    WaterTile,
    GroundTile,
    WorldBound,
    getType,
    isType,
};
