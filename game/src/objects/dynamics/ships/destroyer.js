import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import { Ship, addType } from '../../objects.js';

export default class Destroyer extends Ship
{
    static TYPE()
    {
        return 'destroyer';
    }

    static create(simulation, base_object)
    {
        base_object.type = []; addType(base_object.type, Destroyer.TYPE());

        base_object.mass = 1000;
        base_object.turning_power = 5;
        base_object.acceleration = 5;

        var destroyer = Ship.create(
            simulation, base_object,
            Body.create({
                parts: [
                    Bodies.rectangle(0, 0, 15, 30),
                    Bodies.circle(0, 0, 10),
                ],
            }),
        );

        return destroyer;
    }
}
