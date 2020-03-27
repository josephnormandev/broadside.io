import * as THREE from 'three';

export default class CameraInputs
{
    constructor(renderer)
    {
        this.renderer = renderer;

        this.camera = null;
    }

    mount(mount)
    {
        this.camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);
        this.camera.aspect = mount.clientWidth / mount.clientHeight;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(0, 10, 0);
        this.camera.rotation.set(2.5 * Math.PI / 2, 0, 0);

        this.renderer.scene.add(this.camera);

        // add event listeners
    }

    unmount(mount)
    {
        this.renderer.scene.remove(this.camera);
        this.camera = null;

        // remove event listeners
    }
}
