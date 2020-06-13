import { GameObject } from '../objects.js';

export default class Static extends GameObject
{
	static TYPE = 'static';

	static create(definers, base)
	{
		const static_obj = GameObject.create({
			...definers,
			moveable: false,
		}, base);

		return static_obj;
	}
}
