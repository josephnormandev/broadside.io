export const name = 'set-position';

export function command(s_id, x, y)
{
    return {
        name: name,
        data: {
            s_id: s_id,
            x: x,
            y: y,
        },
    };
}

import Matter from 'matter-js';
const { Vector } = Matter;

import { isType, Ship } from '../objects/objects.js';

export function handle(simulation, team_num, data)
{
    var s_id = data.s_id;
    var x = data.x;
    var y = data.y;

    if(simulation.objects.has(s_id))
    {
        var game_object = simulation.objects.get(s_id);

        if(isType(game_object, Ship.TYPE()))
        {
            Ship.setDestination(game_object, Vector.create(x, y))
        }
    }
}
