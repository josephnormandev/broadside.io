import Matter from 'matter-js';
const { Common, Vector } = Matter;

const map = [
    ['w', 'w', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'w'],
      ['w', 'w', 'g', 'g', 'g', 'g', 'g', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'g', 'g', 'g', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['g', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['g', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
];

export default class TestMap
{
    constructor()
    {
        this.objects = new Set();

        const radius = 20;
        const a = Math.cos(Math.PI / 6) * radius;
        const b = 3 / 2* radius;

        var index = 0;
        var y;
        var x;

        for(y = 0; y < map.length; y ++)
        {
            for(x = 0; x < map[y].length; x ++)
            {
                index = y * map[y].length + x;
                var type = (map[y][x] == 'g' ? 'ground-tile' : 'water-tile');
                var position = null;

                if(y % 2 == 0)
                {
                    position = Vector.create(
                        x * 2 * b,
                        y * a,
                    );
                }
                else
                {
                    position = Vector.create(
                        x * 2 * b + b,
                        y * a,
                    );
                }
                this.objects.add({
                    s_id: index,
                    type: type,
                    position: position,
                });
            }
        }
        index ++;

        const width = x * 2 * b - b;
        const height = y * a - a;
        this.objects.add({
            s_id: index ++,
            type: 'world-bound',
            width: width,
            height: height,
            position: Vector.create(width / 2, height / 2),
        });
        this.objects.add({
            s_id: index ++,
            type: 'ship',
            team_num: 1,
            position: Vector.create(200, 150),
        });
        this.objects.add({
            s_id: index ++,
            type: 'ship',
            team_num: 1,
            position: Vector.create(250, 150),
        });
        this.objects.add({
            s_id: index ++,
            type: 'ship',
            team_num: 2,
            position: Vector.create(150, 150),
        });
        this.objects.add({
            s_id: index ++,
            type: 'ship',
            team_num: 2,
            position: Vector.create(100, 150),
        });
    }
}
