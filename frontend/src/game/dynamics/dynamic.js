export default class Dynamic
{
	static TYPE() { return 'dynamic'; }

	constructor(base, page)
	{
		if(base.s_id == null)
			throw 'Missing - Dynamic.s_id';
		if(base.type == null)
			throw 'Missing - Dynamic.type';
		if(base.team == null)
			throw 'Missing - Dynamic.team';

		this.s_id = base.s_id;
		this.type = base.type;
		this.team = base.team;
	}

	draw(scene)
	{
		throw 'Missing - Dynamic.draw()';
	}

	update(update)
	{
		if(update.position != null)
			this.position = update.position;
		if(update.velocity != null)
			this.velocity = update.velocity;
		if(update.angle != null)
			this.angle = update.angle;
		if(update.angularVelocity != null)
			this.angularVelocity = update.angularVelocity;
	}
}
