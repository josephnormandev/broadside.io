import { GroundTile, addType } from '../../../objects.js';

export default class GrassTile extends GroundTile
{
	static TYPE()
	{
		return 'grass-tile';
	}

	static create(simulation, base_object)
	{
		base_object.type = []; addType(base_object.type, GrassTile.TYPE());
        base_object.surface_color = '#3db020';
		base_object.rocky_color = '#888888';

		var grass_tile = GroundTile.create(simulation, base_object);
		return grass_tile;
	}
}
