import positionChangeMessage from '../messages/position-change.js';

export function receive(game, player, other_player, data)
{
    var x = data.x != null ? data.x : null;
    var y = data.y != null ? data.y : null;

    var x = x < 0 ? 0 : x > 500 ? 500 : x;
    var y = y < 0 ? 0 : y > 500 ? 500 : y;

    if(x != null && y != null)
    {
        player.setPosition(x, y);

        player.send(positionChangeMessage(true, x, y));
        other_player.send(positionChangeMessage(false, x, y));
    }
}

export const receiver = 'set-position';
