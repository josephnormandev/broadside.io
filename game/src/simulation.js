import Matter from 'matter-js';
const { Engine, Render, World, Bodies } = Matter;

export default class Simulation
{
    constructor(map)
    {
        this.engine = Engine.create();

        this.bodies = map.teams;
        this.body_id = map.body_id;
    }

    update(time)
    {
        Engine.update(this.engine, time);
    }

    addObject(object)
    {

    }


}
