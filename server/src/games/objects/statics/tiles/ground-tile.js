import { Tile } from '../../objects.js';

export default class GroundTile extends Tile
{
	static TYPE = 'ground-tile';

	static create(definers, base)
	{
		const ground_tile = Tile.create({
			category: Categories.Ground,
		}, base);

		return ground_tile;
	}
}
