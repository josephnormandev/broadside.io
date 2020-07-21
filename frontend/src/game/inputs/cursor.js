import * as THREE from 'three';

export default class Cursor
{
	constructor()
	{
		this.width = null;
		this.height = null;
		this.requestPointerLock = null;

		this.mouseClick = this.mouseClick.bind(this);
		this.mouseScroll = this.mouseScroll.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.pointerLockChange = this.pointerLockChange.bind(this);

		this.mouse_x = 0;
		this.mouse_y = 0;
		this.clicked = false;
		this.pointer_lock = false;

		this.raycaster = new THREE.Raycaster();
		this.zoom = 1;
	}

	mount(mount, scene)
	{
		this.width = mount.clientWidth;
		this.height = mount.clientHeight;
		this.requestPointerLock = mount.requestPointerLock || mount.mozRequestPointerLock || mount.webkitRequestPointerLock;
		this.requestPointerLock = this.requestPointerLock.bind(mount);

		mount.addEventListener('click', this.mouseClick);
		mount.addEventListener('mousewheel', this.mouseScroll);
		window.addEventListener('mousemove', this.mouseMove);
		document.addEventListener('pointerlockchange', this.pointerLockChange);
	}

	updateCursor()
	{
		const rate = (this.pointer_lock == true ? 10 / this.zoom : 0);
		const edge = 10;

		var diff_x = 0;
		var diff_z = 0;

		if(this.mouse_x > this.width - edge) // right side
		{
			if(this.mouse_y > this.height - edge) // bot right
				diff_x = rate;
			else if(this.mouse_y < edge) // top right
				diff_z = -rate;
			else // right
			{
				diff_x = rate / Math.sqrt(2);
				diff_z = -rate / Math.sqrt(2);
			}
		}
		else if(this.mouse_x < edge)
		{
			if(this.mouse_y > this.height - edge) // bot left
				diff_z = rate;
			else if(this.mouse_y < edge) // top left
				diff_x = -rate;
			else // left
			{
				diff_x = -rate / Math.sqrt(2);
				diff_z = rate / Math.sqrt(2);
			}
		}
		else
		{
			if(this.mouse_y > this.height - edge) // bot
			{
				diff_x = rate / Math.sqrt(2);
				diff_z = rate / Math.sqrt(2);
			}
			else if(this.mouse_y < edge) // top
			{
				diff_x = -rate / Math.sqrt(2);
				diff_z = -rate / Math.sqrt(2);
			}
		}

		return {
			position_diff: new THREE.Vector3(diff_x, 0, diff_z),
			zoom: this.zoom,
		};
	}

	unmount(mount, scene)
	{
		this.width = null;
		this.height = null;
		this.requestPointerLock = null;

		mount.removeEventListener('click', this.mouseClick);
		mount.removeEventListener('mousewheel', this.mouseScroll);
		window.removeEventListener('mousemove', this.mouseMove);
		document.removeEventListener('pointerlockchange', this.pointerLockChange);
	}

	mouseMove(e)
	{
		if(this.pointer_lock == true)
		{
			this.mouse_x += e.movementX;
			this.mouse_y += e.movementY;

			this.mouse_x = Math.max(0, Math.min(this.width, this.mouse_x));
			this.mouse_y = Math.max(0, Math.min(this.height, this.mouse_y));
		}
	}

    mouseClick(e)
    {
		if(this.pointer_lock == false)
		{
			this.mouse_x = e.clientX;
			this.mouse_y = e.clientY;

			this.requestPointerLock();
		}
		else
		{
			this.clicked = true;
		}
    }

    mouseScroll(e)
    {
        const ZOOM_SENSITIVITY = .8;

        this.zoom += e.deltaY / -300 * ZOOM_SENSITIVITY;
        if(this.zoom > 1.5) this.zoom = 1.5;
        if(this.zoom < .1) this.zoom = .1;
    }

	pointerLockChange(e)
	{
		this.pointer_lock = !this.pointer_lock;
	}
}
