import addObjectMessage from './io/messages/add-object.js';
import bundledMessage from './io/messages/bundled.js';
import removeObjectMessage from './io/messages/remove-object.js';
import updateObjectMessage from './io/messages/update-object.js';

import { getType } from './objects/objects.js';

export default class Vision
{
	constructor(num)
	{
		this.num = num;

		this.new_vision = new Set();
		this.vision = new Set();
	}

	addVision(s_id)
	{
		this.new_vision.add(s_id);
	}

	createPackets(objects)
	{
		const packets = [];

		for(const s_id of this.new_vision)
		{
			const object = objects.get(s_id);

			if(this.vision.has(s_id)) // updated
			{
				const update_object = getType(object).getUpdate(object);
				packets.push(updateObjectMessage(update_object));

				this.vision.delete(s_id)
			}
			else // added
			{
				const add_object = getType(object).getBase(object);
				packets.push(addObjectMessage(add_object));

				this.vision.delete(s_id);
			}
		}

		for(const s_id of this.vision)
		{
			const object = objects.get(s_id);
			const remove_object = getType(object).getBase(object);
			packets.push(removeObjectMessage(remove_object));
		}

		this.vision = new Set(this.new_vision);
		this.new_vision.clear();

		return bundledMessage(packets);
	}

	getAddPackets(objects)
	{
		const packets = [];

		for(const s_id of this.vision)
		{
			const object = objects.get(s_id);
			const add_object = getType(object).getBase(object);

			packets.push(addObjectMessage(add_object));
		}

		return bundledMessage(packets);
	}
}
