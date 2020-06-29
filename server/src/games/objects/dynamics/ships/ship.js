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
			mask: Categories.Border | Categories.Ground,
			body: Matter.Body.create({
				parts: [
					Matter.Bodies.rectangle(0, 0, 32, 80),
					Matter.Bodies.circle(0, 0, 24),
				],
			}),
		}, base);

		return ship;
	}

	static tick(object)
	{

	}
}
