import GameObject from './game-object.js';
	import Static from './statics/static.js';
		import Tile from './statics/tiles/tile.js';
			import GroundTile from './statics/tiles/ground-tile.js';
				import SandTile from './statics/tiles/ground-tiles/sand-tile.js';
				import GrassTile from './statics/tiles/ground-tiles/grass-tile.js';
			import WaterTile from './statics/tiles/water-tile.js';
		import WorldBorder from './statics/world-border.js';

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

export {
	GameObject,
		Static,
			Tile,
				GroundTile,
					SandTile,
					GrassTile,
				WaterTile,
			WorldBorder,
	Categories,
	getType,
};
