import Matter from 'matter-js';
const { Common, Vector } = Matter;

const map = '';

export default class TestMap
{
    constructor()
    {
        this.objects = new Set();
        this.objects.add({
            s_id: 1,
            type: 'ship',
            team_num: 1,
            position: Vector.create(250, 250),
        });
        this.objects.add({
            s_id: 2,
            type: 'ship',
            team_num: 2,
            position: Vector.create(250, 200),
        });
        this.objects.add({
            s_id: 5,
            type: 'world-bound',
            width: 1000,
            height: 800,
            position: Vector.create(500, 400),
        });

        this.objects.add({
            s_id: 3,
            type: 'tile',
            position: Vector.create(100, 200),
        });
    }
}
