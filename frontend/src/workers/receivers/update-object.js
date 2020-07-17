export function receive(page, data)
{
	const update = data.update;

	if(page.dynamics.has(update.s_id))
	{
		const object = page.dynamics.get(update.s_id);

		object.update(update);
	}
}

export const receiver = 'update-object';
