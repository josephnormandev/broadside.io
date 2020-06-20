import LoggerService from '../logger/logger.service.js';

import Game from './game.js';

import * as ReadyReceiver from './io/receivers/ready.js';

export default class GamesService
{
	static games;
	static game_id;
	static game_players;

	static initialize()
	{
		Game.initialize(GamesService);

		GamesService.games = new Map();
		GamesService.game_id = 0;
		GamesService.game_players = new Map();

		GamesService.receivers = new Map();
		GamesService.receivers.set(ReadyReceiver.receiver, ReadyReceiver.receive);
	}

	static createGame(team_1, team_2)
	{
		const game = new Game(GamesService.game_id ++, team_1, team_2);

		GamesService.games.set(game.id, game);

		for(var [player_id, game_player] of game.game_players)
		{

			GamesService.game_players.set(player_id, game.id);
		}

		LoggerService.cyan(`Game '${ game.id }' has been created`);
	}

	static inGame(player)
	{
		return GamesService.game_players.has(player.id);
	}

	static handleConnect(online_player)
	{
		if(GamesService.game_players.has(online_player.id))
		{
			const game_id = GamesService.game_players.get(online_player.id);
			GamesService.games.get(game_id).handleConnect(online_player);
		}
	}

	static handleMessage(online_player, receiver, data)
	{
		const player_id = online_player.id;
		const game_id = GamesService.game_players.get(player_id);

		GamesService.games.get(game_id).handleMessage(online_player, receiver, data);
	}

	static handleDisconnect(player)
	{
		if(GamesService.game_players.has(player.id))
		{
			const game_id = GamesService.game_players.get(player.id);
			GamesService.games.get(game_id).handleDisconnect(player);
		}
	}
}
