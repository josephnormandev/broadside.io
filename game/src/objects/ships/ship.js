import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import GameObject from '../game-object.js';
import Categories from '../categories.js';

export default class Ship extends GameObject
{
    static TYPE()
    {
        return 'ship';
    }

    static create(base_object)
    {
        if(base_object.team_num == null)
            throw 'Missing Parameter - Ship.team_num';

        if(base_object.team_num == 1)
        {
            base_object.category = Categories.Team1;
            base_object.mask = Categories.Border | Categories.Ground | Categories.Team2;
        }
        else if(base_object.team_num == 2)
        {
            base_object.category = Categories.Team2;
            base_object.mask = Categories.Border | Categories.Ground | Categories.Team1;
        }

        base_object.type = Ship.TYPE();
        base_object.isStatic = false;
        base_object.mass = 500;
        var game_object = GameObject.create(
            base_object,
            Body.create({
                parts: [
                    Bodies.rectangle(0, 0, 16, 40),
                    Bodies.circle(0, 0, 12),
                ],
            }),
        );
        game_object.render.fillStyle = '#aaaaaa';
        game_object.team_num = base_object.team_num;

        return game_object;
    }

    static goForward(ship)
    {
        var angle = ship.angle;
        var force = 1;
        var force_x = force * Math.cos(angle + Math.PI / 2);
        var force_y = force * Math.sin(angle + Math.PI / 2);
        Body.setVelocity(ship, Vector.create(force_x, force_y));
    }

    static update(ship, update_object)
    {
        GameObject.update(ship, update_object);
    }

    static getBaseObject(ship)
    {
        return {
            ...GameObject.getBaseObject(ship),
            team_num: ship.team_num,
        };
    }
}
