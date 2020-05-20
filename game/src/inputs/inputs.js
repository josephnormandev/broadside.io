import * as THREE from 'three';

import Camera from './camera.js';
import Cursor from './cursor.js';
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
		this.camera = new Camera(Camera.ISOMETRIC());
		this.cursor = new Cursor();
		this.lighting = new Lighting();

        // EVENT HANDLERS
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);

        // INPUTS
        this.keys = new Set();
    }

    mount(mount, scene)
    {
		this.mount_element = mount;
		this.mount_element.appendChild(this.camera.render_element);

		this.camera.mount(this.mount_element, scene);
		this.cursor.mount(this.mount_element, scene);
		this.lighting.mount(this.mount_element, scene);

        // add event listeners using the react ref
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp);

        this.keys.clear();
    }

    get mounted()
    {
        return this.mount_element != null;
    }

    update()
    {
		// INPUTS
		const { position_diff, zoom } = this.cursor.updateCursor();

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
		this.camera.unmount(this.mount_element, scene);
		this.lighting.unmount(this.mount_element, scene);

        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);

        this.mount_element = null;

        this.keys.clear();
    }

    keyDown(e)
    {
        this.keys.add(e.which);
    }

    keyUp(e)
    {
        this.keys.delete(e.which);
    }
}
