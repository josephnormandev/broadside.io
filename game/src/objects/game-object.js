import Matter from 'matter-js';
const { Body, Vector } = Matter;

export default class GameObject
{
    static create(base_object, body)
    {
        if(base_object.s_id == null)
            throw 'Missing Parameter - GameObject.s_id';
        if(base_object.type == null)
            throw 'Missing Parameter - GameObject.type';
        if(base_object.position == null)
            throw 'Missing Parameter - GameObject.position';
        if(base_object.category == null)
            throw 'Missing Parameter - GameObject.category';

        var game_object = body;
        game_object.s_id = base_object.s_id;
        game_object.type = base_object.type;
        game_object.collisionFilter.category = base_object.category;
        game_object.label = game_object.s_id;

        if(base_object.mask != null)
            game_object.collisionFilter.mask = base_object.mask;
        if(base_object.isStatic != null)
            Body.setStatic(game_object, base_object.isStatic);
        if(base_object.mass != null)
            Body.setMass(game_object, base_object.mass);
        if(base_object.position != null)
            Body.setPosition(game_object, base_object.position);
        if(base_object.velocity != null)
            Body.setVelocity(game_object, base_object.velocity);
        if(base_object.angle != null)
            Body.setAngle(game_object, base_object.angle);
        return game_object;
    }

    static update(game_object, update_object)
    {
        if(update_object.position != null)
            Body.setPosition(game_object, update_object.position);
        if(update_object.velocity != null)
            Body.setVelocity(game_object, update_object.velocity);
        if(update_object.angle != null)
            Body.setAngle(game_object, update_object.angle);
    }

    static getBaseObject(game_object)
    {
        return {
            s_id: game_object.s_id,
            type: game_object.type,
            mass: game_object.mass,
            isStatic: game_object.isStatic,
            position: game_object.position,
            velocity: game_object.velocity,
            angle: game_object.angle,
        };
    }

    static getUpdateObject(game_object)
    {
        if(!game_object.isStatic)
        {
            return {
                s_id: game_object.s_id,
                position: game_object.position,
                velocity: game_object.velocity,
                angle: game_object.angle,
            };
        }
        return {}; // empty object for static objects
    }
}
