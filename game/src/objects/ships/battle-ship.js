import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import GameObject from '../game-object.js';

export default class BattleShip extends GameObject
{
    static TYPE()
    {
        return 'battle-ship';
    }

    static create(object)
    {
        if(object.team_num == null)
            throw 'Missing Parameter';

        object.isStatic = false;
        object.mass = 500;
        var game_object = GameObject.create(
            object,
            Body.create({
                parts: [
                    Bodies.rectangle(0, 0, 16, 40),
                    Bodies.circle(0, 0, 12),
                ],
            }),
            BattleShip.TYPE(),
        );
        game_object.team_num = object.team_num;

        return game_object;
    }

    static getBase(battle_ship)
    {
        return {
            ...GameObject.getBase(battle_ship),
            team_num: battle_ship.team_num,
        };
    }

    static getUpdates(battle_ship)
    {
        return {
            ...GameObject.getUpdates(battle_ship),
        };
    }
}
