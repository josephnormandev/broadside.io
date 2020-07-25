import * as THREE from 'three';

import Dynamic from '../dynamic.js';

export default class Ship extends Dynamic
{
	static TYPE() { return 'ship'; }

	constructor(base, page)
	{
		super(base, page);

		this.center_geometry = new THREE.SphereGeometry(10, 10, 10);
		this.material = new THREE.MeshStandardMaterial({
			roughness: .1,
			transparent: false,
			opacity: 1,
			color: (page.team == this.team ? (page.ship_id == this.s_id ? 0x00aa00 : 0x0000aa) : 0xff0000),
			flatShading: false,
		});
		this.center_mesh = new THREE.Mesh(this.center_geometry, this.material);

		this.length_geometry = new THREE.BoxGeometry(30, 10, 15); // X Y Z
		this.center_mesh.updateMatrix();
		this.length_geometry.merge(this.center_mesh.geometry, this.center_mesh.matrix);

		this.mesh = new THREE.Mesh(this.length_geometry, this.material);

		this.update(base);

		page.scene.add(this.mesh);
	}

	draw()
	{
	}

	update(update)
	{
		super.update(update);
		this.mesh.position.set(this.position.x, 0, this.position.y);
		this.mesh.rotation.set(0, this.angle, 0, "YXZ");
	}
}
