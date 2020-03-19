import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import { Tile, Categories, addType } from '../../objects.js';

export default class GroundTile extends Tile
{
    static TYPE()
    {
        return 'ground-tile';
    }

    static create(simulation, base_object)
    {
        base_object.type = []; addType(base_object.type, GroundTile.TYPE());
        base_object.category = Categories.Ground;

        var ground_tile = Tile.create(simulation, base_object);
        ground_tile.render.fillStyle = '#00ff00';
        return ground_tile;
    }
}
