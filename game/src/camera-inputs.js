import * as THREE from 'three';

export default class CameraInputs
{
    constructor(renderer)
    {
        this.renderer = renderer;

        this.camera = null;

        this.keys = new Set();
    }

    mount(mount)
    {
        this.camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);
        this.camera.aspect = mount.clientWidth / mount.clientHeight;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(0, 0, 10);
        this.camera.rotation.set(0, 0, 0 ,'YXZ');

        this.renderer.scene.add(this.camera);

        this.keys.clear();
        // add event listeners
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
    }

    update()
    {
        if(this.keys.has(87) && this.camera.rotation.x < Math.PI / 2)
            this.camera.rotation.x += .05;
        if(this.keys.has(83) && this.camera.rotation.x > Math.PI / -2)
            this.camera.rotation.x -= .05;
        if(this.keys.has(65)) // left
            this.camera.rotation.y += .05;
        if(this.keys.has(68)) // right
            this.camera.rotation.y -= .05;

        if(this.keys.has(38))
            this.camera.position.z -= .2;
        if(this.keys.has(40))
            this.camera.position.z += .2;
        if(this.keys.has(37))
            this.camera.position.x -= .2;
        if(this.keys.has(39))
            this.camera.position.x += .2;
        if(this.keys.has(16))
            this.camera.position.y -= .2;
        if(this.keys.has(32))
            this.camera.position.y += .2;
    }

    unmount(mount)
    {
        this.renderer.scene.remove(this.camera);
        this.camera = null;

        this.keys.clear();
        // remove event listeners
        document.removeEventListener('keydown', this.keyDown.bind(this));
        document.removeEventListener('keyup', this.keyUp.bind(this));
    }

    keyDown(e)
    {
        console.log(e.which)
        this.keys.add(e.which);
    }

    keyUp(e)
    {
        this.keys.delete(e.which);
    }
}
