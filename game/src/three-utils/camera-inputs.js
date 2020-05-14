import * as THREE from 'three';

export default class CameraInputs
{
    constructor()
    {
        this.mount_element = null;
        this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
        this.camera.position.set(100, 100, 100);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

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

		const aspect = this.mount_element.clientWidth / this.mount_element.clientHeight;
		console.log(this.mount_element.clientWidth, this.mount_element.clientHeight, aspect);
		const d = 100;

        this.camera.left = aspect * -d;
        this.camera.right = aspect * d;
        this.camera.top = 1 * d;
        this.camera.bottom = 1 * -d;
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
        if(this.keys.has(38) || this.keys.has(87))
            this.camera.position.z -= 5;
        if(this.keys.has(40) || this.keys.has(83))
            this.camera.position.z += 5;
        if(this.keys.has(37) || this.keys.has(65))
            this.camera.position.x -= 5;
        if(this.keys.has(39) || this.keys.has(68))
            this.camera.position.x += 5;

        // control how the camera zooms in
		this.camera.zoom = THREE.MathUtils.lerp(this.camera.zoom, this.zoom, .1);
		this.camera.updateProjectionMatrix();

        this.sun_light.position.set(-500, 1000, 500);
        this.sun_light.position.add(this.camera.position);
        this.sun_light_target.position.set(0, 0, 0);
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
        const ZOOM_SENSITIVITY = -.5; // will need to be changed later to reflect
                                    // players controls

        this.zoom += e.deltaY / 300 * ZOOM_SENSITIVITY * 2;

        if(this.zoom > 2) this.zoom = 2;
        if(this.zoom < .1) this.zoom = .1;
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
