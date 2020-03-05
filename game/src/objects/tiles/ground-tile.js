import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import Tile from './tile.js';

export default GroundTile extends Tile
{
    static TYPE()
    {
        return 'ground-tile';
    }

    static create(base_object)
    {

    }
}
