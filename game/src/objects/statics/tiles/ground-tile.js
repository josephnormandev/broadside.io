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
		if(base_object.rocky_color == null)
			throw 'Missing Parameter - GroundTile.rocky_color';

        addType(base_object.type, GroundTile.TYPE());
        base_object.category = Categories.Ground;

        var ground_tile = Tile.create(simulation, base_object);
		ground_tile.rocky_color = base_object.rocky_color;
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

	static applyRockiness(ground_tile)
	{
		for(var surface_face of ground_tile.surface_faces)
		{
			const h1 = ground_tile.surface_vertices[surface_face.a].y;
			const h2 = ground_tile.surface_vertices[surface_face.b].y;
		 	const h3 = ground_tile.surface_vertices[surface_face.c].y;

			const min = Math.min(h1, h2, h3);
			const max = Math.max(h1, h2, h3);

			if(max - min > 7)
			{
				surface_face.color.setStyle(ground_tile.rocky_color);
				surface_face.color.add(new THREE.Color(
	                THREE.Math.randFloat(-.04, .04),
	                THREE.Math.randFloat(-.04, .04),
	                THREE.Math.randFloat(-.04, .04)
	            ));
			}
		}
	}
}
