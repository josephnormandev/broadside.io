import * as THREE from 'three';

export default class Terrain
{
	constructor()
	{
		this.tiles = new Map();
	}

	generate(scene, objects)
	{
		for(const base of objects)
		{
			const s_id = base.s_id;

			switch(base.type)
			{
				case 'grass-tile':
					this.tiles.set(s_id, this.grassTile(scene, base));
					break;
				case 'sand-tile':
					this.tiles.set(s_id, this.sandTile(scene, base));
					break;
				case 'water-tile':
					this.tiles.set(s_id, this.waterTile(scene, base));
					break;
			}
		}

		for(const [s_id, tile] of this.tiles)
		{
			this.averageSurfaceHeights(tile, this.tiles);
		}
	}

	grassTile(scene, base)
	{
		const color = '#3db020';
		const rocky_color = '#888888';

		return this.terrainTile(scene, base, color, rocky_color);
	}

	sandTile(scene, base)
	{
		const color = '#edd9af';
		const rocky_color = '#d6c298';

		return this.terrainTile(scene, base, color, rocky_color);
	}

	terrainTile(scene, base, color, rocky_color)
	{
		const {
			mesh,
			vertices,
			faces,
		} = this.createHexagonMesh(scene, base, color);

		scene.add(mesh);

		return {
			mesh: mesh,
			vertices: vertices,
			faces: faces,
			base: base,
		};
	}

	waterTile(scene, base)
	{
		const water_color = '#0077be';
		const floor_color = '#0077be';//'#e5c9aa';

		return this.terrainTile(scene, base, water_color, floor_color);
	}

	createHexagonMesh(scene, base, color)
	{
		const radius = 10;
		const vertices = [];
		const faces = [];
		vertices.push(new THREE.Vector3(0, 0, 0)); // 0
		vertices.push(new THREE.Vector3(0, 0, - radius)); // 1, bottom, then left
		vertices.push(new THREE.Vector3(radius * Math.sin(Math.PI / 3), 0, -radius * Math.cos(Math.PI / 3))); // 2, bot left, then top left
		vertices.push(new THREE.Vector3(radius * Math.sin(Math.PI / 3), 0, radius * Math.cos(Math.PI / 3))); // 3, top left, then top right
		vertices.push(new THREE.Vector3(0, 0, radius)); // 4, top, then bot right
		vertices.push(new THREE.Vector3(- radius * Math.sin(Math.PI / 3), 0, radius * Math.cos(Math.PI / 3))); // 5, top right, then bottom right
		vertices.push(new THREE.Vector3(- radius * Math.sin(Math.PI / 3), 0, - radius * Math.cos(Math.PI / 3))); // 6, bot right, then bot left
		faces.push(new THREE.Face3(0, 2, 1));
		faces.push(new THREE.Face3(0, 3, 2));
		faces.push(new THREE.Face3(0, 4, 3));
		faces.push(new THREE.Face3(0, 5, 4));
		faces.push(new THREE.Face3(0, 6, 5));
		faces.push(new THREE.Face3(0, 1, 6));

		vertices[0].y = base.height;

		for(var face of faces)
		{
            face.color.setStyle(color);
            face.color.add(new THREE.Color(
                THREE.Math.randFloat(-.04, .04),
                THREE.Math.randFloat(-.04, .04),
                THREE.Math.randFloat(-.04, .04)
            ));
		}

		const geometry = new THREE.Geometry();
		geometry.vertices = vertices;
		geometry.faces = faces;

		const material = new THREE.MeshStandardMaterial({
			roughness: .95,
			transparent: false,
			vertexColors: THREE.FaceColors,
			flatShading: true,
		})

		const mesh = new THREE.Mesh(geometry, material);
		mesh.receiveShadow = true;
		mesh.castShadow = true;
		mesh.position.set(base.position.x, 0, base.position.y);
		mesh.rotation.set(0, base.angle, 0, "YXZ");

		return {
			mesh: mesh,
			vertices: vertices,
			faces: faces,
		};
	}

	averageSurfaceHeights(tile, others)
	{
		for(var vertex_id of [1, 2, 3, 4, 5, 6])
		{
			var adjacent_1 = tile.base.adjacents[vertex_id - 1];
			var adjacent_2 = tile.base.adjacents[vertex_id != 1 ? vertex_id - 2 : 5];

			var height_0 = tile.base.height;
			var height_1 = (adjacent_1 != null && others.has(adjacent_1)) ? others.get(adjacent_1).base.height : null;
			var height_2 = (adjacent_2 != null && others.has(adjacent_2)) ? others.get(adjacent_2).base.height : null;

			var avg_height = 0;

			if(height_1 != null && height_2 != null)
				avg_height = (height_0 + height_1 + height_2) / 3

			tile.vertices[vertex_id].y = avg_height;
		}
	}
}

/*
I have no idea what I'm doing right now. I don't understand why we're changing
from the old way of doing things to this new way. I guess because the client
doesn't really need all of the information, so I guess it does make it easier.
I'm thinking for each type, there's a generator function that kinda build off of
each other. Once they're part of the terrain and added to the scene, we can post
process them so that they can be animated as one unit, the Terrain. This will
probably be a lot of code, but this way the terrain is
*/
