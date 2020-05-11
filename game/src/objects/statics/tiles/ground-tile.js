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
        base_object.type = []; addType(base_object.type, GroundTile.TYPE());
        base_object.category = Categories.Ground;
        base_object.surface_color = '#3db020';

        var ground_tile = Tile.create(simulation, base_object);
        return ground_tile;
    }

    static create3D(scene, ground_tile)
    {
		var {
			mesh,
			vertices,
			faces,
		} = Tile.createHexagonMesh(
			ground_tile,
			ground_tile.height,
			ground_tile.surface_color,
			new THREE.MeshStandardMaterial({
	            roughness: .95,
	            transparent: false,
	            vertexColors: THREE.FaceColors,
	            flatShading: true,
			})
		);
		ground_tile.surface_mesh = mesh;
		ground_tile.surface_vertices = vertices;
		ground_tile.surface_faces = faces;

		scene.add(ground_tile.surface_mesh);
    }
}
