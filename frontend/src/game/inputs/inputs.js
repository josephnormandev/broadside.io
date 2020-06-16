import * as THREE from 'three';

import Camera from './camera';

export default class Inputs
{
	constructor()
	{
		this.mount_element = null;

		this.camera = new Camera(Camera.ISOMETRIC());
	}

	mount(mount, scene)
	{
		this.mount_element = mount;
		this.mount_element.appendChild(this.camera.render_element);

		this.camera.mount(this.mount_element, scene);
	}

	get mounted()
	{
		return this.mount_element != null;
	}

	update()
	{

	}

	render(scene)
	{
		this.camera.render(scene);
	}

	unmount(scene)
	{
		this.camera.unmount(this.mount_element, scene);

		this.mount_element = null;
	}
}
