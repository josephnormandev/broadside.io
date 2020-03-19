import Matter from 'matter-js';
const { Body, Bounds, Vector } = Matter;

import { GameObject, addType } from '../objects.js';

export default class Static
{
    static TYPE()
    {
        return 'static';
    }

    static create(simulation, base_object, body)
    {
        if(base_object.type == null)
            throw 'Cannot create of Abstract Static';
        else
        {
            addType(base_object.type, Static.TYPE());
        }

        var static_obj = GameObject.create(simulation, base_object, body);
        Body.setStatic(static_obj, true);

        return static_obj;
    }

    static getBaseObject(static_obj)
    {
        return {
            ...GameObject.getBaseObject(static_obj),
        };
    }
}
