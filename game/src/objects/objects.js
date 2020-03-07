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

const types = {
    'game-object': ['game-object', 'ship', 'tile', 'water-tile', 'ground-tile', 'world-bound'],
    'ship': ['ship'],
    'tile': ['tile', 'water-tile', 'ground-tile'],
    'water-tile': ['water-tile'],
    'ground-tile': ['ground-tile'],
    'world-bound': ['world-bound'],
};

function isType(object, type)
{
    if(types[type] != null)
        return types[type].includes(object.type);
}

function getOfType(objects, type)
{
    var type_objects = new Map();
    for(var [s_id, object] of objects)
    {
        if(isType(object, type))
        {
            type_objects.set(s_id, object)
        }
    }
    return type_objects;
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
    getOfType,
};
