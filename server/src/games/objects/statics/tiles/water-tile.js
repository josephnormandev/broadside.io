import Matter from 'matter-js';

import { Tile, Categories } from '../../objects.js';

export default class WaterTile extends Tile
{
	static TYPE = 'water-tile';

	static create(definers, base)
	{
		const tile = Tile.create({
			type: WaterTile.TYPE,
			category: Categories.Water,
		}, base);

		return tile;
	}
}
