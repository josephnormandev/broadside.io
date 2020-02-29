export default function teamAssignment(team_num)
{
    return {
        receiver: 'team-assignment',
        data: {
            team_num: team_num,
        },
    };
}
