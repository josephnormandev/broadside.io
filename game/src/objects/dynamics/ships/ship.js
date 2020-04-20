import Matter from 'matter-js';
const { Body } = Matter;

import * as THREE from 'three';

import { Categories, Dynamic, WaterTile, GroundTile, getOfType, addType } from '../../objects.js';

export default class Ship extends Dynamic
{
    static TYPE()
    {
        return 'ship';
    }

    static create(simulation, base_object, body)
    {
        if(base_object.team_num == null)
            throw 'Missing Parameter - Ship.team_num';
        if(base_object.turning_power == null)
            throw 'Missing Parameter - Ship.turning_power';
        if(base_object.acceleration == null)
            throw 'Missing Parameter - Ship.acceleration';
        if(base_object.type == null)
            throw 'Cannot create of Abstract Ship';

        addType(base_object.type, Ship.TYPE());

        base_object.category = Categories.Ship;
        base_object.mask = Categories.Border | Categories.Ground | Categories.Ship;

        var ship = Dynamic.create(simulation, base_object, body);
        ship.render.fillStyle = '#aaaaaa';
        ship.team_num = base_object.team_num;
        ship.turning_power = base_object.turning_power;
        ship.acceleration = base_object.acceleration;
        ship.destinations = [];

        return ship;
    }

    static tick(ship)
    {
        // put code here for moving toward the destination etc.
        if(ship.destinations.length > 0)
            Body.setPosition(ship, ship.destinations.shift());
    }

    static create3D(scene, ship)
    {
        ship.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(5, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffff00
            }),
        );

        ship.mesh.position.set(ship.position.x, 0, ship.position.y);
        ship.mesh.rotation.set(0, ship.angle, 0, "YXZ");
        scene.add(ship.mesh);
    }

    static getBaseObject(ship)
    {
        return {
            ...Dynamic.getBaseObject(ship),
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
