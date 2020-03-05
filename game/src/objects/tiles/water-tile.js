import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import Tile from './tile.js';
import Categories from '../categories.js';

export default class WaterTile extends Tile
{
    static TYPE()
    {
        return 'water-tile';
    }

    static create(base_object)
    {
        base_object.type = WaterTile.TYPE();
        base_object.category = Categories.Water;
        var tile = Tile.create(base_object);
        tile.render.fillStyle = '#0000ff';
        return tile;
    }
}
