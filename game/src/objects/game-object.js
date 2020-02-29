import Matter from 'matter-js';
const { Body, Vector } = Matter;

export default class GameObject
{
    static create(object, body, type)
    {
        var game_object = body;
        game_object.type = type;

        if(object.isStatic != null)
            Body.setStatic(game_object, object.isStatic);
        if(object.mass != null)
            Body.setMass(game_object, object.mass);
        if(object.position != null)
            Body.setPosition(game_object, object.position);
        if(object.velocity != null)
            Body.setVelocity(game_object, object.velocity);
        if(object.angle != null)
            Body.setAngle(game_object, object.angle);
        return game_object;
    }

    static getBase(game_object)
    {
        return {
            id: game_object.id,
            type: game_object.type,
            mass: game_object.mass,
            isStatic: game_object.isStatic,
            position: game_object.position,
            velocity: game_object.velocity,
            angle: game_object.angle,
        };
    }

    static getUpdates(game_object)
    {
        return {
            id: game_object.id,
            position: game_object.position,
            velocity: game_object.velocity,
            angle: game_object.angle,
        };
    }
}
