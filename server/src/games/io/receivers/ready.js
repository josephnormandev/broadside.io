import terrainMessage from '../messages/terrain.js';

import { getType } from '../../objects/objects.js';

export function receive(game, game_player, data)
{
	game_player.ready();

	// send all of the terrain objects to the player
	const terrain_objects = [];

	for(const [s_id, object] of game.objects)
	{
		if(!object.moveable && object.terrain)
		{
			terrain_objects.push(getType(object).getBase(object));
		}
	}

	game_player.send(terrainMessage(terrain_objects));
}

export const receiver = 'ready';
