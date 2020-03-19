import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import { GameObject, WaterTile, GroundTile, getOfType, } from '../objects.js';
import Categories from '../categories.js';

export default class Ship extends GameObject
{
    static TYPE()
    {
        return 'ship';
    }

    static create(simulation, base_object)
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
            simulation, base_object,
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

    static tick(ship)
    {
        // put code here for moving toward the destination etc.
        if(ship.destinations.length > 0)
            Body.setPosition(ship, ship.destinations.shift());
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
        var water_tiles = getOfType(ship.simulation.objects, WaterTile.TYPE());
        var ground_tiles = getOfType(ship.simulation.objects, GroundTile.TYPE());

        var shortest_path = WaterTile.getShortestTilePath(water_tiles, ship.position, destination);

        ship.destinations = [];
        if(shortest_path != null)
        {
            for(var water_tile_id of shortest_path)
            {
                ship.destinations.push(water_tiles.get(water_tile_id).position);
            }
        }
    }
}
