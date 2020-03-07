import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import Tile from './tile.js';
import Categories from '../categories.js';

export default class GroundTile extends Tile
{
    static TYPE()
    {
        return 'ground-tile';
    }

    static create(simulation, base_object)
    {
        base_object.type = GroundTile.TYPE();
        base_object.category = Categories.Ground;
        var tile = Tile.create(simulation, base_object);
        tile.render.fillStyle = '#00ff00';
        return tile;
    }
}
