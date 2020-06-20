import * as THREE from 'three';

// the terrain object is the encapsulation of all of the tiles that make up the
// terrain. this includes all water and grassy tiles. this is because the physics
// engine deals with tiles as separate collidable objects while threejs can
// compile them all into one mesh.
export default class Terrain
{
	constructor()
	{
		this.vertices = [];
		this.faces = [];
	}

	generate(objects)
	{
		for(var object of objects)
		{
			
		}
	}
}
