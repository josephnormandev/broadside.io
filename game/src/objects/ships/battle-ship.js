import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import GameObject from '../game-object.js';

export default class BattleShip extends GameObject
{
    static TYPE()
    {
        return 'battle-ship';
    }

    static create(base_object)
    {
        if(base_object.team_num == null)
            throw 'Missing Parameter';

        base_object.isStatic = true;
        base_object.mass = 500;
        var game_object = GameObject.create(
            base_object,
            Body.create({
                parts: [
                    Bodies.rectangle(0, 0, 16, 40),
                    Bodies.circle(0, 0, 12),
                ],
            }),
            BattleShip.TYPE(),
        );
        game_object.team_num = base_object.team_num;

        return game_object;
    }

    static update(battle_ship, update_object)
    {
        GameObject.update(battle_ship, update_object);
    }

    static getBaseObject(battle_ship)
    {
        return {
            ...GameObject.getBaseObject(battle_ship),
            team_num: battle_ship.team_num,
        };
    }

    static getUpdateObject(battle_ship)
    {
        return {
            ...GameObject.getUpdateObject(battle_ship),
        };
    }
}
