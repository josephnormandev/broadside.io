import Matter from 'matter-js';

export default class Dynamic extends GameObject
{
	static TYPE = 'dynamic';

	static create(definers, base)
	{
		if(definers.mass == null)
			throw 'Missing Definition - Dynamic.mass';
		if(definers.controllable == null)
			throw 'Missing Definition - Dynamic.controllable';

		const dynamic = GameObject.create({
			...definers,
			moveable: true,
		}, base);

		Matter.Body.setMass(dynamic, definers.mass);
		dynamic.controllable = definers.controllable;

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
