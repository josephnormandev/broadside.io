import { GroundTile, addType } from '../../../objects.js';

export default class SandTile extends GroundTile
{
	static TYPE()
	{
		return 'sand-tile';
	}

	static create(simulation, base_object)
	{
		base_object.type = []; addType(base_object.type, SandTile.TYPE());
        base_object.surface_color = '#edd9af';
		base_object.rocky_color = '#b29082';

		var sand_tile = GroundTile.create(simulation, base_object);
		return sand_tile;
	}
}
