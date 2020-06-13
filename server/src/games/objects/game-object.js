import Matter from 'matter-js';

export default class GameObject
{
	static TYPE = 'game-object';

	static create(definers, base)
	{
		// definers are defined ONLY in the GameObject class, not from outside
		// sources. (e.g. if a ship is a certain shape (defined in the body),
		// the other ships of the same type have the same shape)
		if(definers.type == null)
			throw 'Missing Definition - GameObject.type';
		if(definers.body == null)
			throw 'Missing Definition - GameObject.body';
		if(definers.category == null)
			throw 'Missing Definition - GameObject.category';
		if(definers.moveable == null)
			throw 'Missing Definition - GameObject.moveable';

		const game_object = definers.body;
		game_object.type = definers.type;
		game_object.collisionFilter.category = definers.category;

		if(definers.moveable == false)
			Matter.Body.setStatic(game_object, false);

		// base properties come from outside sources like the map file. They get
		// factored into the
		if(base.s_id == null)
			throw 'Missing Base - GameObject.s_id';
		if(base.position == null)
			throw 'Missing Base - GameObject.position';
		if(base.angle == null)
			throw 'Missing Base - GameObject.angle';

		game_object.s_id = base.s_id;
		Matter.Body.setPosition(game_object, base.position);
		Matter.Body.setAngle(game_object, base.angle);

		return game_object;
	}

	static getBase(game_object)
	{
		return {
			type: game_object.type, // the ONLY definer that is sent for the base
									// because it is required to reconstruct the
									// object
			s_id: game_object.s_id,
			position: game_object.position,
			angle: game_object.angle,
		};
	}
}
