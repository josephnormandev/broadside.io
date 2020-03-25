import GameObject from './game-object.js';

import Dynamic from './dynamics/dynamic.js';
import Ship from './dynamics/ships/ship.js';
import Destroyer from './dynamics/ships/destroyer.js';
import AircraftCarrier from './dynamics/ships/aircraft-carrier.js';

import Static from './statics/static.js';
import WorldBound from './statics/world-bound.js';
import Tile from './statics/tiles/tile.js';
import WaterTile from './statics/tiles/water-tile.js';
import GroundTile from './statics/tiles/ground-tile.js';

function getType(object)
{
    switch(object.type[0])
    {
        case Dynamic.TYPE():
            return Dynamic;
        case Ship.TYPE():
            return Ship;
        case Destroyer.TYPE():
            return Destroyer;
        case AircraftCarrier.TYPE():
            return AircraftCarrier;
        case Static.TYPE():
            return Static;
        case WorldBound.TYPE():
            return WorldBound;
        case Tile.TYPE():
            return Tile;
        case GroundTile.TYPE():
            return GroundTile;
        case WaterTile.TYPE():
            return WaterTile;
        default:
            throw 'Unknown Type!';
    }
}

function addType(type_array, type)
{
    type_array.push(type);
}

function isType(object, type)
{
    if(object.type.includes(type))
    {
        return true;
    }
    return false;
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

import Categories from './categories.js';

export {
    GameObject,
    Dynamic,
    Ship,
    Destroyer,
    AircraftCarrier,
    Static,
    WorldBound,
    Tile,
    WaterTile,
    GroundTile,
    getType,
    isType,
    addType,
    getOfType,
    Categories,
};
