import * as THREE from 'three';

import Dynamic from '../dynamic.js';

export default class Ship extends Dynamic
{
	static TYPE() { return 'ship'; }

	constructor(base)
	{
		super(base);

		this.mesh = new THREE.Mesh(
			new THREE.SphereGeometry(5, 10, 10),
			new THREE.MeshStandardMaterial({
				roughness: .1,
				transparent: false,
				opacity: 1,
				color: 0xffff00,
				flatShading: false,
			}),
		);

		this.update(base);
	}

	addTo(scene)
	{
		scene.add(this.mesh);
	}

	draw()
	{
		this.mesh.position.lerp(new THREE.Vector3(this.position.x, 50, this.position.y), .2);
	}

	update(update)
	{
		super.update(update);
		this.mesh.rotation.set(0, this.angle, 0, "YXZ");
	}
}
