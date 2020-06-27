import GameObject from './game-object.js';
	import Static from './statics/static.js';
		import Tile from './statics/tiles/tile.js';
			import GroundTile from './statics/tiles/ground-tile.js';
				import SandTile from './statics/tiles/ground-tiles/sand-tile.js';
				import GrassTile from './statics/tiles/ground-tiles/grass-tile.js';
			import WaterTile from './statics/tiles/water-tile.js';
		import WorldBorder from './statics/world-border.js';
	import Dynamic from './dynamics/dynamic.js';
		import Ship from './dynamics/ships/ship.js';

import Categories from './categories.js';


const objects = new Map();
objects.set(GameObject.TYPE, GameObject);
	objects.set(Static.TYPE, Static);
		objects.set(Tile.TYPE, Tile);
			objects.set(GroundTile.TYPE, GroundTile);
				objects.set(SandTile.TYPE, SandTile);
				objects.set(GrassTile.TYPE, GrassTile);
			objects.set(WaterTile.TYPE, WaterTile);
		objects.set(WorldBorder.TYPE, WorldBorder);
	objects.set(Dynamic.TYPE, Dynamic);
		objects.set(Ship.TYPE, Ship);

function getType(object)
{
	if(object.type != null)
	{
		if(objects.has(object.type))
		{
			return objects.get(object.type);
		}
		throw `getType - No such type: '${ object.type }'`;
	}
	throw `getType - No type provided`;
}

function getOneOfType(objects, type)
{
	for(const [s_id, object] of objects)
	{
		if(isType(object, type))
			return object;
	}
	return null;
}

function getOfType(objects, type)
{
	const objects_of_type = new Map();

	for(const [s_id, object] of objects)
	{
		if(isType(object, type))
		{
			objects_of_type.set(s_id, object);
		}
	}

	return objects_of_type;
}

// this method is actual genius
function isType(object, type)
{
	var type_class = getType(object);

	while(type_class != null && type_class.TYPE != null)
	{
		if(type_class.TYPE == type)
			return true;
		type_class = Object.getPrototypeOf(type_class);
	}
	return false;
}

export {
	GameObject,
		Static,
			Tile,
				GroundTile,
					SandTile,
					GrassTile,
				WaterTile,
			WorldBorder,
		Dynamic,
			Ship,
	Categories,
	getType,
	getOfType,
	getOneOfType,
	isType,
};
