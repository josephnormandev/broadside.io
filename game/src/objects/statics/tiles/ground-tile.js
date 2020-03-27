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
        base_object.color = '#00ff00';

        var ground_tile = Tile.create(simulation, base_object);
        return ground_tile;
    }
}
