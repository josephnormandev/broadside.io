import Matter from 'matter-js';
const { Common, Vector } = Matter;

import { Objects } from 'game';

import Heightmap from 'ds-heightmap';

Heightmap.init(6, {
	corner: [2, 2, 2, 2],
	offset: 0.2,
	range: 20,
	rough: .8,
});
Heightmap.run();

const heightmap = Heightmap.out();

var TILE_OUT = [];

// constants for radius etc
const radius = Objects.Tile.RADIUS();
const a = Math.cos(Math.PI / 6) * radius;
const b = 3 / 2 * radius;

// constants for height levels
const WATER_HEIGHT = 0;
const SAND_HEIGHT = 3;

// keeping track of position
var index = 0;
var y = 0;
var x = 0;
var col = 0;

const height = heightmap.length;
const width = heightmap[0].length;

for(y = 0; y < height; y ++)
{
	x = 0;
	for(col = 0; col < width; col ++)
	{
		if(y % 2 == 0 && col % 2 == 0 || y % 2 == 1 && col % 2 == 1) // even row: 0, 2, 4...
		{
			index = y * width + x; x ++;

			var position = null;
			if(y % 2 == 0)
				position = Vector.create(x * 2 * b, y * a);
			else
				position = Vector.create(x * 2 * b + b, y * a);

			const tile_height = heightmap[y][col] * 5 - 35;

			var type = [];
			if(tile_height > SAND_HEIGHT)
				type.push('grass-tile');
			else if(tile_height > WATER_HEIGHT)
				type.push('sand-tile');
			else
				type.push('water-tile');

			var adjacents = [];

			TILE_OUT.push({
				s_id: index,
				type: type,
				height: tile_height,
				position: position,
				angle: Math.PI / 2,
				adjacents: adjacents,
			});
			console.log(x);
		}
	}
}

console.log(JSON.stringify(TILE_OUT));
