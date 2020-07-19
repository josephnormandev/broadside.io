import Matter from 'matter-js';

import { Static } from '../../objects.js';

export default class Tile extends Static
{
	static TYPE = 'tile';
	static RADIUS = 15;

	static create(definers, base)
	{
		if(base.adjacents == null)
			throw 'Missing Parameter - Tile.adjacents';
		if(base.height == null)
			throw 'Missing Parameter - Tile.height';

		const tile = Static.create({
			...definers,
			body: Matter.Bodies.polygon(0, 0, 6, Tile.RADIUS),
		}, base);
		tile.adjacents = base.adjacents;
		tile.height = base.height;

		return tile;
	}

	static getBase(tile)
	{
		return {
			...Static.getBase(tile),
			adjacents: tile.adjacents,
			height: tile.height,
		};
	}
}
