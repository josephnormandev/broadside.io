import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import Ship from './ship.js';

export default class BattleShip extends Ship
{
    static TYPE()
    {
        return 'game-object';
    }

    static MASS()
    {
        return 500;
    }

    static create(position, velocity, angle)
    {
        var body = Body.create({
            parts: [
                Bodies.rectangle(0, 0, 8, 20),
                Bodies.circle(0, 0, 12),
            ],
        });

        var battle_ship = {
            ...Ship.create(body, BattleShip.TYPE(), BattleShip.MASS(), position, velocity, angle),
        };

        return battle_ship;
    }

    static dump(battle_ship)
    {
        return {
            ...Ship.dump(battle_ship),
        };
    }
}
