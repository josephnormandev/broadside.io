import * as THREE from 'three';

import Cursor from './cursor';

import Camera from './camera';
import Lighting from './lighting';

export default class Inputs
{
	constructor()
	{
		this.mount_element = null;

		this.cursor = new Cursor();

		this.camera = new Camera(Camera.ISOMETRIC());
		this.lighting = new Lighting();
	}

	mount(mount, scene)
	{
		this.mount_element = mount;
		this.mount_element.appendChild(this.camera.render_element);

		this.cursor.mount(this.mount_element, scene);

		this.camera.mount(this.mount_element, scene);
		this.lighting.mount(this.mount_element, scene);
	}

	get mounted()
	{
		return this.mount_element != null;
	}

	update()
	{
		const { position_diff, zoom } = this.cursor.updateCursor();

		this.camera.updateCamera(position_diff, zoom);
		this.lighting.updateLighting(this.camera.position);
	}

	render(scene)
	{
		this.camera.render(scene);
	}

	unmount(scene)
	{
		this.cursor.unmount(this.mount_element, scene);

		this.camera.unmount(this.mount_element, scene);
		this.lighting.unmount(this.mount_element, scene);

		this.mount_element = null;
	}
}
