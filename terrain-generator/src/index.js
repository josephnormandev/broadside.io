import { Objects } from 'game';

import Heightmap from 'ds-heightmap';

Heightmap.init(10, {
	corner: [2, 2, 2, 2],
	offset: 0.2,
	range: 10,
	rough: .8,
});
Heightmap.run();

const heightmap = Heightmap.out();

var index = 0;

var y = 0;
var x = 0;

for(y = 0; y < heightmap.length; y ++)
{
	for(x = 0; x < heightmap[y].length; x ++)
	{
		console.log(heightmap[y][x]);
	}
}
