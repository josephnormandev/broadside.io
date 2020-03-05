import Matter from 'matter-js';
const { Body, Vector } = Matter;

export function receive(game, data)
{
    var s_id = data.s_id != null ? data.s_id : null;
    var x = data.x != null ? data.x : null;
    var y = data.y != null ? data.y : null;

    if(s_id != null && x != null && y != null)
    {
        if(game.simulation.objects.has(s_id))
        {
            Body.setPosition(game.simulation.objects.get(s_id), Vector.create(x, y));
        }
    }
}

export const receiver = 'set-position';
