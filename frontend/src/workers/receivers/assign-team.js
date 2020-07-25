export function receive(page, data)
{
	const team = data.team;

	if(team != null)
	{
		page.team = team;
	}
}

export const receiver = 'assign-team';
