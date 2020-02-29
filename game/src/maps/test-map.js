import Matter from 'matter-js';
const { Common, Vector } = Matter;

import BattleShip from '../objects/ships/battle-ship.js';

export default class TestMap
{
    constructor()
    {
        this.objects = new Map();

        var b1 = BattleShip.create({
            team_num: 1,
            position: Vector.create(50, 50),
            angle: 1,
            velocity: Vector.create(5, 5),
        });
        this.objects.set(b1.id, b1);

        var b1 = BattleShip.create({
            team_num: 2,
            position: Vector.create(100, 100),
            angle: 1,
            velocity: Vector.create(5, 5),
        });
        this.objects.set(b1.id, b1);
    }
}
