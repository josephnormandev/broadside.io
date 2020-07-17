import Dynamic from './dynamic';
	import Ship from './ships/ship';

const types = new Map();
types.set(Dynamic.TYPE(), Dynamic);
	types.set(Ship.TYPE(), Ship);

function getType(object)
{
	if(object.type != null && types.has(object.type))
	{
		return types.get(object.type);
	}
	return null;
}

export {
	Dynamic,
		Ship,
	getType,
};
