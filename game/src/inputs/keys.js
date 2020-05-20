import * as THREE from 'three';

export default class Keys
{
	constructor()
	{
		// EVENT HANDLERS
		this.keyDown = this.keyDown.bind(this);
		this.keyUp = this.keyUp.bind(this);

		// INPUTS
		this.keys = new Set();
	}

	mount(mount, scene)
	{
		window.addEventListener('keydown', this.keyDown);
		window.addEventListener('keyup', this.keyUp);

		this.keys.clear();
	}

	updateKeys()
	{
		
	}

	unmount(mount, scene)
	{
		window.removeEventListener('keydown', this.keyDown);
		window.removeEventListener('keyup', this.keyUp);

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
