import Matter from 'matter-js';
const { Common, Vector } = Matter;

import { Tile } from '../objects/objects.js';

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
      ['w', 'w', 'w', 'w', 'g', 'g', 'w', 'w', 'w', 'w'],
    ['g', 'w', 'w', 'w', 'g', 'g', 'g', 'w', 'w', 'w'],
      ['w', 'w', 'w', 'w', 'g', 'g', 'w', 'w', 'w', 'w'],
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

        const radius = Tile.RADIUS();
        const a = Math.cos(Math.PI / 6) * radius;
        const b = 3 / 2 * radius;

        var index = 0;
        var y;
        var x;

        const height = map.length;
        const width = map[0].length;

        for(y = 0; y < height; y ++)
        {
            for(x = 0; x < width; x ++)
            {
                index = y * width + x;

                var type = [(map[y][x] == 'g' ? 'ground-tile' : 'water-tile')];

                var position = null;
                if(y % 2 == 0)
                    position = Vector.create(x * 2 * b, y * a);
                else
                    position = Vector.create(x * 2 * b + b, y * a);

                // this
                var adjacents = [];

                if(y % 2 != 0)
                {
                    if(y - 2 >= 0) // top
                        adjacents.push((y - 2) * width + x);
                    if(y - 1 >= 0) // top-left
                        adjacents.push((y - 1) * width + x);
                    if(y + 1 < height) // bottom-left
                        adjacents.push((y + 1) * width + x);
                    if(y + 2 < height) // bottom
                        adjacents.push((y + 2) * width + x);
                    if(x + 1 < width && y + 1 < height) // bottom-right
                        adjacents.push((y + 1) * width + (x + 1));
                    if(x + 1 < width && y - 1 >= 0) // top-right
                        adjacents.push((y - 1) * width + (x + 1));
                }
                else
                {
                    if(y - 2 >= 0) // top
                        adjacents.push((y - 2) * width + x);
                    if(y - 1 >= 0 && x - 1 >= 0) // top-left
                        adjacents.push((y - 1) * width + (x - 1));
                    if(y + 1 < height && x - 1 >= 0) // bottom-left
                        adjacents.push((y + 1) * width + (x - 1));
                    if(y + 2 < height) // bottom
                        adjacents.push((y + 2) * width + x);
                    if(y + 1 < height) // bottom-right
                        adjacents.push((y + 1) * width + x);
                    if(y - 1 >= 0) // top-right
                        adjacents.push((y - 1) * width + x);
                }

                this.objects.add({
                    s_id: index,
                    type: type,
                    position: position,
                    angle: Math.PI / 2,
                    adjacents: adjacents,
                });
            }
        }
        index ++;

        const map_width = x * 2 * b - b;
        const map_height = y * a - a;
        this.objects.add({
            s_id: index ++,
            type: ['world-bound'],
            width: map_width,
            height: map_height,
            position: Vector.create(map_width / 2, map_height / 2),
            angle: Math.PI,
        });
        this.objects.add({
            s_id: index ++,
            type: ['destroyer'],
            team_num: 1,
            position: Vector.create(200, 350),
            angle: 0,
        });
        this.objects.add({
            s_id: index ++,
            type: ['aircraft-carrier'],
            team_num: 2,
            position: Vector.create(150, 150),
            angle: 1,
        });
    }
}
