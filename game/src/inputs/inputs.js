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
        this.mouseClick = this.mouseClick.bind(this);
        this.mouseScroll = this.mouseScroll.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.pointerLockChange = this.pointerLockChange.bind(this);

        // INPUTS
		this.pointer_lock = false;
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
        this.camera.render_element.addEventListener('click', this.mouseClick);
        this.camera.render_element.addEventListener('mousewheel', this.mouseScroll);
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp);
        document.addEventListener('pointerlockchange', this.pointerLockChange);

        this.keys.clear();
    }

    get mounted()
    {
        return this.mount_element != null;
    }

    update()
    {
		const rate = 1;
		const edge = .9;

		if(this.mouse_position.x > edge)
			if(this.mouse_position.y > edge) // top right
				this.position.z -= rate;
			else if(this.mouse_position.y < -edge)
				this.position.x += rate;
			else // right
			{
				this.position.x += rate / Math.sqrt(2);
				this.position.z -= rate / Math.sqrt(2);
			}
		else if(this.mouse_position.x < -edge)
		{
			if(this.mouse_position.y > edge) // top left
				this.position.x -= rate;
			else if(this.mouse_position.y < -edge) // bottom left
				this.position.z += rate;
			else // left
			{
				this.position.x -= rate / Math.sqrt(2);
				this.position.z += rate / Math.sqrt(2);
			}
		}
		else
		{
			if(this.mouse_position.y > edge) // top
			{
				this.position.x -= rate / Math.sqrt(2);
				this.position.z -= rate / Math.sqrt(2);
			}
			else if(this.mouse_position.y < -edge) // bottom
			{
				this.position.x += rate / Math.sqrt(2);
				this.position.z += rate / Math.sqrt(2);
			}
		}

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

        this.camera.render_element.removeEventListener('click', this.mouseClick);
        this.camera.render_element.removeEventListener('scroll', this.mouseScroll);
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);
        document.removeEventListener('pointerlockchange', this.pointerLockChange);

        this.mount_element = null;

        this.keys.clear();
    }

    mouseMove(e)
    {
		if(this.pointer_lock == true)
		{
			console.log(this.mouse_position);
		}
    }

    mouseClick(e)
    {
		this.mouse_position.x = (e.clientX / this.mount_element.clientWidth) * 2 - 1;
		this.mouse_position.y = -(e.clientY / this.mount_element.clientHeight) * 2 + 1;

		if(this.pointer_lock == false)
		{
			const element = this.camera.render_element;
			element.requestPointerLock = element.requestPointerLock
										|| element.mozRequestPointerLock
										|| element.webkitRequestPointerLock;
			element.requestPointerLock();
		}
		else
		{
			this.raycaster.setFromCamera(this.mouse_position, this.camera.get());

			console.log(this.simulation.getRaycastObjects(this.raycaster));
		}
    }

	pointerLockChange(e)
	{
		this.pointer_lock = !this.pointer_lock;
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
