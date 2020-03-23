export const receiver = 'team-assignment';

export function receive(renderer, data)
{
    var team_num = data.team_num != null ? data.team_num : null;

    if(team_num != null)
    {
        renderer.team_num = team_num;
    }
}
