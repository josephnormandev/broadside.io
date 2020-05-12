import Matter from 'matter-js';
const { Engine, World, Bodies, Body, Common } = Matter;

import * as THREE from 'three';

import Inputs from './three-utils/camera-inputs.js';
import { Sky } from './three-utils/sky.js';

import { isType, getType, getOfType, Dynamic } from './objects/objects.js';

import { AddObjectReceiver, BundledReceiver, EndMapStreamReceiver, RemoveObjectReceiver, TeamAssignmentReceiver, UpdateObjectReceiver } from './io/outputs/outputs.js';

export default class Renderer
{
    constructor(page)
    {
        this.page = page;

        this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        this.scene = new THREE.Scene();
        this.render = new THREE.WebGLRenderer();
        this.render.physicallyCorrectLights = true;
        this.render.shadowMap.enabled = true;
        this.render.autoClearColor = false;

        this.inputs = new Inputs();

        this.scene.add(new THREE.AxesHelper(5));

        this.objects = new Map();

        Engine.run(this.engine);
        this.animate();

        this.receivers = new Map();
        this.receivers.set(AddObjectReceiver.receiver, AddObjectReceiver);
        this.receivers.set(BundledReceiver.receiver, BundledReceiver);
        this.receivers.set(EndMapStreamReceiver.receiver, EndMapStreamReceiver);
        this.receivers.set(RemoveObjectReceiver.receiver, RemoveObjectReceiver);
        this.receivers.set(TeamAssignmentReceiver.receiver, TeamAssignmentReceiver);
        this.receivers.set(UpdateObjectReceiver.receiver, UpdateObjectReceiver);

        this.team_num = null;

		// dummy AF test sky
		var sky = new Sky();
		sky.scale.setScalar(450000);
		this.scene.add(sky);
    }

    mount(mount)
    {
        this.render.setSize(mount.clientWidth, mount.clientHeight);
        this.inputs.mount(mount, this.render.domElement, this.scene);

        var self = this;
    }

    animate()
    {
        requestAnimationFrame(this.animate.bind(this));

        if(this.inputs.mounted)
        {
            for(var [s_id, object] of this.objects)
            {
                getType(object).draw(object);
            }

            this.inputs.update();
            this.render.render(this.scene, this.inputs.camera);
        }
    }

    unmount()
    {
        this.inputs.unmount(this.scene);
    }

    sendMessage(message)
    {
        this.page.client.sendMessage(message);
    }

    handleMessage(receiver, data)
    {
        if(this.receivers.has(receiver))
        {
            this.receivers.get(receiver).receive(this, data);
        }
    }

    addObject(base_object)
    {
        var game_object = getType(base_object).create(this, base_object);
        this.objects.set(game_object.s_id, game_object);
        World.addBody(this.engine.world, game_object);

        getType(game_object).create3D(this.scene, game_object);
    }

    updateObject(update_object)
    {
        if(this.objects.has(update_object.s_id))
        {
            var game_object = this.objects.get(update_object.s_id);
            getType(game_object).update(game_object, update_object);
        }
    }

    removeObject(remove_object)
    {
        if(this.objects.has(remove_object.s_id))
        {
            this.objects.delete(remove_object.s_id);
        }
    }
}
