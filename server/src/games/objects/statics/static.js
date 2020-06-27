import Matter from 'matter-js';

import { GameObject } from '../objects.js';

// a static is an object that does not have mass and will not move. this also
// means they will not be sent to the client using the regular addObject message
// instead, they are sent at the very beginning
export default class Static extends GameObject
{
	static TYPE = 'static';

	static create(definers, base)
	{
		const static_obj = GameObject.create({
			...definers,
			moveable: false,
		}, base);

		Matter.Body.setStatic(static_obj, true);

		return static_obj;
	}
}
