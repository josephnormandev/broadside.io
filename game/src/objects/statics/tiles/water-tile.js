import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import { Tile, Categories, addType } from '../../objects.js';

export default class WaterTile extends Tile
{
    static TYPE()
    {
        return 'water-tile';
    }

    static create(simulation, base_object)
    {
        base_object.type = []; addType(base_object.type, WaterTile.TYPE());
        base_object.category = Categories.Water;

        var water_tile = Tile.create(simulation, base_object);
        water_tile.render.fillStyle = '#0000ff';

        return water_tile;
    }
}
