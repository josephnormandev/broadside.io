import Matter from 'matter-js';
const { Body } = Matter;

import GameObject from '../game-object.js';

export default class Ship extends GameObject
{
    static TYPE()
    {
        return 'ship';
    }

    static create(body, type, mass, position, velocity, angle)
    {
        Body.setStatic(body, false);
        Body.setMass(body, mass);

        return {
            ...GameObject.create(body, type, position, velocity, angle),
        }
    }

    static dump(ship)
    {
        return {
            ...GameObject.dump(ship),
            mass: ship.body.mass,
        };
    }
}
