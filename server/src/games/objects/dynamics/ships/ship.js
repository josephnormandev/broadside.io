import Matter from 'matter-js';

import { Dynamic, Categories, isType } from '../../objects.js';

export default class Ship extends Dynamic
{
	static TYPE = 'ship';

	static create(definers, base)
	{
		const ship = Dynamic.create({
			type: Ship.TYPE,
			controllable: true,
			mass: 1000,
			category: Categories.Ship,
			mask: Categories.Border | Categories.Ground | Categories.Ship,
			body: Matter.Body.create({
				parts: [
					Matter.Bodies.rectangle(0, 0, 30, 15),
					Matter.Bodies.circle(0, 0, 10),
				],
			}),
		}, base);

		return ship;
	}

	static tick(object)
	{

	}
}
