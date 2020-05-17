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
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseClick = this.mouseClick.bind(this);
        this.mouseScroll = this.mouseScroll.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);

        // INPUTS
        this.mouse_position = new THREE.Vector2();
        this.keys = new Set();

		// OUTPUTS
        this.raycaster = new THREE.Raycaster();
		this.position = new THREE.Vector3(100, 100, 100);
        this.zoom = 1;
    }

    mount(mount, scene)
    {
		this.mount_element = mount;
		this.mount_element.appendChild(this.camera.render_element);

		this.camera.mount(this.mount_element, scene);
		this.cursor.mount(this.mount_element, scene);
		this.lighting.mount(this.mount_element, scene);

        // add event listeners using the react ref
        this.mount_element.addEventListener('mousemove', this.mouseMove);
        this.mount_element.addEventListener('click', this.mouseClick);
        this.mount_element.addEventListener('mousewheel', this.mouseScroll);
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
        if(this.keys.has(38) || this.keys.has(87))
            this.position.z -= 5;
        if(this.keys.has(40) || this.keys.has(83))
            this.position.z += 5;
        if(this.keys.has(37) || this.keys.has(65))
            this.position.x -= 5;
        if(this.keys.has(39) || this.keys.has(68))
            this.position.x += 5;

		this.camera.updateCamera(this.position, this.zoom);
		this.cursor.updateCursor(this.mouse_position);
		this.lighting.updateLighting(this.position);
    }

	render(scene)
	{
		this.camera.render(scene);
	}

    unmount(scene)
    {
		this.cursor.unmount(scene);
		this.camera.unmount(scene);
		this.lighting.unmount(scene);

        this.mount_element.removeEventListener('mousemove', this.mouseMove);
        this.mount_element.removeEventListener('click', this.mouseClick);
        this.mount_element.removeEventListener('scroll', this.mouseScroll);
        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);

        this.mount_element = null;

        this.keys.clear();
    }

    mouseMove(e)
    {
        this.mouse_position.x = (e.clientX / this.mount_element.clientWidth) * 2 - 1;
        this.mouse_position.y = -(e.clientY / this.mount_element.clientHeight) * 2 + 1;
    }

    mouseClick(e)
    {

    }

    mouseScroll(e)
    {
        const ZOOM_SENSITIVITY = .8; // will need to be changed later to reflect
                                    // players controls

        this.zoom += e.deltaY / -300 * ZOOM_SENSITIVITY * 1;

        if(this.zoom > 1.5) this.zoom = 1.5;
        if(this.zoom < .4) this.zoom = .4;
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
