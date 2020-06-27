import terrainMessage from '../messages/terrain.js';

import { getOfType, getOneOfType, getType, WorldBorder, Tile } from '../../objects/objects.js';

export function receive(game, game_player, data)
{
	game_player.ready();

	// send all of the terrain objects to the player
	const tiles = getOfType(game.objects, Tile.TYPE);
	const world_border = getOneOfType(game.objects, WorldBorder.TYPE);

	const terrain_objects = [];

	for(const [s_id, tile] of tiles)
	{
		terrain_objects.push(getType(tile).getBase(tile));
	}

	if(world_border != null)
	{
		game_player.send(terrainMessage(terrain_objects, world_border.width, world_border.height));
	}
}

export const receiver = 'ready';
