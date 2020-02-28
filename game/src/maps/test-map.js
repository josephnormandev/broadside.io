import Matter from 'matter-js';
const { Common, Vector } = Matter;

import BattleShip from '../objects/ships/battle-ship.js';

export default class TestMap
{
    constructor()
    {
        this.teams = {
            1: new Map(),
            2: new Map(),
        };

        for(const team of Object.values(this.teams))
        {
            var b1 = BattleShip.create(Vector.create(50, 50), 1, 0);
            team.set(BattleShip.getId(b1), b1);
        }
    }
}
