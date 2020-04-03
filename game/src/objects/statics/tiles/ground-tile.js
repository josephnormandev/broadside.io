import * as THREE from 'three';

import { Tile, Categories, addType } from '../../objects.js';

export default class GroundTile extends Tile
{
    static TYPE()
    {
        return 'ground-tile';
    }

    static create(simulation, base_object)
    {
        if(base_object.height == null)
            throw 'Missing Parameter - GroundTile.height';

        base_object.type = []; addType(base_object.type, GroundTile.TYPE());
        base_object.category = Categories.Ground;
        base_object.color = '#3db020';

        var ground_tile = Tile.create(simulation, base_object);
        ground_tile.height = base_object.height;
        return ground_tile;
    }

    static create3D(scene, ground_tile)
    {
        Tile.create3D(scene, ground_tile, new THREE.MeshStandardMaterial({
            roughness: .95,
            transparent: false,
            vertexColors: THREE.FaceColors,
            flatShading: true,
        }));
        ground_tile.vertices[0].y = ground_tile.height;
    }

    static getBaseObject(ground_tile)
    {
        return {
            ...Tile.getBaseObject(ground_tile),
            height: ground_tile.height,
        };
    }
}
