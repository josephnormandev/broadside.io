import * as THREE from 'three';

export default class Camera
{
	static PERSPECTIVE()
	{
		return 'perspective';
	}

	static ISOMETRIC()
	{
		return 'isometric';
	}

	constructor(mode)
	{
		this.mode = mode;
		if(this.mode == Camera.PERSPECTIVE())
		{
			this.camera = new THREE.PerspectiveCamera(90, 1, .1, 1000);
			this.camera.position.set(100, 100, 100);
			this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		}
		else if(this.mode == Camera.ISOMETRIC())
		{
			this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
			this.camera.position.set(100, 100, 100);
			this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		}
		else throw 'Camera mode not provided';

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.physicallyCorrectLights = true;
		this.renderer.shadowMap.enabled = true;
		this.renderer.autoClearColor = false;
	}

	get render_element()
	{
		return this.renderer.domElement;
	}

	get position()
	{
		return this.camera.position;
	}

	mount(mount, scene)
	{
		if(this.mode == Camera.PERSPECTIVE())
		{
			const aspect = mount.clientWidth / mount.clientHeight;

			this.camera.aspect = aspect;
			this.camera.updateProjectionMatrix();

			scene.add(this.camera);
		}
		else if(this.mode == Camera.ISOMETRIC())
		{
			const aspect = mount.clientWidth / mount.clientHeight;
			const d = 100;

			this.camera.left = aspect * -d;
			this.camera.right = aspect * d;
			this.camera.top = 1 * d;
			this.camera.bottom = 1 * -d;
			this.camera.updateProjectionMatrix();

			scene.add(this.camera);
		}

		this.renderer.setSize(mount.clientWidth, mount.clientHeight);
	}

	updateCamera(position_diff, zoom)
	{
		position_diff.add(this.camera.position);
		this.camera.position.lerp(position_diff, .5);

		this.camera.zoom = THREE.MathUtils.lerp(this.camera.zoom, zoom, .1);
		this.camera.updateProjectionMatrix();
	}

	render(scene)
	{
		this.renderer.render(scene, this.camera);
	}

	unmount(mount, scene)
	{
		scene.remove(this.camera);
	}
}
