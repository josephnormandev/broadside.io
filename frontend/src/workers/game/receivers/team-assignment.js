export function receive(page, data)
{
    var team_num = data.team_num != null ? data.team_num : null;

    if(team_num != null)
    {
        page.team_num = team_num;
    }
}

export const receiver = 'team-assignment';
