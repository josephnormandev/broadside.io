export default function assignTeam(team)
{
	return {
		receiver: 'assign-team',
		data: {
			team: team,
		},
	};
}
