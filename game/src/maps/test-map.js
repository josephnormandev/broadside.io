import Matter from 'matter-js';
const { Common, Vector } = Matter;

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
            s_id: 3,
            type: 'tile',
            position: Vector.create(300, 300),
        });
        // c^2 = 2(a^2)

        this.objects.add({
            s_id: 4,
            type: 'tile',
            position: Vector.create(300 + 30, 300 - Math.cos(Math.PI / 6) * 20),
        });
    }
}
