import { GroundTile } from '../../../objects.js';

export default class GrassTile extends GroundTile
{
	static TYPE = 'grass-tile';

	static create(definers, base)
	{
		const grass_tile = GroundTile.create({
			type: GrassTile.TYPE,
		}, base);

		return grass_tile;
	}
}
