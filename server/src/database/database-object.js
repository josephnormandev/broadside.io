export default class DatabaseObject
{
	constructor(object, schema)
	{
		this._id = object._id;
		for(var property in schema)
		{
			this[property] = object[property];
		}
	}

	equals(other)
	{
		if(other.id != null)
		{
			return other.id == this.id;
		}
		return false;
	}

	get id()
	{
		return this._id.toString();
	}
}
