export function receive(page, data)
{
	const ship_id = data.ship_id;

	if(ship_id != null)
	{
		page.ship_id = ship_id;
	}
}

export const receiver = 'assign-ship';
