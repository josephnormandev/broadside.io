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
        game_object.destinations = [];

        return game_object;
    }

    static update()
    {

    }

    static getBaseObject(ship)
    {
        return {
            ...GameObject.getBaseObject(ship),
            team_num: ship.team_num,
        };
    }

    static setDestination(ship, destination)
    {
        ship.destinations.push(destination);
        console.log(ship.destinations);
    }
}
