import * as THREE from 'three';

export default class Lighting
{
	constructor()
	{
		this.sun_light = new THREE.DirectionalLight(0xFFF6DA, 3);
        this.sun_light_target = new THREE.Object3D();
        this.sun_light.target = this.sun_light_target;
        this.sun_light.castShadow = true;
        this.sun_light.shadow.mapSize.copy(new THREE.Vector2(2000, 2000));
        this.sun_light.shadow.camera.zoom = .02;
        this.sun_light.shadow.camera.far = 2000;

        this.ambient_light = new THREE.AmbientLight(0xFFF6DA);
	}

	mount(mount, scene)
	{
		scene.add(this.sun_light);
		scene.add(this.sun_light_target);
		scene.add(this.ambient_light);
	}

	updateLighting(position)
	{
		this.sun_light.position.set(-500, 1000, 500);
		this.sun_light.position.add(position);
		this.sun_light_target.position.set(0, 0, 0);
		this.sun_light_target.position.add(position);
	}

	unmount(mount, scene)
	{
		scene.remove(this.sun_light);
		scene.remove(this.sun_light_target);
		scene.remove(this.ambient_light);
	}
}
