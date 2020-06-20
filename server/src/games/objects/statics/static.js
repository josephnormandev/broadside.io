import { GameObject } from '../objects.js';

export default class Static extends GameObject
{
	static TYPE = 'static';

	static create(definers, base)
	{
		// the terrain definers decides whether or not an object is downloaded
		// initially as part of the terrain
		if(definers.terrain == null)
			throw 'Missing Definition - Static.terrain';

		const static_obj = GameObject.create({
			...definers,
			moveable: false,
		}, base);

		static_obj.terrain = definers.terrain;

		return static_obj;
	}
}
