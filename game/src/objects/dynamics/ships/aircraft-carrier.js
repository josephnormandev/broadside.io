import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import { Ship, addType } from '../../objects.js';

export default class AircraftCarrier extends Ship
{
    static TYPE()
    {
        return 'aircraft-carrier';
    }

    static create(simulation, base_object)
    {
        base_object.type = []; addType(base_object.type, AircraftCarrier.TYPE());

        base_object.mass = 5000;
        base_object.turning_power = 5;
        base_object.acceleration = 10;

        var carrier = Ship.create(
            simulation, base_object,
            Body.create({
                parts: [
                    Bodies.rectangle(0, 0, 32, 160),
                    Bodies.circle(0, 0, 48),
                ],
            }),
        );

        return carrier;
    }
}
