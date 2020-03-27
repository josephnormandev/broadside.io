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
        base_object.color = '#0000ff';

        var water_tile = Tile.create(simulation, base_object);
        return water_tile;
    }
}
