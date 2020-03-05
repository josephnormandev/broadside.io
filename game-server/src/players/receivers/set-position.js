import { Commands } from 'game';
const { SetPositionCommand } = Commands;

export function receive(game, player, data)
{
    var s_id = data.s_id != null ? data.s_id : null;
    var x = data.x != null ? data.x : null;
    var y = data.y != null ? data.y : null;

    if(s_id != null && x != null && y != null)
    {
        game.simulation.handleCommand(player.team_num, SetPositionCommand.command(s_id, x, y));
    }
}

export const receiver = 'set-position';
