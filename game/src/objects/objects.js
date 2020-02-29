import BattleShip from './ships/battle-ship.js';

export function getType(object)
{
    switch(object.type)
    {
        case BattleShip.TYPE():
            return BattleShip;
        default:
            throw 'Unknown Type!';
    }
}

export default {
    BattleShip,
    getType,
};
