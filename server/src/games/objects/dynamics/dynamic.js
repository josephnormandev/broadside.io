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

	static getBase(dynamic)
	{
		return {
			...GameObject.getBase(dynamic),
			velocity: dynamic.velocity,
			angularVelocity: dynamic.angularVelocity,
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
