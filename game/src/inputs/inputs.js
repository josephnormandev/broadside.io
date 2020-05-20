import * as THREE from 'three';

import Cursor from './cursor.js';
import Keys from './keys.js';

import Camera from './camera.js';
import Lighting from './lighting.js';

// a wrapper class for all things inputs. This is basically the one object
// that defines simulation on the frontend
export default class Inputs
{
    constructor(simulation)
    {
		this.simulation = simulation;
        this.mount_element = null;

		// important elements to the Input stuff
		this.cursor = new Cursor();
		this.keys = new Keys();

		this.camera = new Camera(Camera.ISOMETRIC());
		this.lighting = new Lighting();
    }

    mount(mount, scene)
    {
		this.mount_element = mount;
		this.mount_element.appendChild(this.camera.render_element);

		this.cursor.mount(this.mount_element, scene);
		this.keys.mount(this.mount_element, scene);

		this.camera.mount(this.mount_element, scene);
		this.lighting.mount(this.mount_element, scene);
    }

    get mounted()
    {
        return this.mount_element != null;
    }

    update()
    {
		// INPUTS
		const { position_diff, zoom } = this.cursor.updateCursor();
		const bruh = this.keys.updateKeys();

		// OUTPUTS
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
		this.keys.unmount(this.mount_element, scene);

		this.camera.unmount(this.mount_element, scene);
		this.lighting.unmount(this.mount_element, scene);

        this.mount_element = null;
    }
}
