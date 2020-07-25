import terrainMessage from '../messages/terrain.js';
import assignTeamMessage from '../messages/assign-team.js';
import assignShipMessage from '../messages/assign-ship.js';

import { getOfType, getOneOfType, getType, WorldBorder, Tile } from '../../objects/objects.js';

export function receive(game, game_player, data)
{
	game_player.ready();
	game_player.send(assignTeamMessage(game_player.team));

	const ship = game_player.ship(game.objects);

	if(ship != null)
		game_player.send(assignShipMessage(ship.s_id));


	// send all of the terrain objects to the player
	const tile_ids = getOfType(game.objects, Tile.TYPE);
	const world_border_id = getOneOfType(game.objects, WorldBorder.TYPE);

	const terrain_objects = [];

	for(const s_id of tile_ids)
	{
		const tile = game.objects.get(s_id);
		terrain_objects.push(getType(tile).getBase(tile));
	}

	const world_border = game.objects.get(world_border_id);

	if(world_border != null)
	{
		game_player.send(terrainMessage(terrain_objects, world_border.width, world_border.height));
	}

	const add_objects = game.visions.get(game_player.team).getAddPackets(game.objects);
	game_player.send(add_objects);
}

export const receiver = 'ready';
