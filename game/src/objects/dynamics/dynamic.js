import Matter from 'matter-js';
const { Body, Bounds, Vector } = Matter;

import * as THREE from 'three';

import { GameObject, addType } from '../objects.js';

export default class Dynamic extends GameObject
{
    static TYPE()
    {
        return 'dynamic';
    }

    static create(simulation, base_object, body)
    {
        if(base_object.mass == null)
            throw 'Missing Parameter - Dynamic.mass';
        if(base_object.type == null)
            throw 'Cannot create of Abstract Dynamic';
        else
        {
            addType(base_object.type, Dynamic.TYPE());
        }

        var dynamic = GameObject.create(simulation, base_object, body);
        Body.setStatic(dynamic, false);
        Body.setMass(dynamic, base_object.mass);

        if(base_object.velocity != null)
            Body.setVelocity(dynamic, base_object.velocity);
        if(base_object.angularVelocity != null)
            Body.setAngularVelocity(dynamic, base_object.angularVelocity);

        return dynamic;
    }

    static tick(dynamic) { }

    static update(dynamic, update_object)
    {
        if(update_object.position != null)
            Body.setPosition(dynamic, update_object.position);
        if(update_object.angle != null)
            Body.setAngle(dynamic, update_object.angle);
        if(update_object.velocity != null)
            Body.setVelocity(dynamic, update_object.velocity);
        if(update_object.angularVelocity != null)
            Body.setAngularVelocity(dynamic, update_object.angularVelocity);
    }

    static getBaseObject(dynamic)
    {
        return {
            ...GameObject.getBaseObject(dynamic),
            velocity: dynamic.velocity,
            angularVelocity: dynamic.angularVelocity,
        };
    }

    static getUpdateObject(dynamic)
    {
        return {
            s_id: dynamic.s_id,
            position: dynamic.position,
            angle: dynamic.angle,
            velocity: dynamic.velocity,
            angularVelocity: dynamic.angularVelocity,
        };
    }
}
