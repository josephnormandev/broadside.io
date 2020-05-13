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
        base_object.surface_color = '#e5c9aa';

        var water_tile = Tile.create(simulation, base_object);
		water_tile.water_color = '#0077be';
        return water_tile;
    }

    static create3D(scene, water_tile)
    {
		var {
			mesh,
			vertices,
			faces,
		} = Tile.createHexagonMesh(
			water_tile,
			water_tile.height,
			water_tile.surface_color,
			new THREE.MeshStandardMaterial({
	            roughness: .95,
	            transparent: false,
	            vertexColors: THREE.FaceColors,
	            flatShading: true,
			}),
		);
		water_tile.surface_mesh = mesh;
		water_tile.surface_vertices = vertices;
		water_tile.surface_faces = faces;

		var random_height = THREE.Math.randFloat(-2.5, 2.5);
    	water_tile.bob = THREE.Math.randInt(0, 1) == 1;

		var {
			mesh,
			vertices,
			faces,
		} = Tile.createHexagonMesh(
			water_tile,
			random_height,
			water_tile.water_color,
			new THREE.MeshStandardMaterial({
	            roughness: .1,
	            transparent: true,
	            opacity: .6,
	            vertexColors: THREE.FaceColors,
	            flatShading: true,
	        }),
		);
		water_tile.water_mesh = mesh;
		water_tile.water_vertices = vertices;
		water_tile.water_faces = faces;

		scene.add(water_tile.surface_mesh);
		scene.add(water_tile.water_mesh);

    }

    static draw(water_tile)
    {
        if(water_tile.bob == true)
        {
            water_tile.water_vertices[0].add(new THREE.Vector3(0, .02, 0));
            if(water_tile.water_vertices[0].y > 2.5)
                water_tile.bob = false;
        }
        else
        {
            water_tile.water_vertices[0].add(new THREE.Vector3(0, - .02, 0));
            if(water_tile.water_vertices[0].y < -2.5)
                water_tile.bob = true;
        }
        water_tile.water_mesh.geometry.verticesNeedUpdate = true;
    }
}
