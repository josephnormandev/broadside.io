import generated_terrain from './generated-map2.json';

export default class TerrainsService
{
	static initialize()
	{

	}

	static loadMap()
	{
		return new Set(generated_terrain);
	}
}
