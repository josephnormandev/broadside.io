import { GroundTile } from '../../../objects.js';

export default class SandTile extends GroundTile
{
	static TYPE = 'sand-tile';

	static create(definers, base)
	{
		const ground_tile = GroundTile.create({
			type: SandTile.TYPE,
		}, base);

		return ground_tile;
	}
}
