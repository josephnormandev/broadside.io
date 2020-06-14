import Matter from 'matter-js';
const { Common, Vector } = Matter;

import * as FS from 'fs';

import generateNoise from 'heightmap-generator';

const heightmap = generateNoise(6, 8, false, 1);

var TILE_OUT = [];

// constants for radius etc
const radius = 10;
const a = Math.cos(Math.PI / 6) * radius;
const b = 3 / 2 * radius;

const height = heightmap.length;
var width = Math.min(heightmap[0].length && heightmap[1].length);
width = width % 2 == 0 ? width : width - 1;
const map_width = width / 2;

for(var y = 0; y < height; y ++)
{
	var x = 0;
	for(var col = 0; col < width; col ++)
	{
		if((y % 2 == 0 && col % 2 == 0) || (y % 2 == 1 && col % 2 == 1))
		{

			var position = null;
			if(y % 2 == 0)
				position = Vector.create(x * 2 * b, y * a);
			else
				position = Vector.create(x * 2 * b + b, y * a);

			const tile_height = heightmap[y][col] * 5 - 18;

			var type = '';
			if(tile_height >= 10)
				type = 'grass-tile';
			else if (tile_height > 0)
				type = 'sand-tile';
			else
				type = 'water-tile';

			const adjacents = [];

			if(y % 2 != 0)
			{
				if(y - 1 >= 0) // top-left
					adjacents.push((y - 1) * map_width + x);
				else
					adjacents.push(null);
				if(y - 2 >= 0) // top
					adjacents.push((y - 2) * map_width + x);
				else
					adjacents.push(null);
				if(x + 1 < map_width && y - 1 >= 0) // top-right
					adjacents.push((y - 1) * map_width + (x + 1));
				else
					adjacents.push(null);
				if(x + 1 < map_width && y + 1 < height) // bottom-right
					adjacents.push((y + 1) * map_width + (x + 1));
				else
					adjacents.push(null);
				if(y + 2 < height) // bottom
					adjacents.push((y + 2) * map_width + x);
				else
					adjacents.push(null);
				if(y + 1 < height) // bottom-left
					adjacents.push((y + 1) * map_width + x);
				else
					adjacents.push(null);
			}
			else
			{
				if(y - 1 >= 0 && x - 1 >= 0) // top-left
					adjacents.push((y - 1) * map_width + (x - 1));
				else
					adjacents.push(null);
				if(y - 2 >= 0) // top
					adjacents.push((y - 2) * map_width + x);
				else
					adjacents.push(null);
				if(y - 1 >= 0) // top-right
					adjacents.push((y - 1) * map_width + x);
				else
					adjacents.push(null);
				if(y + 1 < height) // bottom-right
					adjacents.push((y + 1) * map_width + x);
				else
					adjacents.push(null);
				if(y + 2 < height) // bottom
					adjacents.push((y + 2) * map_width + x);
				else
					adjacents.push(null);
				if(y + 1 < height && x - 1 >= 0) // bottom-left
					adjacents.push((y + 1) * map_width + (x - 1));
				else
					adjacents.push(null);
			}

			TILE_OUT.push({
				type: type,
				height: tile_height,
				position: position,
				angle: Math.PI / 2,
				adjacents: adjacents,
			});
			x ++;
		}
	}
}

const map_width_b = map_width * 2 * b - b;
const map_height = height * a - a;

TILE_OUT.push({
	type: 'world-border',
	width: map_width_b,
	height: map_height,
	position: Vector.create(map_width_b / 2, map_height / 2),
	angle: 0,
});

FS.writeFileSync('/home/joseph/broadside.io/server/src/terrains/generated-map.json', JSON.stringify(TILE_OUT));
