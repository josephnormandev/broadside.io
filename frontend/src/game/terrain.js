import * as THREE from 'three';

export default class Terrain
{
	constructor()
	{
		this.terrain_tiles = new Map();
		this.water_terrain_tiles = new Map();
		this.water_tiles = new Map();
	}

	generate(scene, objects)
	{
		for(const base of objects)
		{
			const s_id = base.s_id;

			switch(base.type)
			{
				case 'grass-tile':
					this.grassTile(scene, base);
					break;
				case 'sand-tile':
					this.sandTile(scene, base);
					break;
				case 'water-tile':
					this.waterTile(scene, base);
					break;
			}
		}

		for(const [s_id, tile] of this.terrain_tiles)
		{
			this.averageSurfaceHeights(tile, this.terrain_tiles);
		}

		for(const [s_id, tile] of this.water_terrain_tiles)
		{
			this.averageSurfaceHeights(tile, this.water_terrain_tiles);
		}

		for(const [s_id, tile] of this.terrain_tiles)
		{
			this.applyRockiness(tile);
		}

		for(const [s_id, tile] of this.water_tiles)
		{
			this.randomHeights(tile);
		}

		console.log(this.water_tiles)
	}

	draw()
	{
		for(const [s_id, tile] of this.water_tiles)
		{
			if(tile.bob == true)
			{
				tile.vertices[0].y += .05;
				if(tile.vertices[0].y > 2.5)
					tile.bob = false;
			}
			else
			{
				tile.vertices[0].y -= .05;
				if(tile.vertices[0].y < -2.5)
					tile.bob = true;
			}
		}

		for(const [s_id, tile] of this.water_tiles)
		{
			this.averageSurfaceHeights(tile, this.water_tiles);
			tile.mesh.geometry.verticesNeedUpdate = true;
		}
	}

	grassTile(scene, base)
	{
		const color = '#3db020';

		this.terrain_tiles.set(base.s_id, this.terrainTile(scene, base, color));
	}

	sandTile(scene, base)
	{
		const color = '#edd9af';

		this.terrain_tiles.set(base.s_id, this.terrainTile(scene, base, color));
	}

	waterTile(scene, base)
	{
		const water_color = '#0077be';
		const {
			mesh,
			vertices,
			faces,
		} = this.createHexagonMesh(new THREE.MeshStandardMaterial({
			roughness: .5,
			transparent: true,
			opacity: .6,
			vertexColors: THREE.FaceColors,
			flatShading: true,
		}), {
			...base,
			height: 0,
		}, water_color);

		scene.add(mesh);

		this.water_tiles.set(base.s_id, {
			mesh: mesh,
			vertices: vertices,
			faces: faces,
			base: base,
		});

		const floor_color = '#e5c9aa';//'#e5c9aa';
		this.water_terrain_tiles.set(base.s_id, this.terrainTile(scene, base, floor_color));
	}

	terrainTile(scene, base, color)
	{
		const {
			mesh,
			vertices,
			faces,
		} = this.createHexagonMesh(new THREE.MeshStandardMaterial({
			roughness: .95,
			transparent: false,
			vertexColors: THREE.FaceColors,
			flatShading: true,
		}), base, color);

		scene.add(mesh);

		return {
			mesh, vertices, faces, base
		};
	}

	createHexagonMesh(material, base, color)
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

			var height_0 = tile.vertices[0].y;
			var height_1 = (adjacent_1 != null && others.has(adjacent_1)) ? others.get(adjacent_1).vertices[0].y : null;
			var height_2 = (adjacent_2 != null && others.has(adjacent_2)) ? others.get(adjacent_2).vertices[0].y : null;

			var avg_height = 0;

			if(height_1 != null && height_2 != null)
				avg_height = (height_0 + height_1 + height_2) / 3

			tile.vertices[vertex_id].y = avg_height;
		}
	}

	applyRockiness(tile)
	{
		var rocky_color = null;
		switch(tile.base.type)
		{
			case 'sand-tile':
				rocky_color = '#d6c298';
				break;
			case 'grass-tile':
				rocky_color = '#888888';
				break;
		}

		for(const face of tile.faces)
		{
			const h1 = tile.vertices[face.a].y;
			const h2 = tile.vertices[face.b].y;
			const h3 = tile.vertices[face.c].y;

			const min = Math.min(h1, h2, h3);
			const max = Math.max(h1, h2, h3);

			if((max - min) > 7)
			{
				face.color.setStyle(rocky_color);
				face.color.add(new THREE.Color(
					THREE.Math.randFloat(-.04, .04),
	                THREE.Math.randFloat(-.04, .04),
	                THREE.Math.randFloat(-.04, .04),
				));
			}
		}
	}

	randomHeights(tile)
	{
		tile.vertices[0].y = THREE.Math.randFloat(-2.5, 2.5);
		tile.bob = (THREE.Math.randInt(0, 1) == 1);
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
