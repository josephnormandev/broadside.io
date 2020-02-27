import GameObject from '../game-object.js';

import { Body } from 'matter-js';

export default class Ship
{
    static TYPE = 'ship';

    static createShip(id, type, body, mass)
    {
        Body.setStatic(body, true);
        Body.setMass(body, mass);

        return {
            ...GameObject.createObject(id, ),
        }
    }
}
