import * as THREE from 'three';

export default class CameraInputs
{
    constructor(renderer)
    {
        this.camera = null;
        this.keys = new Set();
    }

    mount(mount, scene)
    {
        this.camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);
        this.camera.aspect = mount.clientWidth / mount.clientHeight;
        this.camera.updateProjectionMatrix();
        this.camera.position.set(50, 50, 50);
        this.camera.rotation.set(- Math.PI / 4, Math.PI / 4, 0 ,'YXZ');

        this.sun_light = new THREE.DirectionalLight(0xFFF6DA, 3);
        this.sun_light_target = new THREE.Object3D();
        this.sun_light.target = this.sun_light_target;
        this.sun_light.castShadow = true;
        this.sun_light.shadow.mapSize.copy(new THREE.Vector2(2000, 2000));
        this.sun_light.shadow.camera.zoom = .02;
        this.sun_light.shadow.camera.far = 2000;

        this.ambient_light = new THREE.AmbientLight(0xFFF6DA);

        scene.add(this.camera);
        scene.add(this.sun_light);
        scene.add(this.sun_light_target);
        scene.add(this.ambient_light);

        this.keys.clear();
        // add event listeners
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
    }

    update()
    {
        /*
        if(this.keys.has(87) && this.camera.rotation.x < Math.PI / 2)
            this.camera.rotation.x += .05;
        if(this.keys.has(83) && this.camera.rotation.x > Math.PI / -2)
            this.camera.rotation.x -= .05;
        if(this.keys.has(65)) // left
            this.camera.rotation.y += .05;
        if(this.keys.has(68)) // right
            this.camera.rotation.y -= .05;
            */

        if(this.keys.has(38) || this.keys.has(87))
            this.camera.position.z -= .5;
        if(this.keys.has(40) || this.keys.has(83))
            this.camera.position.z += .5;
        if(this.keys.has(37) || this.keys.has(65))
            this.camera.position.x -= .5;
        if(this.keys.has(39) || this.keys.has(68))
            this.camera.position.x += .5;
        if(this.keys.has(16))
            this.camera.position.y -= .5;
        if(this.keys.has(32))
            this.camera.position.y += .5;

        this.sun_light.position.set(-500, 1000, 500);
        this.sun_light.position.add(this.camera.position);
        this.sun_light_target.position.copy(this.camera.position);
    }

    unmount(mount, scene)
    {
        scene.remove(this.camera);
        scene.remove(this.sun_light);
        scene.remove(this.sun_light_target);
        scene.remove(this.ambient_light);
        this.camera = null;

        this.keys.clear();
        // remove event listeners
        document.removeEventListener('keydown', this.keyDown.bind(this));
        document.removeEventListener('keyup', this.keyUp.bind(this));
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
