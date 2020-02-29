import Matter from 'matter-js';
const { Common, Vector } = Matter;

import BattleShip from '../objects/ships/battle-ship.js';

export default class TestMap
{
    constructor()
    {
        this.objects = new Set();
        this.objects.add({
            type: 'battle-ship',
            team_num: 1,
            position: Vector.create(50, 50),
        });
        this.objects.add({
            type: 'battle-ship',
            team_num: 2,
            position: Vector.create(100, 100),
        });
    }
}
