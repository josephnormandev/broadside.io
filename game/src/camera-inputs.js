import * as THREE from 'three';

export default class CameraInputs
{
    constructor()
    {
        this.mount_element = null;
        this.camera = new THREE.PerspectiveCamera(90, 1, .1, 1000);
        this.camera.position.set(50, 50, 50);
        this.camera.rotation.set(- Math.PI / 4, Math.PI / 4, 0 ,'YXZ');

        // world elements
        this.sun_light = new THREE.DirectionalLight(0xFFF6DA, 3);
        this.sun_light_target = new THREE.Object3D();
        this.sun_light.target = this.sun_light_target;
        this.sun_light.castShadow = true;
        this.sun_light.shadow.mapSize.copy(new THREE.Vector2(2000, 2000));
        this.sun_light.shadow.camera.zoom = .02;
        this.sun_light.shadow.camera.far = 2000;

        this.ambient_light = new THREE.AmbientLight(0xFFF6DA);

        // have to make this "bound" version of these handlers
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseClick = this.mouseClick.bind(this);
        this.mouseScroll = this.mouseScroll.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);

        // keeps track of inputs
        this.raycaster = new THREE.Raycaster();
        this.mouse_position = new THREE.Vector2();
        this.zoom = 1;
        this.keys = new Set();
        this.selected = new Set();
    }

    mount(mount, render_element, scene)
    {
        this.mount_element = mount;
        this.mount_element.appendChild(render_element);

        this.camera.aspect = this.mount_element.clientWidth / this.mount_element.clientHeight;
        this.camera.updateProjectionMatrix();

        scene.add(this.camera);
        scene.add(this.sun_light);
        scene.add(this.sun_light_target);
        scene.add(this.ambient_light);

        // add event listeners using the react ref
        this.mount_element.addEventListener('mousemove', this.mouseMove);
        this.mount_element.addEventListener('click', this.mouseClick);
        this.mount_element.addEventListener('mousewheel', this.mouseScroll);
        window.addEventListener('keydown', this.keyDown);
        window.addEventListener('keyup', this.keyUp);

        this.keys.clear();
        this.selected.clear();
    }

    get mounted()
    {
        return this.mount_element != null;
    }

    update()
    {

        // control how the camera zooms in
        this.camera.position.lerp(new THREE.Vector3(
            this.camera.position.x,
            this.zoom * 45 + 25,
            this.camera.position.z,
        ), .1);
        const targetQuat = new THREE.Quaternion();
        targetQuat.setFromEuler(new THREE.Euler(
            - Math.PI * .3 + this.zoom * Math.PI * .12,
            this.camera.rotation.y,
            this.camera.rotation.z, "YXZ"
        ));
        this.camera.quaternion.slerp(targetQuat, .1);

        this.sun_light.position.set(-500, 1000, 500);
        this.sun_light.position.add(this.camera.position);
        this.sun_light_target.position.copy(this.camera.position);
    }

    unmount(scene)
    {
        scene.remove(this.camera);
        scene.remove(this.sun_light);
        scene.remove(this.sun_light_target);
        scene.remove(this.ambient_light);

        this.mount_element.removeEventListener('mousemove', this.mouseMove);
        this.mount_element.removeEventListener('click', this.mouseClick);
        this.mount_element.removeEventListener('scroll', this.mouseScroll);
        window.removeEventListener('keydown', this.keyDown);
        window.removeEventListener('keyup', this.keyUp);

        this.mount_element = null;

        this.keys.clear();
        this.selected.clear();
    }

    mouseMove(e)
    {
        this.mouse_position.x = (e.clientX / this.mount_element.clientWidth) * 2 - 1;
        this.mouse_position.y = -(e.clientY / this.mount_element.clientHeight) * 2 + 1;
    }

    mouseClick(e)
    {
        this.raycaster.setFromCamera(this.mouse_position, this.camera);

        // from here, check all of the objects to see if the mesh is being selected
        console.log(this.mouse_position);
    }

    mouseScroll(e)
    {
        const ZOOM_SENSITIVITY = .5; // will need to be changed later to reflect
                                    // players controls

        this.zoom += e.deltaY / 300 * ZOOM_SENSITIVITY;

        if(this.zoom > 1) this.zoom = 1;
        if(this.zoom < 0) this.zoom = 0;

        console.log(this.zoom);
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
