import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import * as THREE from 'three';

import { Tile, Categories, addType } from '../../objects.js';

export default class WaterTile extends Tile
{
    static TYPE()
    {
        return 'water-tile';
    }

    static create(simulation, base_object)
    {
        base_object.type = []; addType(base_object.type, WaterTile.TYPE());
        base_object.category = Categories.Water;
        base_object.color = '#9cd3db';

        var water_tile = Tile.create(simulation, base_object);
        return water_tile;
    }

    static create3D(scene, water_tile)
    {
        Tile.create3D(scene, water_tile, new THREE.MeshStandardMaterial({
            roughness: .13,
            transparent: true,
            vertexColors: THREE.FaceColors,
            flatShading: true,
        }));
    }

    static giveRandomHeight(water_tile)
    {
        water_tile.vertices[0].y = THREE.Math.randFloat(-2.5, 2.5);
        water_tile.bob = THREE.Math.randInt(0, 1) == 1;
    }

    static draw(water_tile)
    {
        if(water_tile.bob == true)
        {
            water_tile.vertices[0].add(new THREE.Vector3(0, .02, 0));
            if(water_tile.vertices[0].y > 2.5)
                water_tile.bob = false;
        }
        else
        {
            water_tile.vertices[0].add(new THREE.Vector3(0, - .02, 0));
            if(water_tile.vertices[0].y < -2.5)
                water_tile.bob = true;
        }
        water_tile.mesh.geometry.verticesNeedUpdate = true;
    }
}
