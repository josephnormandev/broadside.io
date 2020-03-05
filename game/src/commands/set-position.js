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
const { Body, Vector } = Matter;

import { Ship } from '../objects/objects.js';

export function handle(simulation, team_num, data)
{
    var s_id = data.s_id;
    var x = data.x;
    var y = data.y;

    if(simulation.objects.has(s_id))
    {
        var game_object = simulation.objects.get(s_id);

        if(game_object.team_num != null && game_object.team_num == team_num)
            Body.setPosition(game_object, Vector.create(x, y));
    }
}
