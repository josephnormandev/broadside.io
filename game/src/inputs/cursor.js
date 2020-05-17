import * as THREE from 'three';

export default class Cursor
{
	constructor()
	{
		this.sprite_material = new THREE.SpriteMaterial({
			map: this.sprite_map,
		});

		this.sprite = new THREE.Sprite(this.sprite_material);
	}

	mount(mount, scene)
	{
		scene.add(this.sprite);
	}

	updateCursor(mouse_position)
	{

	}

	unmount(scene)
	{
		scene.remove(this.sprite);
	}
}
