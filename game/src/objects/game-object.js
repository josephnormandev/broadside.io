import Matter from 'matter-js';
const { Body, Vector } = Matter;

export default class GameObject
{
    static TYPE()
    {
        return 'game-object';
    }

    static create(body, type, position, velocity, angle)
    {
        var game_object = {
            type: type,
            body: body,
        };

        GameObject.setPosition(game_object, position);
        GameObject.setVelocity(game_object, velocity);
        GameObject.setAngle(game_object, angle);
        return game_object;
    }

    static dump(game_object)
    {
        return {
            type: game_object.type,
            position: game_object.body.position,
            velocity: game_object.body.velocity,
            angle: game_object.body.angle,
        };
    }

    static getId(object)
    {
        return object.body.id;
    }

    static setPosition(object, position)
    {
        Body.setPosition(object.body, position);
    }

    static setVelocity(object, velocity)
    {
        Body.setVelocity(object.body, velocity);
    }

    static setAngle(object, angle)
    {
        Body.setAngle(object.body, angle);
    }
}
