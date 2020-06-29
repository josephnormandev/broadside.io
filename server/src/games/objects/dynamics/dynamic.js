import Matter from 'matter-js';

import { GameObject } from '../objects.js';

export default class Dynamic extends GameObject
{
	static TYPE = 'dynamic';

	static create(definers, base)
	{
		if(definers.mass == null)
			throw 'Missing Definition - Dynamic.mass';

		const dynamic = GameObject.create({
			...definers,
		}, base);

		Matter.Body.setStatic(dynamic, false);
		Matter.Body.setMass(dynamic, definers.mass);

		if(base.team == null) // all dynamic objects have team affiliation
			throw 'Missing Parameter - Dynamic.team';

		dynamic.team = base.team;

		if(base.velocity != null)
			Matter.Body.setVelocity(dynamic, base.velocity);
		if(base.angularVelocity != null)
			Matter.Body.setAngularVelocity(dynamic, base.angularVelocity);

		return dynamic;
	}

	static tick(dynamic) // all dynamics have this method
	{
		throw `Missing Declaration - Dynamic.tick()`;
	}

	static observable(objects, dynamic_1, dynamic_2)
	{
		const pos_1 = dynamic_1.position;
		const pos_2 = dynamic_2.position;

		const collisions = Matter.Query.ray(objects, pos_1, pos_2);

		return (collisions.length == 0);
	}

	static getBase(dynamic)
	{
		return {
			...GameObject.getBase(dynamic),
			velocity: dynamic.velocity,
			angularVelocity: dynamic.angularVelocity,
			team: dynamic.team,
		};
	}

	static getUpdate(dynamic)
	{
		return {
			s_id: dynamic.s_id,
			position: dynamic.position,
			angle: dynamic.angle,
			velocity: dynamic.velocity,
			angularVelocity: dynamic.angularVelocity,
		};
	}
}
